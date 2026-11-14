// Marca: el ojo de una cerradura dentro de un escudo de latón
export default function Brand() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="var(--laton)" />
        <circle cx="14" cy="11.5" r="4" fill="var(--acero)" />
        <path d="M11.6 14 L10.5 21 H17.5 L16.4 14 Z" fill="var(--acero)" />
      </svg>
      <span className="text-xl font-bold tracking-tight">Cerrojo</span>
    </span>
  );
}
