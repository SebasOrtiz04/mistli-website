/**
 * ErrorPage
 * ---------------------------------------------------------------
 * Pantalla de respaldo cuando la aplicación se rompe en runtime.
 *
 * Es AUTÓNOMA a propósito: no usa MainLayout, Firebase, Redux, el router
 * ni el componente <Icon>. Si el error viene justo de alguno de ellos,
 * esta página igual se puede mostrar. Por eso usa <a href> (recarga
 * completa, que también limpia el estado roto) y SVG en línea.
 */

interface ErrorPageProps {
  error?: Error | null;
}

/* Vite: tras un deploy, los chunks con hash antiguos dejan de existir y
   los imports dinámicos (React.lazy) fallan en pestañas abiertas. */
const CHUNK_ERROR =
  /dynamically imported module|Importing a module script failed|Loading chunk|Failed to fetch dynamically/i;

export default function ErrorPage({ error }: ErrorPageProps) {
  const isNewVersion = CHUNK_ERROR.test(error?.message ?? "");

  const title = isNewVersion ? "Hay una versión nueva" : "Algo salió mal";

  const description = isNewVersion
    ? "Publicamos una actualización mientras navegabas. Recarga la página para continuar."
    : "Ocurrió un error inesperado. Puedes intentarlo de nuevo; si el problema continúa, escríbenos.";

  return (
    <main
      role="alert"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080A10] px-6 py-16 text-center text-[#F4F5F8]"
    >
      {/* ---------- Fondo ---------- */}

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-[0.15] blur-[120px]"
          style={{ background: "var(--mistli-primary, #7992FC)" }}
        />
        <div
          className="absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: "var(--mistli-magenta, #FB5FEF)" }}
        />
        <div className="m-grid-bg absolute inset-0" />
      </div>

      <div className="relative flex w-full max-w-xl flex-col items-center">
        {/* ---------- Marca ---------- */}

        <a
          href="/"
          className="mb-12 inline-flex items-center gap-2.5 no-underline"
        >
          <img src="/logo.svg" alt="" className="h-8 w-8 object-contain" />
          <span className="text-[17px] font-bold tracking-tight text-white">
            Mistli
          </span>
        </a>

        {/* ---------- Icono ---------- */}

        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            color: isNewVersion ? "#60E0FA" : "#FB5FEF",
            background: isNewVersion
              ? "rgba(96,224,250,0.10)"
              : "rgba(251,95,239,0.10)",
            border: isNewVersion
              ? "1px solid rgba(96,224,250,0.28)"
              : "1px solid rgba(251,95,239,0.28)",
          }}
        >
          {isNewVersion ? (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 12a9 9 0 1 1-3-6.7" />
              <path d="M21 4v5h-5" />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          )}
        </div>

        <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          <span className="m-gradient-text">{title}</span>
        </h1>

        <p className="mb-10 max-w-md text-sm leading-relaxed text-[#AEB3C2] sm:text-base">
          {description}
        </p>

        {/* ---------- Acciones ---------- */}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="m-btn m-btn-primary"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 12a9 9 0 1 1-3-6.7" />
              <path d="M21 4v5h-5" />
            </svg>
            {isNewVersion ? "Actualizar" : "Reintentar"}
          </button>

          <a href="/" className="m-btn m-btn-ghost">
            Ir al inicio
          </a>
        </div>

        {!isNewVersion && (
          <a
            href="/support"
            className="mt-8 text-xs text-[#858B9D] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Contactar a soporte
          </a>
        )}

        {/* ---------- Detalle técnico: solo en desarrollo ---------- */}

        {import.meta.env.DEV && error && (
          <details className="mt-10 w-full text-left">
            <summary className="cursor-pointer text-xs text-[#858B9D] hover:text-white">
              Detalles del error (solo visible en desarrollo)
            </summary>

            <pre className="mt-3 max-h-64 overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 text-[11px] leading-relaxed text-[#C4C9D6]">
              {error.stack ?? error.message}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}