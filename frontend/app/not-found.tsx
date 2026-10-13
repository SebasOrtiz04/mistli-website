"use client";

import MainLayout from "@/layouts/MainLayout";
import Icon from "@/components/iconify/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* `accent` coincide con los data-accent de index.css */
const suggestions: { label: string; path: string; accent?: string }[] = [
  { label: "Inteligencia Artificial", path: "/ia", accent: "ia" },
  { label: "Desarrollo Web", path: "/web", accent: "web" },
  { label: "Automatización", path: "/automatizacion", accent: "automatizacion" },
  { label: "Documentación", path: "/documentation" },
  { label: "Soporte", path: "/support" },
];

const numberClass =
  "block whitespace-nowrap text-[clamp(7rem,24vw,13rem)] font-black leading-none tracking-tighter";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <MainLayout>
      <section className="relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center">
        {/* ---------- Fondo ---------- */}

        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 left-[10%] h-105 w-105 rounded-full opacity-[0.14] blur-[110px]"
            style={{ background: "var(--mistli-cyan)" }}
          />
          <div
            className="absolute -right-10 top-1/3 h-110 w-110 rounded-full opacity-[0.13] blur-[120px]"
            style={{ background: "var(--mistli-magenta)" }}
          />
          <div className="m-grid-bg absolute inset-0" />
        </div>

        <div className="relative flex flex-col items-center">
          {/* ---------- 404 con glitch RGB ---------- */}

          <div aria-hidden className="relative mb-8 select-none">
            <span className={`m-gradient-text ${numberClass}`}>404</span>

            <span
              className={`m-glitch-a pointer-events-none absolute inset-0 mix-blend-screen text-[#60E0FA] ${numberClass}`}
            >
              404
            </span>

            <span
              className={`m-glitch-b pointer-events-none absolute inset-0 mix-blend-screen text-[#FB5FEF] ${numberClass}`}
            >
              404
            </span>
          </div>

          {/* ---------- Mensaje ---------- */}

          <div className="m-icon-tile mb-5 flex h-14 w-14 items-center justify-center rounded-full">
            <Icon icon="mdi:compass-off-outline" width={26} height={26} />
          </div>

          <h1 className="mb-3 text-2xl font-semibold tracking-tight text-link-50 sm:text-3xl">
            <span className="sr-only">Error 404. </span>
            Página no encontrada
          </h1>

          <p className="mb-10 max-w-sm text-sm leading-relaxed text-link-300 sm:text-base">
            La página que buscas no existe o cambió de lugar. Revisa la
            dirección o vuelve a un lugar conocido.
          </p>

          {/* ---------- Acciones ---------- */}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) router.back();
                else router.push("/");
              }}
              className="m-btn m-btn-ghost"
            >
              <Icon icon="mdi:arrow-left" width={18} height={18} />
              Volver
            </button>

            <Link href="/" className="m-btn m-btn-primary">
              <Icon icon="mdi:home-outline" width={18} height={18} />
              Ir al inicio
            </Link>
          </div>

          {/* ---------- Accesos rápidos ---------- */}

          <nav aria-label="Enlaces sugeridos" className="mt-14">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-link.400">
              Quizá buscabas
            </p>

            <ul className="flex flex-wrap justify-center gap-2">
              {suggestions.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    data-accent={item.accent}
                    className="group inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-3 py-1.5 text-xs text-link-300 transition-colors hover:border-white/20 hover:text-(--accent)]"
                  >
                    <span className="h-1 w-1 rounded-full bg-(--accent) opacity-60 transition-opacity group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </MainLayout>
  );
}