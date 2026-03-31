import React, { useState } from "react";
import useNoticias from "../../../hooks/useNoticias";

interface NoticiasProps {
}

const categoryColors: Record<string, string> = {
  cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-400/40",
  purple: "bg-purple-400/10 text-purple-300 border-purple-400/40",
  green: "bg-emerald-400/10 text-emerald-300 border-emerald-400/40",
  orange: "bg-orange-400/10 text-orange-300 border-orange-400/40",
  blue: "bg-blue-400/10 text-blue-300 border-blue-400/40",
  pink: "bg-pink-400/10 text-pink-300 border-pink-400/40",
};

const icons: Record<string, React.ReactNode> = {
  ai: <span>🤖</span>,
  api: <span>🔌</span>,
  automation: <span>⚙️</span>,
  cloud: <span>☁️</span>,
  frontend: <span>🧩</span>,
  news: <span>📰</span>,
};

export const Noticias: React.FC<NoticiasProps> = () => {
  const {data:cards} = useNoticias()
  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const paginatedCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="relative min-h-screen px-6 py-12 bg-gradient-to-br from-[#0a0e2e] via-[#0d1545] to-[#0a1a3a] overflow-hidden font-sans">
      
      {/* glow decor */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/50 mb-8">
          <span>Inicio</span>
          <span className="text-white/20">›</span>
          <span className="text-white/70">Noticias y Lanzamientos</span>
        </nav>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Nuestras{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Últimas Noticias
          </span>
        </h2>

        <p className="text-white/50 max-w-md mb-12 text-sm leading-relaxed">
          Mantente al día con los últimos avances en ingeniería de software...
        </p>

        {/* Grid */}
        {paginatedCards.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {paginatedCards.map((card) => {
              const colorClass =
                categoryColors[card.categoryColor ?? "cyan"];
              const iconNode = icons[card.icon ?? "news"];

              return (
                <article
                  key={card.id}
                  className="group relative flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-1"
                >
                  {/* glow hover */}
                  <div className=" pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-indigo-500/10 to-transparent rounded-2xl" />

                  {/* top */}
                  <div className="flex justify-between items-center">
                    {card.category && (
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold px-3 py-1 rounded-full border ${colorClass}`}
                      >
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {card.category}
                      </span>
                    )}
                    <span className="text-[11px] text-white/40">
                      {card.date}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-lg leading-tight">
                    {card.title}
                  </h3>

                  <p className="text-white/50 text-sm flex-1">
                    {card.description}
                  </p>

                  {/* footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    {card.id ? (
                      <a
                        href={`/noticias/${card.uid}`}
                        className="flex items-center gap-1 text-white/60 hover:text-white text-sm transition"
                      >
                        Leer más →
                      </a>
                    ) : (
                      <span />
                    )}

                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white/40">
                      {iconNode}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-white/40 py-12">
            No hay noticias disponibles
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/50 disabled:opacity-30"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg border text-sm ${
                  currentPage === page
                    ? "bg-indigo-500 border-indigo-500 text-white"
                    : "bg-white/5 border-white/10 text-white/60"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/50 disabled:opacity-30"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
};