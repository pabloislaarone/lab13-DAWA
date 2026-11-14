export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-acero px-4 py-3 font-semibold text-white shadow-[0_2px_6px_rgba(20,35,58,0.25)] transition-[background-color,transform] duration-150 hover:bg-acero-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55"
    />
  );
}

export function ProviderButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-linea bg-papel px-4 py-2.5 font-semibold text-acero transition-colors duration-150 hover:border-acero active:translate-y-px"
    />
  );
}
