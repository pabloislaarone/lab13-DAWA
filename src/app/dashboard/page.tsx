import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { providerName } from '@/lib/providers';
import Lock from '@/components/Lock';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const firstName = session?.user?.name?.split(' ')[0];

  const rows = [
    { label: 'Entraste con', value: providerName(session?.user?.provider) },
    { label: 'Correo', value: session?.user?.email ?? '—' },
    { label: 'Tipo de sesión', value: 'Token JWT firmado en una cookie' },
    { label: 'Páginas protegidas', value: 'Dashboard y Perfil' },
  ];

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_380px] lg:py-16">
      <div>
        <h1 className="text-5xl font-bold tracking-tight lg:text-6xl">Hola, {firstName}</h1>
        <p className="mt-4 max-w-[52ch] text-lg text-acero-3">
          Tu sesión está abierta. Mientras no cierres sesión, puedes moverte entre el dashboard y tu perfil sin volver a identificarte.
        </p>

        <dl className="mt-10 divide-y divide-linea border-y border-linea">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[180px_1fr] gap-4 py-4">
              <dt className="text-acero-3">{r.label}</dt>
              <dd className="truncate font-semibold">{r.value}</dd>
            </div>
          ))}
        </dl>

        <Link
          href="/profile"
          className="mt-8 inline-block rounded-lg bg-acero px-5 py-3 font-semibold text-white shadow-[0_2px_6px_rgba(20,35,58,0.25)] transition-colors hover:bg-acero-2"
        >
          Ver mi perfil
        </Link>
      </div>

      <aside className="self-start rounded-2xl bg-acero p-8 text-white">
        <Lock state="abierta" />
        <p className="mt-4 text-lg font-medium text-[#8fd6ad]">Cerradura abierta</p>
        <p className="mt-1 text-[#c9d4e3]">Los tres pines están en la línea de corte.</p>
      </aside>
    </div>
  );
}
