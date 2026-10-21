'use client'
import React, { useState } from "react";
import useNoticias from "@/hooks/useNoticias";
import Icon from "@/components/iconify/Icon";
import { NewsletterBanner } from "@/components/ui/NewsletterBanner";
import Image from "next/image";

const categoryColors: Record<string, string> = {
  cyan: "border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300",
  purple: "border-brand-400/20 bg-brand-500/[0.07] text-brand-300",
  green: "border-success/20 bg-success/[0.07] text-success",
  orange: "border-warning/20 bg-warning/[0.07] text-warning",
  blue: "border-brand-300/20 bg-brand-300/[0.07] text-brand-200",
  pink: "border-magenta-400/20 bg-magenta-400/[0.07] text-magenta-300",
};

const iconNames: Record<string, string> = {
  ai: "mdi:robot-outline",
  api: "mdi:api",
  automation: "mdi:cog-outline",
  cloud: "mdi:cloud-outline",
  frontend: "mdi:code-tags",
  news: "mdi:newspaper-variant-outline",
};

/* Imagen con fallback: si no hay imagen o falla la carga,
   se muestra un recuadro con el icono de la categoría.
   Así todas las tarjetas tienen la misma altura y estructura. */
const CardImage: React.FC<{
  src?: string | null;
  alt: string;
  icon: string;
}> = ({ src, alt, icon }) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="relative mb-5 aspect-video overflow-hidden rounded-xl border border-white/[0.07] bg-white/2.5">
      {showImage ? (
        <>
          <Image
            src={src as string}
            fill
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-500/10 via-transparent to-cyan-400/6 text-brand-300">
          <Icon icon={icon} width={34} height={34} />
        </div>
      )}
    </div>
  );
};

const Noticias: React.FC = () => {
  const { data: cards } = useNoticias();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const paginatedCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Evita quedarse al final de la página al cambiar de página
    if (typeof window !== "undefined") {
      document
        .getElementById("noticias-top")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const pagerBtn =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-ink-400 transition-all hover:border-brand-400/20 hover:bg-brand-500/[0.05] hover:text-brand-300 disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <>
      <section
        id="noticias-top"
        className="relative min-h-screen overflow-hidden bg-ink-950 px-5 py-12 text-ink-50 sm:px-8 lg:py-16"
      >
        {/* ================= FONDO ================= */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-[18vw] top-[8%] h-[42vw] w-[42vw] max-h-[650px] max-w-[650px] rounded-full bg-brand-500/[0.07] blur-[150px]" />
          <div className="absolute -right-[15vw] top-[30%] h-[38vw] w-[38vw] max-h-[600px] max-w-[600px] rounded-full bg-cyan-400/[0.045] blur-[150px]" />
          <div className="absolute bottom-[10%] left-[48%] h-[260px] w-[260px] rounded-full bg-magenta-500/[0.025] blur-[120px]" />
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/20 to-ink-950/80" />
        </div>

        {/* ================= CONTENIDO ================= */}
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs"
          >
            <a
              href="/"
              className="text-ink-500 transition-colors hover:text-ink-300"
            >
              Inicio
            </a>
            <Icon
              icon="mdi:chevron-right"
              width={14}
              className="text-ink-600"
            />
            <span aria-current="page" className="text-ink-300">
              Noticias y Lanzamientos
            </span>
          </nav>

          {/* Encabezado */}
          <header className="mb-12">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink-50 sm:text-[42px]">
              Nuestras{" "}
              <span className="bg-gradient-to-r from-brand-300 via-cyan-300 to-brand-400 bg-clip-text text-transparent">
                últimas noticias
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-ink-400">
              Novedades, avances y lanzamientos de Mistli en ingeniería de
              software, inteligencia artificial, automatización y tecnología.
            </p>
          </header>

          {/* Grid */}
          {paginatedCards.length > 0 ? (
            <div className="mb-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {paginatedCards.map((card) => {
                const colorClass =
                  categoryColors[card.categoryColor ?? "cyan"] ??
                  categoryColors.cyan;

                const iconName =
                  iconNames[card.icon ?? "news"] ?? iconNames.news;

                return (
                  <article
                    key={card.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface-900/65 p-5 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/20 hover:bg-surface-900/85 hover:shadow-xl hover:shadow-brand-500/[0.06] focus-within:border-brand-400/30"
                  >
                    {/* Brillo al pasar el cursor */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand-500/[0.07] opacity-0 blur-[70px] transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* Imagen (o icono si no hay imagen) */}
                    <CardImage
                      src={card.image}
                      alt={card.title || "Imagen de noticia"}
                      icon={iconName}
                    />

                    {/* Categoría + fecha */}
                    <div className="relative mb-3 flex min-h-[26px] items-center justify-between gap-3">
                      {card.category ? (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${colorClass}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {card.category}
                        </span>
                      ) : (
                        <span />
                      )}

                      <time className="text-xs tabular-nums text-ink-400">
                        {card.date}
                      </time>
                    </div>

                    {/* Título */}
                    <h3 className="relative line-clamp-2 text-[17px] font-semibold leading-6 tracking-[-0.02em] text-ink-100 transition-colors group-hover:text-white">
                      {card.title}
                    </h3>

                    {/* Descripción */}
                    <p className="relative mt-2 line-clamp-3 flex-1 text-[13px] leading-6 text-ink-400">
                      {card.description}
                    </p>

                    {/* Pie: toda la tarjeta es clicable gracias al after:absolute */}
                    {card.uid ? (
                      <div className="mt-5 border-t border-white/[0.06] pt-4">
                        <a
                          href={`/noticias/${card.uid}`}
                          className="group/link inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-300 transition-colors hover:text-brand-300 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:text-brand-300"
                        >
                          Leer más
                          <Icon
                            icon="mdi:arrow-right"
                            width={15}
                            className="transition-transform group-hover/link:translate-x-1"
                          />
                        </a>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : (
            /* Estado vacío */
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-surface-900/60 px-6 text-center backdrop-blur-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-400/15 bg-brand-500/[0.06]">
                <Icon
                  icon="mdi:newspaper-remove-outline"
                  width={22}
                  className="text-brand-400"
                />
              </div>
              <p className="text-sm text-ink-400">
                Aún no hay noticias publicadas.
              </p>
            </div>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <nav
              aria-label="Paginación"
              className="flex items-center justify-center gap-1.5"
            >
              <button
                type="button"
                aria-label="Página anterior"
                className={pagerBtn}
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Icon icon="mdi:chevron-left" width={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    aria-label={`Página ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-[12px] font-medium transition-all ${
                      currentPage === page
                        ? "border-brand-400/30 bg-brand-500 text-white shadow-lg shadow-brand-500/15"
                        : "border-white/[0.07] bg-white/[0.025] text-ink-400 hover:border-brand-400/20 hover:bg-brand-500/[0.05] hover:text-brand-300"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                aria-label="Página siguiente"
                className={pagerBtn}
                onClick={() =>
                  goToPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                <Icon icon="mdi:chevron-right" width={18} />
              </button>
            </nav>
          )}
        </div>
      </section>

      <NewsletterBanner />
    </>
  );
};

export default Noticias;