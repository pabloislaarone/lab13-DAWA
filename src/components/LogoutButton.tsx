'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      className="rounded-lg border-2 border-linea px-3 py-1.5 text-sm font-semibold transition-colors duration-150 hover:border-bloqueo hover:text-bloqueo"
    >
      Cerrar sesión
    </button>
  );
}
