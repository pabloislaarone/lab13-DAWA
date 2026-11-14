import Link from "next/link";

// Pantalla de acceso: a la izquierda la cerradura, a la derecha el formulario
export default function AuthShell({
  title,
  subtitle,
  lock,
  caption,
  children,
}: {
  title: string;
  subtitle: string;
  lock: React.ReactNode;
  caption: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[1fr_minmax(420px,520px)]">
      <aside className="panel-revela flex flex-col justify-between gap-10 bg-acero px-8 py-10 text-white lg:px-14 lg:py-14">
        <p className="max-w-md text-xl leading-snug text-[#c9d4e3]">
          Entra con tu correo, con Google o con GitHub. Tres intentos fallidos cierran la cuenta por cinco minutos.
        </p>
        <div className="flex flex-col items-start gap-6">
          {lock}
          <div className="min-h-16 text-xl font-medium text-[#e6ecf4]" aria-live="polite">
            {caption}
          </div>
        </div>
      </aside>

      <section className="flex items-center bg-papel px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-acero-3">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </div>
  );
}

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-semibold text-acero underline decoration-laton decoration-2 underline-offset-4 hover:decoration-acero"
    >
      {children}
    </Link>
  );
}
