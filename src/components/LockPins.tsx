// Cerradura de 3 pines: cada intento fallido baja un pin.
// Con los 3 abajo, la cuenta queda bloqueada.
export default function LockPins({ used, total = 3 }: { used: number; total?: number }) {
  const locked = used >= total;

  return (
    <div
      className={`rounded-lg border-2 px-4 py-3 ${locked ? "border-senal bg-senal/5" : "border-linea"}`}
      role="status"
    >
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => {
            const active = i < used;
            return (
              <span
                key={i}
                className={`block w-2.5 rounded-full ${
                  active ? "h-7 bg-senal pin-activo" : "h-4 mt-3 bg-linea"
                }`}
              />
            );
          })}
        </div>
        <p className="text-sm text-tinta">
          {locked
            ? "Cuenta bloqueada temporalmente"
            : `${used} de ${total} intentos fallidos`}
        </p>
      </div>
    </div>
  );
}
