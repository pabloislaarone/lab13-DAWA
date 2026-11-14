import { Pool } from "pg";

// Un solo pool reutilizado entre peticiones (evita abrir conexiones de más en dev)
const globalForDb = globalThis as unknown as { pool?: Pool; schemaReady?: Promise<void> };

export const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
  });

// Neon cierra conexiones inactivas: se registra el error en vez de tumbar el servidor
if (!globalForDb.pool) {
  pool.on("error", (err) => console.error("Conexión de BD cerrada:", err.message));
}

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

// Crea la tabla de usuarios la primera vez que se usa la base de datos
export function ensureSchema() {
  if (!globalForDb.schemaReady) {
    globalForDb.schemaReady = pool
      .query(`
        CREATE TABLE IF NOT EXISTS users (
          id              SERIAL PRIMARY KEY,
          name            TEXT NOT NULL,
          email           TEXT NOT NULL UNIQUE,
          password_hash   TEXT NOT NULL,
          failed_attempts INTEGER NOT NULL DEFAULT 0,
          locked_until    TIMESTAMPTZ,
          created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      .then(() => undefined)
      .catch((err) => {
        globalForDb.schemaReady = undefined;
        throw err;
      });
  }
  return globalForDb.schemaReady;
}

export type DbUser = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  failed_attempts: number;
  locked_until: Date | null;
};
