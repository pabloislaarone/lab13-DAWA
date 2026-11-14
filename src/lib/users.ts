import bcrypt from "bcryptjs";
import { pool, ensureSchema, type DbUser } from "./db";

export const MAX_ATTEMPTS = 3; // intentos fallidos permitidos
export const LOCK_MINUTES = 5; // tiempo de bloqueo
const SALT_ROUNDS = 10;

export async function findUserByEmail(email: string) {
  await ensureSchema();
  const { rows } = await pool.query<DbUser>(
    "SELECT * FROM users WHERE email = $1",
    [email.toLowerCase()]
  );
  return rows[0] ?? null;
}

export async function createUser(name: string, email: string, password: string) {
  await ensureSchema();
  // bcrypt genera un salt aleatorio y guarda solo el hash, nunca la contraseña
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const { rows } = await pool.query<DbUser>(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name.trim(), email.toLowerCase(), hash]
  );
  return rows[0];
}

// Verifica credenciales aplicando el bloqueo por intentos fallidos.
// Lanza un Error con un mensaje que se muestra en el formulario de login.
export async function verifyCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Correo o contraseña incorrectos");

  // 1. ¿La cuenta sigue bloqueada?
  if (user.locked_until && user.locked_until.getTime() > Date.now()) {
    const minutes = Math.ceil((user.locked_until.getTime() - Date.now()) / 60000);
    throw new Error(`Cuenta bloqueada. Intenta de nuevo en ${minutes} minuto(s)`);
  }

  // 2. Si el bloqueo ya venció, se reinicia el contador
  const previousAttempts = user.locked_until ? 0 : user.failed_attempts;

  // 3. Comparar la contraseña con el hash guardado
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    const attempts = previousAttempts + 1;

    if (attempts >= MAX_ATTEMPTS) {
      await pool.query(
        `UPDATE users
         SET failed_attempts = 0,
             locked_until = NOW() + ($2 || ' minutes')::interval
         WHERE id = $1`,
        [user.id, LOCK_MINUTES]
      );
      throw new Error(
        `Demasiados intentos fallidos. Cuenta bloqueada por ${LOCK_MINUTES} minutos`
      );
    }

    await pool.query(
      "UPDATE users SET failed_attempts = $2, locked_until = NULL WHERE id = $1",
      [user.id, attempts]
    );
    const left = MAX_ATTEMPTS - attempts;
    throw new Error(`Correo o contraseña incorrectos. Te quedan ${left} intento(s)`);
  }

  // 4. Login correcto: limpiar contador y bloqueo
  await pool.query(
    "UPDATE users SET failed_attempts = 0, locked_until = NULL WHERE id = $1",
    [user.id]
  );

  return { id: String(user.id), name: user.name, email: user.email };
}
