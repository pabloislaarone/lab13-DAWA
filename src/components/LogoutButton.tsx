'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      className="rounded-md border-2 border-linea px-3 py-1.5 text-sm font-semibold text-tinta transition-colors hover:border-senal hover:text-senal"
    >
      Cerrar sesión
    </button>
  );
}
