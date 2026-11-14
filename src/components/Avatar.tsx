import Image from "next/image";

// Foto del proveedor o, si no hay (login con correo), las iniciales
export default function Avatar({
  name,
  image,
  size,
}: {
  name?: string | null;
  image?: string | null;
  size: number;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt=""
        width={size}
        height={size}
        className="rounded-full"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = (name ?? "?")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-cobalto font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
