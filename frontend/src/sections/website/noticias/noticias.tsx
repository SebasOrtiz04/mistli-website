import React, { useState } from "react";
import useNoticias from "../../../hooks/useNoticias";
import Icon from "../../../components/iconify/Icon";

interface NoticiasProps {}

const categoryColors: Record<string, string> = {
  cyan: "border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300",
  purple: "border-brand-400/20 bg-brand-500/[0.07] text-brand-300",
  green: "border-success/20 bg-success/[0.07] text-success",
  orange: "border-warning/20 bg-warning/[0.07] text-warning",
  blue: "border-brand-300/20 bg-brand-300/[0.07] text-brand-200",
  pink: "border-magenta-400/20 bg-magenta-400/[0.07] text-magenta-300",
};

const icons: Record<string, React.ReactNode> = {
  ai: (
    <Icon
      icon="mdi:robot-outline"
      width={18}
      height={18}
    />
  ),
  api: (
    <Icon
      icon="mdi:api"
      width={18}
      height={18}
    />
  ),
  automation: (
    <Icon
      icon="mdi:cog-outline"
      width={18}
      height={18}
    />
  ),
  cloud: (
    <Icon
      icon="mdi:cloud-outline"
      width={18}
      height={18}
    />
  ),
  frontend: (
    <Icon
      icon="mdi:code-tags"
      width={18}
      height={18}
    />
  ),
  news: (
    <Icon
      icon="mdi:newspaper-variant-outline"
      width={18}
      height={18}
    />
  ),
};

export const Noticias: React.FC<NoticiasProps> = () => {
  const { data: cards } = useNoticias();

  const itemsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    cards.length / itemsPerPage,
  );

  const paginatedCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-ink-950
        px-5
        py-12
        text-ink-50
        sm:px-8
        lg:py-16
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Brand glow */}
        <div
          className="
            absolute
            -left-[18vw]
            top-[8%]
            h-[42vw]
            w-[42vw]
            max-h-[650px]
            max-w-[650px]
            rounded-full
            bg-brand-500/[0.07]
            blur-[150px]
          "
        />

        {/* Cyan glow */}
        <div
          className="
            absolute
            -right-[15vw]
            top-[30%]
            h-[38vw]
            w-[38vw]
            max-h-[600px]
            max-w-[600px]
            rounded-full
            bg-cyan-400/[0.045]
            blur-[150px]
          "
        />

        {/* Magenta accent */}
        <div
          className="
            absolute
            left-[48%]
            bottom-[10%]
            h-[260px]
            w-[260px]
            rounded-full
            bg-magenta-500/[0.025]
            blur-[120px]
          "
        />

        {/* Dot grid */}
        <div
          className="
            absolute
            inset-0
            opacity-20
            [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-transparent
            via-ink-950/20
            to-ink-950/80
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="
            mb-8
            flex
            items-center
            gap-2
            text-xs
          "
        >
          <span className="text-ink-600">
            Inicio
          </span>

          <Icon
            icon="mdi:chevron-right"
            width={14}
            className="text-ink-700"
          />

          <span className="text-ink-400">
            Noticias y Lanzamientos
          </span>
        </nav>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-brand-400/20
                bg-brand-500/10
              "
            >
              <Icon
                icon="mdi:newspaper-variant-outline"
                width={16}
                className="text-brand-300"
              />
            </div>

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-brand-400
              "
            >
              Noticias
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-semibold
              tracking-[-0.04em]
              text-ink-50
              sm:text-[42px]
            "
          >
            Nuestras{" "}
            <span
              className="
                bg-gradient-to-r
                from-brand-300
                via-cyan-300
                to-brand-400
                bg-clip-text
                text-transparent
              "
            >
              últimas noticias
            </span>
          </h2>

          <p
            className="
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-ink-500
            "
          >
            Mantente al día con las novedades, avances y
            lanzamientos de Mistli en ingeniería de software,
            inteligencia artificial, automatización y
            tecnología.
          </p>
        </div>

        {/* =================================================
            GRID
        ================================================= */}

        {paginatedCards.length > 0 ? (
          <div
            className="
              mb-12
              grid
              gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {paginatedCards.map((card) => {
              const colorClass =
                categoryColors[
                  card.categoryColor ?? "cyan"
                ] ?? categoryColors.cyan;

              const iconNode =
                icons[card.icon ?? "news"] ??
                icons.news;

              return (
                <article
                  key={card.id}
                  className="
                    group
                    relative
                    flex
                    min-h-[280px]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-surface-900/65
                    p-6
                    shadow-lg
                    shadow-black/10
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-brand-400/20
                    hover:bg-surface-900/85
                    hover:shadow-xl
                    hover:shadow-brand-500/[0.06]
                  "
                >
                  {/* Card hover glow */}
                  <div
                    aria-hidden
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-40
                      w-40
                      rounded-full
                      bg-brand-500/[0.07]
                      opacity-0
                      blur-[70px]
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  {/* Bottom cyan glow */}
                  <div
                    aria-hidden
                    className="
                      pointer-events-none
                      absolute
                      -bottom-24
                      -left-16
                      h-32
                      w-32
                      rounded-full
                      bg-cyan-400/[0.045]
                      opacity-0
                      blur-[60px]
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  <div className="relative flex h-full flex-col">
                    {/* Top */}
                    <div className="mb-5 flex items-center justify-between gap-3">
                      {card.category ? (
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            px-2.5
                            py-1
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.08em]
                            ${colorClass}
                          `}
                        >
                          <span className="h-1 w-1 rounded-full bg-current" />

                          {card.category}
                        </span>
                      ) : (
                        <span />
                      )}

                      <span className="text-[11px] tabular-nums text-ink-700">
                        {card.date}
                      </span>
                    </div>

                    {/* Imagen de tarjeta */}
                    {card.image ? (
                      <div className="relative mb-5 aspect-video overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025]">
                        <img src={card.image} alt={card.title || "Imagen de noticia"} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" onError={(e) => { e.currentTarget.style.opacity = "0.2"; }} />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      </div>
                    ) : null}
                    {/* Icon */}<div
                      className="
                        mb-5
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        text-brand-300
                        transition-all
                        duration-300
                        group-hover:border-brand-400/20
                        group-hover:bg-brand-500/[0.07]
                        group-hover:text-brand-200
                      "
                    >
                      {iconNode}
                    </div>

                    {/* Title */}
                    <h3
                      className="
                        text-[17px]
                        font-semibold
                        leading-6
                        tracking-[-0.02em]
                        text-ink-100
                        transition-colors
                        group-hover:text-white
                      "
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="
                        mt-3
                        flex-1
                        text-[13px]
                        leading-6
                        text-ink-500
                      "
                    >
                      {card.description}
                    </p>

                    {/* Footer */}
                    <div
                      className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/[0.06]
                        pt-4
                      "
                    >
                      {card.id ? (
                        <a
                          href={`/noticias/${card.uid}`}
                          className="
                            group/link
                            inline-flex
                            items-center
                            gap-1.5
                            text-[13px]
                            font-medium
                            text-ink-500
                            transition-colors
                            hover:text-brand-300
                          "
                        >
                          Leer más

                          <Icon
                            icon="mdi:arrow-right"
                            width={15}
                            className="
                              transition-transform
                              group-hover/link:translate-x-1
                            "
                          />
                        </a>
                      ) : (
                        <span />
                      )}

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.06]
                          bg-white/[0.025]
                          text-ink-600
                          transition-all
                          group-hover:border-brand-400/15
                          group-hover:bg-brand-500/[0.06]
                          group-hover:text-brand-300
                        "
                      >
                        {iconNode}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* =================================================
              EMPTY STATE
          ================================================= */

          <div
            className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.07]
              bg-surface-900/60
              px-6
              text-center
              backdrop-blur-xl
            "
          >
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-brand-400/15
                bg-brand-500/[0.06]
              "
            >
              <Icon
                icon="mdi:newspaper-remove-outline"
                width={22}
                className="text-brand-400"
              />
            </div>

            <p className="text-sm text-ink-500">
              No hay noticias disponibles.
            </p>
          </div>
        )}

        {/* =================================================
            PAGINATION
        ================================================= */}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5">
            {/* Previous */}
            <button
              type="button"
              aria-label="Página anterior"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-white/[0.07]
                bg-white/[0.025]
                text-ink-600
                transition-all
                hover:border-brand-400/20
                hover:bg-brand-500/[0.05]
                hover:text-brand-300
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1),
                )
              }
              disabled={currentPage === 1}
            >
              <Icon
                icon="mdi:chevron-left"
                width={18}
              />
            </button>

            {/* Pages */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  px-2
                  text-[12px]
                  font-medium
                  transition-all
                  ${
                    currentPage === page
                      ? "border-brand-400/30 bg-brand-500 text-white shadow-lg shadow-brand-500/15"
                      : "border-white/[0.07] bg-white/[0.025] text-ink-600 hover:border-brand-400/20 hover:bg-brand-500/[0.05] hover:text-brand-300"
                  }
                `}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              aria-label="Página siguiente"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-white/[0.07]
                bg-white/[0.025]
                text-ink-600
                transition-all
                hover:border-brand-400/20
                hover:bg-brand-500/[0.05]
                hover:text-brand-300
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1),
                )
              }
              disabled={currentPage === totalPages}
            >
              <Icon
                icon="mdi:chevron-right"
                width={18}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};