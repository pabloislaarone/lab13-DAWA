// Campo de formulario con etiqueta visible
export default function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-lg border-2 border-linea bg-papel px-3.5 py-2.5 text-acero transition-colors placeholder:text-acero-3 hover:border-acero-3 focus:border-acero focus:outline-none disabled:bg-niebla"
      />
      {hint}
    </label>
  );
}
