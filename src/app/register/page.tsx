'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthShell, { AuthLink } from '@/components/AuthShell';
import Field from '@/components/Field';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push('/signIn?registered=1');
  };

  return (
    <AuthShell title="Crea tu cuenta" subtitle="Tu contraseña se guarda cifrada con bcrypt.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Nombre"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Field
          label="Repite la contraseña"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {error && <p className="text-sm font-medium text-senal">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-cobalto px-4 py-3 font-semibold text-white transition-colors hover:bg-cobalto-hondo disabled:opacity-60"
        >
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-8 text-sm text-tinta-suave">
        ¿Ya tienes cuenta? <AuthLink href="/signIn">Inicia sesión</AuthLink>
      </p>
    </AuthShell>
  );
}
