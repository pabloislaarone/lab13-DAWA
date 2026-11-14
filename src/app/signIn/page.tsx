'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGoogle, FaGithub } from "react-icons/fa";
import AuthShell, { AuthLink } from '@/components/AuthShell';
import Field from '@/components/Field';
import LockPins from '@/components/LockPins';

const MAX_ATTEMPTS = 3;

// Traduce el mensaje del servidor a cuántos pines bajar
function attemptsFromError(error: string) {
  if (/bloqueada/i.test(error)) return MAX_ATTEMPTS;
  const left = error.match(/Te quedan (\d+)/);
  return left ? MAX_ATTEMPTS - Number(left[1]) : 0;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', {
      callbackUrl: '/dashboard',
      redirect: false
    });

    if (result?.ok) {
      router.push('/dashboard');
    }
  };

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      // Mensaje lanzado en authorize(): credenciales incorrectas o cuenta bloqueada
      setError(result.error);
      return;
    }

    // Navegación completa: evita que Next reutilice la redirección
    // a /signIn que quedó en caché antes de iniciar sesión
    window.location.href = '/dashboard';
  };

  const used = error ? attemptsFromError(error) : 0;

  return (
    <AuthShell title="Inicia sesión" subtitle="Entra con tu correo o con una de tus cuentas.">
      {registered && !error && (
        <p className="mb-6 rounded-md bg-verde/10 px-4 py-3 text-sm font-medium text-verde">
          Cuenta creada. Ya puedes iniciar sesión.
        </p>
      )}

      <form onSubmit={handleCredentialsSignIn} className="space-y-4">
        <Field
          label="Correo"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Field
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="space-y-2">
            {used > 0 && <LockPins used={used} total={MAX_ATTEMPTS} />}
            <p className="text-sm font-medium text-senal">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-cobalto px-4 py-3 font-semibold text-white transition-colors hover:bg-cobalto-hondo disabled:opacity-60"
        >
          {loading ? 'Comprobando…' : 'Iniciar sesión'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-sm text-tinta-suave">
        <span className="h-px flex-1 bg-linea" />
        o
        <span className="h-px flex-1 bg-linea" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 rounded-md border-2 border-linea px-4 py-2.5 font-semibold text-tinta transition-colors hover:border-tinta"
        >
          <FaGoogle aria-hidden="true" />
          Google
        </button>
        <button
          onClick={handleGitHubSignIn}
          className="flex items-center justify-center gap-2 rounded-md border-2 border-linea px-4 py-2.5 font-semibold text-tinta transition-colors hover:border-tinta"
        >
          <FaGithub aria-hidden="true" />
          GitHub
        </button>
      </div>

      <p className="mt-8 text-sm text-tinta-suave">
        ¿Aún no tienes cuenta? <AuthLink href="/register">Crear cuenta</AuthLink>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
