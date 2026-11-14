import type { Metadata } from "next";
import "@fontsource/schibsted-grotesk/400.css";
import "@fontsource/schibsted-grotesk/600.css";
import "@fontsource/schibsted-grotesk/700.css";
import "@fontsource/schibsted-grotesk/800.css";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Provider from "@/components/SessionProvider";
import Avatar from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "My Next Auth App",
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
        <nav className="h-16 w-full border-b-2 border-linea bg-white">
          <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
              <span className="h-3 w-3 rounded-full bg-cobalto" aria-hidden="true" />
              MyAuthApp
            </Link>
            <ul className="flex items-center gap-5 text-sm font-semibold">
              <li>
                <Link href="/dashboard" className="hover:text-cobalto">
                  Dashboard
                </Link>
              </li>
              {session?.user && (
                <li>
                  <Link href="/profile" className="hover:text-cobalto">
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
