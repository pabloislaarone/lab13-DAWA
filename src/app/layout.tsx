import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Provider from "@/components/SessionProvider";
import Avatar from "@/components/Avatar";
import Brand from "@/components/Brand";

export const metadata: Metadata = {
  title: "Cerrojo",
  description: "Inicio de sesión con correo, Google y GitHub",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className="antialiased">
        <nav className="h-16 w-full border-b border-linea bg-papel">
          <div className="flex h-full items-center justify-between px-6 lg:px-14">
            <Link href="/" aria-label="Cerrojo, inicio">
              <Brand />
            </Link>
            <ul className="flex items-center gap-5 text-sm font-semibold">
              <li>
                <Link href="/dashboard" className="hover:text-laton-hondo">
                  Dashboard
                </Link>
              </li>
              {session?.user && (
                <li>
                  <Link href="/profile" className="hover:text-laton-hondo">
                    Perfil
                  </Link>
                </li>
              )}
              {session?.user && (
                <li>
                  <LogoutButton />
                </li>
              )}
              {session?.user && (
                <li>
                  <Avatar name={session.user.name} image={session.user.image} size={36} />
                </li>
              )}
            </ul>
          </div>
        </nav>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
