import { Link } from "react-router-dom";

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
      to="/"
      className={`flex items-center gap-2.5 w-fit ${className}`}
      aria-label="Mistli - Inicio"
    >
      {/* Isotipo */}
      <div className="w-9 h-9 shrink-0">
        <img
          src="/logo.svg"
          alt=""
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