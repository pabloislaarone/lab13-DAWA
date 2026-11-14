import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { providerName } from '@/lib/providers';
import Avatar from '@/components/Avatar';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const rows = [
    { label: 'Nombre', value: user?.name ?? '—' },
    { label: 'Correo', value: user?.email ?? '—' },
    { label: 'Proveedor', value: providerName(user?.provider) },
    { label: 'Foto de perfil', value: user?.image ? `La de tu cuenta de ${providerName(user?.provider)}` : 'Tus iniciales (sin foto)' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="rounded-full ring-4 ring-laton ring-offset-4 ring-offset-niebla">
          <Avatar name={user?.name} image={user?.image} size={120} />
        </div>
        <div className="min-w-0">
          <h1 className="text-5xl font-bold tracking-tight">{user?.name}</h1>
          <p className="mt-1 truncate text-lg text-acero-3">{user?.email}</p>
        </div>
      </div>

      <dl className="mt-12 divide-y divide-linea border-y border-linea">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[180px_1fr] gap-4 py-4">
            <dt className="text-acero-3">{r.label}</dt>
            <dd className="truncate font-semibold">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
