import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  showText?: boolean;
  className?: string;
}

export default function Logo({
  variant = "light",
  showText = true,
  className = "",
}: LogoProps) {
  const textColor =
    variant === "light"
      ? "text-white"
      : "text-ink-950";

  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 w-fit ${className}`}
      aria-label="Mistli - Inicio"
    >
      {/* Isotipo */}
      <div className="w-9 h-9 shrink-0 relative">
        <Image
          src="/maskable-icon.png"
          alt=""
          fill
          sizes="w-9 h-9"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Nombre */}
      {showText && (
        <span
          className={`
            ${textColor}
            text-xl
            font-bold
            tracking-tight
            leading-none
          `}
        >
          MISTLI
        </span>
      )}
    </Link>
  );
}