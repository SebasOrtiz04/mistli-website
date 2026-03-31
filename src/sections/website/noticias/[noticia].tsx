import React, { useState, useEffect } from "react";
import { News } from "../../../types/types";
import { RenderBlock } from "../../../components/news/RenderBlocks";
import useContent from "../../../hooks/useContent";
import { useParams } from "react-router-dom";
import {obtenerUnaNews} from "../../../lib/firebase/services/newsServices";
const categoryStyles: Record<string, { badge: string; text: string }> = {
  cyan:   { badge: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40",   text: "text-cyan-400" },
  purple: { badge: "bg-violet-500/15 text-violet-400 border border-violet-500/40", text: "text-violet-400" },
  green:  { badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/40", text: "text-emerald-400" },
  orange: { badge: "bg-orange-500/15 text-orange-400 border border-orange-500/40", text: "text-orange-400" },
  blue:   { badge: "bg-blue-500/15 text-blue-400 border border-blue-500/40",   text: "text-blue-400" },
  pink:   { badge: "bg-pink-500/15 text-pink-400 border border-pink-500/40",   text: "text-pink-400" },
};

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

// const MailIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="4" width="20" height="16" rx="2"/>
//     <polyline points="22,4 12,13 2,4"/>
//   </svg>
// );

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);


export const Noticia: React.FC<News> = () => {
  // const [email, setEmail] = useState("");
  // const [subscribed, setSubscribed] = useState(false);
  const { noticia } = useParams();
  const [copied, setCopied] = useState(false);
  const [newsData, setNewsData] = useState<News | null>(null);
  const [loadingNews, setLoadingNews] = useState(true);
  const {blocks} = useContent(newsData?.content as string);
  console.log("Blocks:", newsData);
  useEffect(() => {
    if (!noticia) return;
    setLoadingNews(true);
    const fetchNews = async () => {
      const actualNew = await obtenerUnaNews(noticia);
      setNewsData(actualNew);
      setLoadingNews(false);
    }
    fetchNews();
  }, [noticia]);

  if (loadingNews || !newsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e2e] via-[#0d1545] to-[#0a1a3a] flex items-center justify-center">
        <div className="text-white/30 text-sm">Cargando...</div>
      </div>
    );
  }

  const {
    breadcrumb, category, categoryColor, date, readTime,
    title, titleHighlight, heroImage, heroImageAlt, relatedPosts
  } = newsData;

  console.log("Noticia ID:", noticia);

  const colorKey = categoryColor ?? "cyan";
  const styles = categoryStyles[colorKey];
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e2e] via-[#0d1545] to-[#0a1a3a] px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-white/40 mb-6">
          {breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-white/20">›</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-white/70 transition-colors">{crumb.label}</a>
              ) : (
                <span className="text-white/70">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Category + Meta */}
        <div className="flex items-center gap-4 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest ${styles.badge}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {category}
          </span>
          <span className="flex items-center gap-1.5 text-white/40 text-xs">
            <CalendarIcon /> {date}
          </span>
          <span className="flex items-center gap-1.5 text-white/40 text-xs">
            <ClockIcon /> {readTime} min lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-10">
          {title}<br />
          <span className={styles.text}>{titleHighlight}</span>
        </h1>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: main content */}
          <div className="flex-1 min-w-0">
            {/* Hero image */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-8">
              {heroImage ? (
                <img src={heroImage} alt={heroImageAlt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Article body */}
            <article className="prose-noticia text-[15px] leading-relaxed space-y-5">
              {blocks?.map((block,index) => (
                <RenderBlock key={index+block.type} block={block} />
              ))}
            </article>
          </div>

          {/* Right: sidebar */}
          <aside className="lg:w-64 xl:w-72 shrink-0 flex flex-col gap-5">

            {/* Share card */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
              <div className="flex items-center gap-2 text-white text-sm font-semibold mb-4">
                <ShareIcon /> Compartir
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`, "_blank")}
                  className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  title="Compartir en X"
                >
                  <XIcon />
                </button>
                <button
                  onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank")}
                  className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  title="Compartir en LinkedIn"
                >
                  <LinkedInIcon />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all relative"
                  title="Copiar enlace"
                >
                  {copied ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <LinkIcon />
                  )}
                </button>
              </div>
            </div>

            {/* Related posts card */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4">
                <p className="text-white text-sm font-semibold">Noticias Relacionadas</p>
                <div className="flex flex-col gap-4">
                  {relatedPosts.map((post, i) => {
                    const relColor = categoryStyles[post.categoryColor ?? "cyan"];
                    return (
                      <div key={post.id}>
                        {i > 0 && <div className="border-t border-white/[0.06] mb-4" />}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest mb-2 ${relColor.badge}`}>
                          {post.category}
                        </span>
                        <a
                          href={post.link ?? "#"}
                          className="block text-white/80 text-sm font-medium leading-snug hover:text-white transition-colors"
                        >
                          {post.title}
                        </a>
                        <p className="text-white/30 text-xs mt-1">{post.date}</p>
                      </div>
                    );
                  })}
                </div>
                {/* <button
                  onClick={onAllNews}
                  className="w-full mt-1 py-2.5 rounded-lg border border-white/10 text-white/60 text-sm font-medium hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all"
                >
                  Ver todas las noticias
                </button> */}
              </div>
            )}

            {/* Newsletter card */}
            {/* <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-3">
              <div className="text-violet-400">
                <MailIcon />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Mantente al día</p>
                <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                  Recibe los últimos whitepapers y releases directamente.
                </p>
              </div>
              {subscribed ? (
                <p className="text-emerald-400 text-xs flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  ¡Suscrito con éxito!
                </p>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    className="w-full h-10 px-3 rounded-lg bg-white/[0.06] border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-violet-500/50 transition-colors"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="w-full py-2.5 rounded-lg bg-violet-700 hover:bg-violet-600 active:scale-95 text-white text-sm font-medium transition-all"
                  >
                    Suscribirse
                  </button>
                </>
              )}
            </div> */}

          </aside>
        </div>
      </div>
    </div>
  );
};