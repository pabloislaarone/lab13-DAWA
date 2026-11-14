// Campo de formulario con etiqueta visible
export default function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-tinta">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-md border-2 border-linea bg-white px-3 py-2.5 text-tinta placeholder:text-tinta-suave/60 focus:border-cobalto focus:outline-none"
      />
    </label>
  );
}
