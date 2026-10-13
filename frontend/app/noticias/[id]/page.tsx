'use client'

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { News } from "@/types/types";
import { RenderBlock } from "@/components/news/RenderBlocks";
import useContent from "@/hooks/useContent";
import { obtenerUnaNews } from "@/lib/firebase/services/newsServices";
import Splash from "@/components/ui/Splash";

type CategoryStyle = { badge: string; text: string };

const categoryStyles: Record<string, CategoryStyle> = {
  cyan:   { badge: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40",           text: "text-cyan-400" },
  purple: { badge: "bg-brand-500/15 text-brand-400 border border-brand-500/40",        text: "text-brand-400" },
  green:  { badge: "bg-success/15 text-success border border-success/40",              text: "text-success" },
  orange: { badge: "bg-warning/15 text-warning border border-warning/40",              text: "text-warning" },
  blue:   { badge: "bg-brand-600/15 text-brand-300 border border-brand-600/40",        text: "text-brand-300" },
  pink:   { badge: "bg-magenta-500/15 text-magenta-400 border border-magenta-500/40",  text: "text-magenta-400" },
};

const getStyles = (color?: string | null): CategoryStyle =>
  categoryStyles[color ?? "cyan"] ?? categoryStyles.cyan;

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const shareButtonClass =
  "w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-ink-300 hover:text-white hover:bg-white/10 transition-all";

function Message({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-ink-950 text-ink-50 flex items-center justify-center">
      <div className="text-ink-600 text-sm">{children}</div>
    </main>
  );
}

function NoticiaContent() {
  const { id: noticia } = useParams<{ id: string }>();

  const [copied, setCopied] = useState(false);
  const [newsData, setNewsData] = useState<News | null>(null);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState(false);

const rawContent = newsData?.content;

const { blocks: parsedBlocks } = useContent(
  typeof rawContent === "string" ? rawContent : undefined
);

const blocks = Array.isArray(rawContent) ? rawContent : parsedBlocks;
  useEffect(() => {
    if (!noticia) {
      setLoadingNews(false);
      return;
    }

    let cancelled = false;
    setLoadingNews(true);
    setError(false);

    (async () => {
      try {
        const actualNew = await obtenerUnaNews(noticia);
        if (!cancelled) setNewsData(actualNew ?? null);
      } catch (e) {
        console.error("Error cargando noticia:", e);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoadingNews(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [noticia]);

  if (loadingNews) return <Message>Cargando...</Message>;
  if (error) return <Message>Ocurrió un error al cargar la noticia.</Message>;
  if (!newsData) return <Message>Noticia no encontrada.</Message>;

  const {
    breadcrumb, category, categoryColor, date, readTime,
    title, titleHighlight, heroImage, heroImageAlt, relatedPosts,
  } = newsData;

  const styles = getStyles(categoryColor);

  const openShare = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("No se pudo copiar el enlace:", e);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 text-ink-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-500 mb-6">
          {breadcrumb?.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-ink-700">›</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-ink-200 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink-200">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Category + Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest ${styles.badge}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {category}
          </span>
          <span className="flex items-center gap-1.5 text-ink-500 text-xs">
            <CalendarIcon /> {date}
          </span>
          <span className="flex items-center gap-1.5 text-ink-500 text-xs">
            <ClockIcon /> {readTime} min lectura
          </span>
        </div>

        {/* Title */}
        <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-10">
          {title}
          <br />
          <span className={styles.text}>{titleHighlight}</span>
        </h1>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: main content */}
          <div className="flex-1 min-w-0">
            {/* Hero image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-8">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={heroImageAlt ?? title}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-800">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>

            {/* Article body */}
            <article className="prose-noticia text-[15px] leading-relaxed space-y-5">
              {blocks?.map((block, index) => (
                <RenderBlock key={`${index}-${block.type}`} block={block} />
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
                  onClick={() =>
                    openShare(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`
                    )
                  }
                  className={shareButtonClass}
                  title="Compartir en X"
                >
                  <XIcon />
                </button>
                <button
                  onClick={() =>
                    openShare(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
                    )
                  }
                  className={shareButtonClass}
                  title="Compartir en LinkedIn"
                >
                  <LinkedInIcon />
                </button>
                <button
                  onClick={handleCopyLink}
                  className={`${shareButtonClass} relative`}
                  title="Copiar enlace"
                >
                  {copied ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#36D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
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
                    const relColor = getStyles(post.categoryColor);
                    return (
                      <div key={post.id}>
                        {i > 0 && <div className="border-t border-white/[0.06] mb-4" />}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest mb-2 ${relColor.badge}`}>
                          {post.category}
                        </span>
                        <Link
                          href={post.link ?? `/noticias/${post.id}`}
                          className="block text-ink-100 text-sm font-medium leading-snug hover:text-white transition-colors"
                        >
                          {post.title}
                        </Link>
                        <p className="text-ink-600 text-xs mt-1">{post.date}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>
    </div>
  );
}

export default function NoticiaPage(){
  return (
    <Suspense fallback={<Splash/>}>
      <NoticiaContent/>
    </Suspense>
  )
}