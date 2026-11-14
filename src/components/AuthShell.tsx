import Link from "next/link";

// Pantalla dividida para login y registro: panel de marca + formulario
export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-64px)] grid md:grid-cols-[5fr_7fr]">
      <aside className="bg-cobalto text-white px-8 py-10 md:px-12 md:py-16 flex flex-col justify-between gap-10">
        <Keyhole />
        <div>
          <p className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight">
            MyAuth
            <br />
            App
          </p>
          <p className="mt-6 max-w-xs text-lg text-white/80 leading-snug">
            Una sola sesión, tres formas de entrar: tu correo, Google o GitHub.
          </p>
        </div>
      </aside>

      <section className="bg-white flex items-center px-6 py-12 md:px-16">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-tinta-suave">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </div>
  );
}

function Keyhole() {
  return (
    <svg
      viewBox="0 0 48 72"
      className="h-16 w-auto self-start"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="24" cy="22" r="14" stroke="white" strokeWidth="4" />
      <path d="M17 34 L13 66 H35 L31 34" stroke="white" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-cobalto underline underline-offset-4 hover:text-cobalto-hondo">
      {children}
    </Link>
  );
}
