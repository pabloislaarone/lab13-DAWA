# Cerrojo - Lab 13: Autenticación con NextAuth.js

## Estructura

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts   # Handler de NextAuth
│   ├── api/register/route.ts             # Registro (hash con bcrypt)
│   ├── dashboard/page.tsx                # Ruta protegida
│   ├── profile/page.tsx                  # Ruta protegida
│   ├── register/page.tsx                 # Formulario de registro
│   ├── signIn/page.tsx                   # Login (credenciales, Google, GitHub)
│   ├── layout.tsx                        # Navbar + SessionProvider
│   └── page.tsx                          # Redirige a /dashboard
├── components/
│   ├── AuthShell.tsx                     # Pantalla de acceso (cerradura + formulario)
│   ├── Avatar.tsx
│   ├── Brand.tsx
│   ├── Buttons.tsx
│   ├── Countdown.tsx                     # Cuenta regresiva del bloqueo
│   ├── Field.tsx
│   ├── Lock.tsx                          # Cerradura animada (intentos, bloqueo, acceso)
│   ├── LogoutButton.tsx
│   └── SessionProvider.tsx
├── lib/
│   ├── auth.ts                           # authOptions (Google, GitHub, Credentials)
│   ├── db.ts                             # Conexión a Postgres (Neon)
│   └── users.ts                          # Registro, bcrypt y bloqueo por intentos
└── proxy.ts                              # Protección de rutas
```

## Cómo iniciar

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.example` a `.env.local` y completar las credenciales.
3. Ejecutar:
   ```bash
   npm run dev
   ```
4. Abrir http://localhost:3000
