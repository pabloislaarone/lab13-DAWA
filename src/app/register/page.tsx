'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthShell, { AuthLink } from '@/components/AuthShell';
import Field from '@/components/Field';
import Lock from '@/components/Lock';
import { PrimaryButton } from '@/components/Buttons';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Cada requisito cumplido sube un pin hasta la línea de corte
  const rules = [
    { ok: password.length >= 8, text: 'Mínimo 8 caracteres' },
    { ok: /[a-zA-Z]/.test(password) && /\d/.test(password), text: 'Letras y números' },
    { ok: password.length > 0 && password === confirm, text: 'Las dos contraseñas coinciden' },
  ];
  const ready = rules.every((r) => r.ok);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!ready) {
      setError('La contraseña aún no cumple los tres requisitos');
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
    <AuthShell
      title="Crea tu cuenta"
      subtitle="Tu contraseña se guarda cifrada con bcrypt; nadie puede leerla."
      lock={<Lock state={ready ? 'abierta' : password ? 'llave' : 'reposo'} set={rules.map((r) => r.ok)} />}
      caption={
        <ul className="space-y-1 text-base">
          {rules.map((r) => (
            <li key={r.text} className={`flex items-center gap-2 transition-colors ${r.ok ? 'text-[#8fd6ad]' : 'text-[#9fb0c6]'}`}>
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                {r.ok ? (
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
                )}
              </svg>
              {r.text}
              <span className="sr-only">{r.ok ? '(cumplido)' : '(pendiente)'}</span>
            </li>
          ))}
        </ul>
      }
    >
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

        <p role="alert" className="min-h-5 text-sm font-medium text-bloqueo">
          {error}
        </p>

        <PrimaryButton type="submit" disabled={loading}>
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </PrimaryButton>
      </form>

      <p className="mt-8 text-sm text-acero-3">
        ¿Ya tienes cuenta? <AuthLink href="/signIn">Inicia sesión</AuthLink>
      </p>
    </AuthShell>
  );
}
