import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { providerName } from '@/lib/providers';
import Avatar from '@/components/Avatar';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <div className="flex flex-col gap-8 rounded-lg border-2 border-linea bg-white p-8 sm:flex-row sm:items-center">
        <Avatar name={user?.name} image={user?.image} size={112} />
        <div className="min-w-0">
          <h1 className="text-4xl font-extrabold tracking-tight">{user?.name}</h1>
          <p className="mt-1 truncate text-lg text-tinta-suave">{user?.email}</p>
        </div>
      </div>

      <dl className="mt-6 divide-y-2 divide-linea rounded-lg border-2 border-linea bg-white">
        <div className="flex justify-between gap-4 px-8 py-4">
          <dt className="text-tinta-suave">Nombre</dt>
          <dd className="font-semibold">{user?.name}</dd>
        </div>
        <div className="flex justify-between gap-4 px-8 py-4">
          <dt className="text-tinta-suave">Correo</dt>
          <dd className="truncate font-semibold">{user?.email}</dd>
        </div>
        <div className="flex justify-between gap-4 px-8 py-4">
          <dt className="text-tinta-suave">Proveedor</dt>
          <dd className="font-semibold">{providerName(user?.provider)}</dd>
        </div>
        <div className="flex justify-between gap-4 px-8 py-4">
          <dt className="text-tinta-suave">Foto de perfil</dt>
          <dd className="font-semibold">{user?.image ? 'Del proveedor' : 'Iniciales (sin foto)'}</dd>
        </div>
      </dl>
    </div>
  );
}
