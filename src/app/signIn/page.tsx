'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGoogle, FaGithub } from "react-icons/fa";
import AuthShell, { AuthLink } from '@/components/AuthShell';
import Field from '@/components/Field';
import Lock, { type LockState } from '@/components/Lock';
import Countdown from '@/components/Countdown';
import { PrimaryButton, ProviderButton } from '@/components/Buttons';

const MAX_ATTEMPTS = 3;

// Lee el mensaje del servidor: cuántos intentos van y si la cuenta quedó bloqueada
function readError(error: string) {
  const fresh = /Demasiados intentos/i.test(error);
  const wait = error.match(/en (\d+) minuto/);
  if (fresh) return { failed: MAX_ATTEMPTS, lockMinutes: 5 };
  if (wait) return { failed: MAX_ATTEMPTS, lockMinutes: Number(wait[1]) };
  const left = error.match(/Te quedan (\d+)/);
  return { failed: left ? MAX_ATTEMPTS - Number(left[1]) : 0, lockMinutes: 0 };
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(0);
  const [failKey, setFailKey] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

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
      const info = readError(result.error);
      setError(result.error);
      setFailed(info.failed);
      setFailKey((k) => k + 1);
      setLockedUntil(info.lockMinutes ? Date.now() + info.lockMinutes * 60_000 : null);
      return;
    }

    // La cerradura se abre y luego se entra al dashboard.
    // Navegación completa: evita que Next reutilice la redirección a /signIn en caché.
    setOpen(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 650);
  };

  const locked = lockedUntil !== null;
  const state: LockState = open
    ? 'abierta'
    : locked
      ? 'bloqueada'
      : failed > 0
        ? 'fallo'
        : password
          ? 'llave'
          : 'reposo';

  const caption = open ? (
    <span className="text-[#8fd6ad]">Acceso concedido.</span>
  ) : locked ? (
    <span className="block">
      Cuenta bloqueada. Se abre en{' '}
      <Countdown
        until={lockedUntil!}
        onDone={() => {
          setLockedUntil(null);
          setFailed(0);
          setError('');
        }}
      />
    </span>
  ) : failed > 0 ? (
    `${failed} de ${MAX_ATTEMPTS} intentos fallidos.`
  ) : password ? (
    'Llave puesta. Inicia sesión para girarla.'
  ) : (
    'Escribe tu contraseña para poner la llave.'
  );

  return (
    <AuthShell
      title="Inicia sesión"
      subtitle="Usa tu cuenta de Cerrojo o entra con Google o GitHub."
      lock={<Lock state={state} failed={failed} failKey={failKey} />}
      caption={caption}
    >
      {registered && !error && (
        <p className="mb-6 rounded-lg bg-abierto/10 px-4 py-3 text-sm font-medium text-abierto">
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

        <p role="alert" className="min-h-5 text-sm font-medium text-bloqueo">
          {error}
        </p>

        <PrimaryButton type="submit" disabled={loading || open}>
          {open ? 'Entrando…' : loading ? 'Comprobando…' : 'Iniciar sesión'}
        </PrimaryButton>
      </form>

      <div className="my-6 flex items-center gap-3 text-sm text-acero-3">
        <span className="h-px flex-1 bg-linea" />
        o entra con
        <span className="h-px flex-1 bg-linea" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ProviderButton onClick={handleGoogleSignIn}>
          <FaGoogle aria-hidden="true" />
          Google
        </ProviderButton>
        <ProviderButton onClick={handleGitHubSignIn}>
          <FaGithub aria-hidden="true" />
          GitHub
        </ProviderButton>
      </div>

      <p className="mt-8 text-sm text-acero-3">
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
