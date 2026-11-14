import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { providerName } from '@/lib/providers';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const firstName = session?.user?.name?.split(' ')[0];

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
        Hola, {firstName}
      </h1>
      <p className="mt-4 max-w-lg text-lg text-tinta-suave">
        Tu sesión está activa. Las páginas Dashboard y Perfil solo se abren con sesión iniciada.
      </p>

      <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border-2 border-linea bg-linea sm:grid-cols-2">
        <div className="bg-white p-6">
          <dt className="text-sm text-tinta-suave">Entraste con</dt>
          <dd className="mt-1 text-2xl font-bold">{providerName(session?.user?.provider)}</dd>
        </div>
        <div className="bg-white p-6">
          <dt className="text-sm text-tinta-suave">Correo de la sesión</dt>
          <dd className="mt-1 truncate text-2xl font-bold">{session?.user?.email}</dd>
        </div>
      </dl>

      <Link
        href="/profile"
        className="mt-8 inline-block rounded-md bg-cobalto px-5 py-3 font-semibold text-white transition-colors hover:bg-cobalto-hondo"
      >
        Ver mi perfil
      </Link>
    </div>
  );
}
