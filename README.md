# Lab 13 - Autenticación con NextAuth.js

## Estructura

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts   # Handler de NextAuth
│   ├── dashboard/page.tsx                # Ruta protegida
│   ├── profile/page.tsx                  # Ruta protegida
│   ├── signIn/page.tsx                   # Login
│   ├── layout.tsx                        # Navbar + SessionProvider
│   └── page.tsx                          # Redirige a /dashboard
├── components/
│   ├── LogoutButton.tsx
│   └── SessionProvider.tsx
├── lib/
│   └── auth.ts                           # authOptions (proveedores)
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
