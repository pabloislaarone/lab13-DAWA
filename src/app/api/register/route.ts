import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/users";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "El correo no es válido" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }
    if (await findUserByEmail(email)) {
      return NextResponse.json({ error: "Ese correo ya está registrado" }, { status: 409 });
    }

    const user = await createUser(name, email, password);
    return NextResponse.json(
      { message: "Usuario registrado", user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json({ error: "Error al registrar el usuario" }, { status: 500 });
  }
}
