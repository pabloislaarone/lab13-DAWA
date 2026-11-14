export const PROVIDER_NAMES: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  credentials: "correo y contraseña",
};

export function providerName(provider?: string) {
  return provider ? PROVIDER_NAMES[provider] ?? provider : "—";
}
