import React, { useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = string;
type CategoryColor = "cyan" | "purple" | "green" | "orange" | "blue" | "pink";
type Icon = "ai" | "api" | "automation" | "cloud" | "frontend" | "news";

interface RelatedNew {
  id: string;
  title: string;
  date: number;
  category: Category;
  categoryColor: CategoryColor;
  link: string;
}

interface BaseBlock { id: string; type: string; }
interface ParagraphBlock extends BaseBlock { type: "paragraph"; text: string; }
interface HeadingBlock extends BaseBlock { type: "heading"; level: 1 | 2 | 3 | 4; text: string; }
interface ListBlock extends BaseBlock { type: "list"; style: "bullet" | "number"; items: string[]; }
interface ImageBlock extends BaseBlock { type: "image"; url: string; caption?: string; }
interface VideoBlock extends BaseBlock { type: "video"; url: string; poster?: string; }
interface CodeBlock extends BaseBlock { type: "code"; language: string; code: string; }
interface EmbedBlock extends BaseBlock { type: "embed"; provider: "youtube" | "loom" | "figma" | "iframe"; url: string; height?: number; }
interface QuoteBlock extends BaseBlock { type: "quote"; text: string; author?: string; }
interface DividerBlock extends BaseBlock { type: "divider"; }

type ContentBlock = ParagraphBlock | HeadingBlock | ListBlock | ImageBlock | VideoBlock | CodeBlock | EmbedBlock | QuoteBlock | DividerBlock;

interface CompleteNews {
  id: string;
  breadcrumb: { label: string; href: string }[];
  description: string;
  image: string;
  category: Category;
  categoryColor: CategoryColor;
  date: string;
  icon: Icon;
  readTime: number;
  title: string;
  titleHighlight: string;
  heroImage: string;
  heroImageAlt: string;
  relatedPosts: RelatedNew[];
  content: ContentBlock[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<CategoryColor, { badge: string; ring: string; accent: string; glow: string }> = {
  cyan:   { badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/40",   ring: "ring-cyan-500/40",   accent: "text-cyan-400",   glow: "shadow-cyan-500/20" },
  purple: { badge: "bg-violet-500/15 text-violet-400 border-violet-500/40", ring: "ring-violet-500/40", accent: "text-violet-400", glow: "shadow-violet-500/20" },
  green:  { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40", ring: "ring-emerald-500/40", accent: "text-emerald-400", glow: "shadow-emerald-500/20" },
  orange: { badge: "bg-orange-500/15 text-orange-400 border-orange-500/40", ring: "ring-orange-500/40", accent: "text-orange-400", glow: "shadow-orange-500/20" },
  blue:   { badge: "bg-blue-500/15 text-blue-400 border-blue-500/40",   ring: "ring-blue-500/40",   accent: "text-blue-400",   glow: "shadow-blue-500/20" },
  pink:   { badge: "bg-pink-500/15 text-pink-400 border-pink-500/40",   ring: "ring-pink-500/40",   accent: "text-pink-400",   glow: "shadow-pink-500/20" },
};

const BLOCK_TYPES = [
  { type: "paragraph", label: "Párrafo", icon: "¶" },
  { type: "heading",   label: "Encabezado", icon: "H" },
  { type: "list",      label: "Lista", icon: "≡" },
  { type: "image",     label: "Imagen", icon: "🖼" },
  { type: "video",     label: "Video", icon: "▶" },
  { type: "code",      label: "Código", icon: "</>" },
  { type: "embed",     label: "Embed", icon: "⊞" },
  { type: "quote",     label: "Cita", icon: "❝" },
  { type: "divider",   label: "Divisor", icon: "─" },
];

const ICONS: Icon[] = ["ai", "api", "automation", "cloud", "frontend", "news"];
const COLORS: CategoryColor[] = ["cyan", "purple", "green", "orange", "blue", "pink"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

const makeBlock = (type: string): ContentBlock => {
  const id = uid();
  switch (type) {
    case "paragraph": return { id, type: "paragraph", text: "" };
    case "heading":   return { id, type: "heading", level: 2, text: "" };
    case "list":      return { id, type: "list", style: "bullet", items: [""] };
    case "image":     return { id, type: "image", url: "", caption: "" };
    case "video":     return { id, type: "video", url: "", poster: "" };
    case "code":      return { id, type: "code", language: "javascript", code: "" };
    case "embed":     return { id, type: "embed", provider: "youtube", url: "", height: 400 };
    case "quote":     return { id, type: "quote", text: "", author: "" };
    case "divider":   return { id, type: "divider" };
    default:          return { id, type: "paragraph", text: "" };
  }
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const fieldClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all resize-none";
const labelClass = "block text-white/50 text-[11px] font-semibold tracking-widest uppercase mb-1.5";

const SectionCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
  <div className={`bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 ${className}`}>
    <h2 className="text-white/80 text-sm font-semibold tracking-wide mb-5 flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500 inline-block" />
      {title}
    </h2>
    {children}
  </div>
);

// Block Editors

const ParagraphEditor: React.FC<{ block: ParagraphBlock; onChange: (b: ParagraphBlock) => void }> = ({ block, onChange }) => (
  <textarea
    rows={4}
    className={fieldClass}
    placeholder="Escribe el párrafo..."
    value={block.text}
    onChange={e => onChange({ ...block, text: e.target.value })}
  />
);

const HeadingEditor: React.FC<{ block: HeadingBlock; onChange: (b: HeadingBlock) => void }> = ({ block, onChange }) => (
  <div className="flex gap-3">
    <select
      value={block.level}
      onChange={e => onChange({ ...block, level: Number(e.target.value) as 1|2|3|4 })}
      className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white/70 text-sm outline-none focus:border-white/20 shrink-0"
    >
      {[1,2,3,4].map(l => <option key={l} value={l} className="bg-[#0d1545]">H{l}</option>)}
    </select>
    <input
      type="text"
      className={fieldClass}
      placeholder="Texto del encabezado..."
      value={block.text}
      onChange={e => onChange({ ...block, text: e.target.value })}
    />
  </div>
);

const ListEditor: React.FC<{ block: ListBlock; onChange: (b: ListBlock) => void }> = ({ block, onChange }) => {
  const update = (items: string[]) => onChange({ ...block, items });
  return (
    <div className="space-y-2">
      <div className="flex gap-2 mb-3">
        {(["bullet","number"] as const).map(s => (
          <button
            key={s}
            onClick={() => onChange({ ...block, style: s })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${block.style === s ? "bg-white/10 border-white/20 text-white" : "border-white/[0.08] text-white/40 hover:text-white/60"}`}
          >
            {s === "bullet" ? "• Viñetas" : "1. Numerada"}
          </button>
        ))}
      </div>
      {block.items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <span className="text-white/20 text-xs w-5 shrink-0 text-right">{block.style === "bullet" ? "•" : `${i+1}.`}</span>
          <input
            type="text"
            className={fieldClass}
            placeholder={`Item ${i+1}...`}
            value={item}
            onChange={e => { const items = [...block.items]; items[i] = e.target.value; update(items); }}
          />
          <button onClick={() => update(block.items.filter((_, j) => j !== i))} className="text-white/20 hover:text-red-400 transition-colors text-lg leading-none shrink-0">×</button>
        </div>
      ))}
      <button
        onClick={() => update([...block.items, ""])}
        className="text-xs text-white/30 hover:text-cyan-400 transition-colors mt-1 flex items-center gap-1"
      >
        <span className="text-base">+</span> Agregar item
      </button>
    </div>
  );
};

const ImageEditor: React.FC<{ block: ImageBlock; onChange: (b: ImageBlock) => void }> = ({ block, onChange }) => (
  <div className="space-y-3">
    <input type="text" className={fieldClass} placeholder="URL de la imagen..." value={block.url} onChange={e => onChange({ ...block, url: e.target.value })} />
    <input type="text" className={fieldClass} placeholder="Caption opcional..." value={block.caption ?? ""} onChange={e => onChange({ ...block, caption: e.target.value })} />
    {block.url && (
      <div className="rounded-xl overflow-hidden border border-white/[0.08] aspect-video bg-white/5">
        <img src={block.url} alt="preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
      </div>
    )}
  </div>
);

const VideoEditor: React.FC<{ block: VideoBlock; onChange: (b: VideoBlock) => void }> = ({ block, onChange }) => (
  <div className="space-y-3">
    <input type="text" className={fieldClass} placeholder="URL del video..." value={block.url} onChange={e => onChange({ ...block, url: e.target.value })} />
    <input type="text" className={fieldClass} placeholder="URL del poster (thumbnail)..." value={block.poster ?? ""} onChange={e => onChange({ ...block, poster: e.target.value })} />
  </div>
);

const CodeEditor: React.FC<{ block: CodeBlock; onChange: (b: CodeBlock) => void }> = ({ block, onChange }) => (
  <div className="space-y-3">
    <input type="text" className={fieldClass} placeholder="Lenguaje (ej: javascript, python...)" value={block.language} onChange={e => onChange({ ...block, language: e.target.value })} />
    <textarea rows={6} className={`${fieldClass} font-mono text-xs`} placeholder="// Código aquí..." value={block.code} onChange={e => onChange({ ...block, code: e.target.value })} />
  </div>
);

const EmbedEditor: React.FC<{ block: EmbedBlock; onChange: (b: EmbedBlock) => void }> = ({ block, onChange }) => (
  <div className="space-y-3">
    <div className="flex gap-2">
      {(["youtube","loom","figma","iframe"] as const).map(p => (
        <button key={p} onClick={() => onChange({ ...block, provider: p })}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${block.provider === p ? "bg-white/10 border-white/20 text-white" : "border-white/[0.08] text-white/40 hover:text-white/60"}`}>
          {p}
        </button>
      ))}
    </div>
    <input type="text" className={fieldClass} placeholder="URL del embed..." value={block.url} onChange={e => onChange({ ...block, url: e.target.value })} />
    <input type="number" className={fieldClass} placeholder="Altura en px (ej: 400)" value={block.height ?? 400} onChange={e => onChange({ ...block, height: Number(e.target.value) })} />
  </div>
);

const QuoteEditor: React.FC<{ block: QuoteBlock; onChange: (b: QuoteBlock) => void }> = ({ block, onChange }) => (
  <div className="space-y-3">
    <textarea rows={3} className={fieldClass} placeholder="Texto de la cita..." value={block.text} onChange={e => onChange({ ...block, text: e.target.value })} />
    <input type="text" className={fieldClass} placeholder="Autor (opcional)..." value={block.author ?? ""} onChange={e => onChange({ ...block, author: e.target.value })} />
  </div>
);

const BlockEditor: React.FC<{ block: ContentBlock; onChange: (b: ContentBlock) => void; onRemove: () => void; onMove: (dir: -1|1) => void; isFirst: boolean; isLast: boolean }> = ({ block, onChange, onRemove, onMove, isFirst, isLast }) => {
  const meta = BLOCK_TYPES.find(b => b.type === block.type);

  const renderEditor = () => {
    switch (block.type) {
      case "paragraph": return <ParagraphEditor block={block} onChange={onChange as (b: ParagraphBlock) => void} />;
      case "heading":   return <HeadingEditor   block={block} onChange={onChange as (b: HeadingBlock) => void} />;
      case "list":      return <ListEditor       block={block} onChange={onChange as (b: ListBlock) => void} />;
      case "image":     return <ImageEditor      block={block} onChange={onChange as (b: ImageBlock) => void} />;
      case "video":     return <VideoEditor      block={block} onChange={onChange as (b: VideoBlock) => void} />;
      case "code":      return <CodeEditor       block={block} onChange={onChange as (b: CodeBlock) => void} />;
      case "embed":     return <EmbedEditor      block={block} onChange={onChange as (b: EmbedBlock) => void} />;
      case "quote":     return <QuoteEditor      block={block} onChange={onChange as (b: QuoteBlock) => void} />;
      case "divider":   return <div className="flex items-center gap-3"><div className="h-px flex-1 bg-white/10" /><span className="text-white/20 text-xs">Divisor</span><div className="h-px flex-1 bg-white/10" /></div>;
    }
  };

  return (
    <div className="group bg-white/[0.025] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.12] transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-white/40 uppercase">
          <span className="font-mono">{meta?.icon}</span> {meta?.label}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button disabled={isFirst} onClick={() => onMove(-1)} className="w-7 h-7 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-xs transition-all">↑</button>
          <button disabled={isLast}  onClick={() => onMove(1)}  className="w-7 h-7 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-xs transition-all">↓</button>
          <button onClick={onRemove} className="w-7 h-7 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center text-base leading-none transition-all">×</button>
        </div>
      </div>
      {renderEditor()}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const CreateNoticia: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [jsonOutput, setJsonOutput] = useState<string | null>(null);

  // Meta fields
  const [title, setTitle] = useState("");
  const [titleHighlight, setTitleHighlight] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("");
  const [categoryColor, setCategoryColor] = useState<CategoryColor>("cyan");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [readTime, setReadTime] = useState(5);
  const [icon, setIcon] = useState<Icon>("news");
  const [heroImage, setHeroImage] = useState("");
  const [heroImageAlt, setHeroImageAlt] = useState("");
  const [image, setImage] = useState("");

  // Breadcrumb
  const [breadcrumb, setBreadcrumb] = useState([{ label: "Inicio", href: "/" }, { label: "Noticias", href: "/noticias" }]);

  // Content blocks
  const [blocks, setBlocks] = useState<ContentBlock[]>([makeBlock("paragraph")]);

  // Related posts
  const [relatedPosts, setRelatedPosts] = useState<RelatedNew[]>([]);

  const styles = CATEGORY_COLORS[categoryColor];

  const updateBlock = useCallback((id: string, updated: ContentBlock) => {
    setBlocks(prev => prev.map(b => b.id === id ? updated : b));
  }, []);

  const removeBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  }, []);

  const moveBlock = useCallback((index: number, dir: -1|1) => {
    setBlocks(prev => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const addBlock = (type: string) => setBlocks(prev => [...prev, makeBlock(type)]);

  const addRelated = () => setRelatedPosts(prev => [...prev, { id: uid(), title: "", date: Date.now(), category: "", categoryColor: "cyan", link: "" }]);
  const updateRelated = (i: number, data: Partial<RelatedNew>) => setRelatedPosts(prev => prev.map((r, j) => j === i ? { ...r, ...data } : r));
  const removeRelated = (i: number) => setRelatedPosts(prev => prev.filter((_, j) => j !== i));

  const handleSave = () => {
    const news: CompleteNews = {
      id: uid(),
      title, titleHighlight, description, category, categoryColor,
      date, readTime, icon, heroImage, heroImageAlt, image,
      breadcrumb, relatedPosts, content: blocks,
    };
    const json = JSON.stringify(news, null, 2);
    setJsonOutput(json);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    // Download
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `noticia-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e2e] via-[#0d1545] to-[#0a1a3a] text-white">

      {/* Ambient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-white/30 text-xs mb-4">
            <span>Panel</span><span className="text-white/15">›</span><span>Noticias</span><span className="text-white/15">›</span><span className="text-white/60">Nueva Noticia</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Crear Noticia</h1>
              <p className="text-white/30 text-sm mt-1">Completa los campos y agrega bloques de contenido</p>
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${saved ? "bg-emerald-500 shadow-emerald-500/30 text-white" : "bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-cyan-500/20 text-white"}`}
            >
              {saved ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Guardado</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Guardar Noticia</>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">

          {/* Main column */}
          <div className="space-y-6">

            {/* Title */}
            <SectionCard title="Titular">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Título principal</label>
                  <input type="text" className={fieldClass} placeholder="El gran título de la noticia..." value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Highlight <span className={`ml-1 ${styles.accent}`}>(parte destacada)</span></label>
                  <input type="text" className={fieldClass} placeholder="Fragmento coloreado del título..." value={titleHighlight} onChange={e => setTitleHighlight(e.target.value)} />
                </div>

                {/* Live preview */}
                {(title || titleHighlight) && (
                  <div className="mt-2 p-4 rounded-xl bg-white/[0.025] border border-white/[0.06]">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-semibold">Preview del título</p>
                    <h2 className="text-xl font-bold leading-tight">
                      {title}{" "}
                      <span className={styles.accent}>{titleHighlight}</span>
                    </h2>
                  </div>
                )}

                <div>
                  <label className={labelClass}>Descripción / Subtítulo</label>
                  <textarea rows={2} className={fieldClass} placeholder="Resumen breve de la noticia..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>
              </div>
            </SectionCard>

            {/* Hero image */}
            <SectionCard title="Imagen Hero">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>URL de la imagen</label>
                  <input type="text" className={fieldClass} placeholder="https://..." value={heroImage} onChange={e => setHeroImage(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Texto alternativo (alt)</label>
                  <input type="text" className={fieldClass} placeholder="Descripción de la imagen..." value={heroImageAlt} onChange={e => setHeroImageAlt(e.target.value)} />
                </div>
                {heroImage && (
                  <div className="rounded-xl overflow-hidden aspect-video bg-white/5 border border-white/[0.08]">
                    <img src={heroImage} alt={heroImageAlt} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.opacity = "0.3")} />
                  </div>
                )}
                {!heroImage && (
                  <div className="rounded-xl aspect-video bg-white/[0.025] border border-dashed border-white/[0.08] flex flex-col items-center justify-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/10">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span className="text-white/15 text-xs">Ingresa una URL para ver el preview</span>
                  </div>
                )}
                <div>
                  <label className={labelClass}>URL de imagen para tarjeta / listado</label>
                  <input type="text" className={fieldClass} placeholder="https://... (thumbnail)" value={image} onChange={e => setImage(e.target.value)} />
                </div>
              </div>
            </SectionCard>

            {/* Content blocks */}
            <SectionCard title="Contenido del Artículo">
              <div className="space-y-3 mb-4">
                {blocks.length === 0 && (
                  <div className="text-center py-10 text-white/20 text-sm">
                    Sin bloques aún. Agrega uno abajo.
                  </div>
                )}
                {blocks.map((block, i) => (
                  <BlockEditor
                    key={block.id}
                    block={block}
                    onChange={updated => updateBlock(block.id, updated)}
                    onRemove={() => removeBlock(block.id)}
                    onMove={dir => moveBlock(i, dir)}
                    isFirst={i === 0}
                    isLast={i === blocks.length - 1}
                  />
                ))}
              </div>

              {/* Add block palette */}
              <div>
                <p className="text-[10px] text-white/25 font-semibold tracking-widest uppercase mb-2">Agregar bloque</p>
                <div className="flex flex-wrap gap-2">
                  {BLOCK_TYPES.map(({ type, label, icon }) => (
                    <button
                      key={type}
                      onClick={() => addBlock(type)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/50 text-xs font-medium hover:bg-white/[0.08] hover:text-white hover:border-white/[0.15] transition-all"
                    >
                      <span className="font-mono text-[10px]">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Related posts */}
            <SectionCard title="Noticias Relacionadas">
              <div className="space-y-3 mb-4">
                {relatedPosts.map((post, i) => (
                  <div key={post.id} className="bg-white/[0.025] border border-white/[0.07] rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-xs font-semibold">Relacionada #{i+1}</span>
                      <button onClick={() => removeRelated(i)} className="text-white/20 hover:text-red-400 transition-colors text-lg leading-none">×</button>
                    </div>
                    <input type="text" className={fieldClass} placeholder="Título de la noticia..." value={post.title} onChange={e => updateRelated(i, { title: e.target.value })} />
                    <div className="flex gap-3">
                      <input type="text" className={fieldClass} placeholder="Categoría..." value={post.category} onChange={e => updateRelated(i, { category: e.target.value })} />
                      <select value={post.categoryColor} onChange={e => updateRelated(i, { categoryColor: e.target.value as CategoryColor })}
                        className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white/70 text-sm outline-none focus:border-white/20 shrink-0">
                        {COLORS.map(c => <option key={c} value={c} className="bg-[#0d1545]">{c}</option>)}
                      </select>
                    </div>
                    <input type="text" className={fieldClass} placeholder="Link / URL..." value={post.link} onChange={e => updateRelated(i, { link: e.target.value })} />
                  </div>
                ))}
              </div>
              <button onClick={addRelated} className="flex items-center gap-1.5 text-sm text-white/30 hover:text-cyan-400 transition-colors">
                <span className="text-lg leading-none">+</span> Agregar noticia relacionada
              </button>
            </SectionCard>

            {/* Breadcrumb */}
            <SectionCard title="Breadcrumb">
              <div className="space-y-2 mb-3">
                {breadcrumb.map((crumb, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <input type="text" className={fieldClass} placeholder="Label..." value={crumb.label} onChange={e => setBreadcrumb(prev => prev.map((c, j) => j === i ? { ...c, label: e.target.value } : c))} />
                    <input type="text" className={fieldClass} placeholder="href..." value={crumb.href} onChange={e => setBreadcrumb(prev => prev.map((c, j) => j === i ? { ...c, href: e.target.value } : c))} />
                    <button onClick={() => setBreadcrumb(prev => prev.filter((_, j) => j !== i))} className="text-white/20 hover:text-red-400 transition-colors text-lg leading-none shrink-0">×</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setBreadcrumb(prev => [...prev, { label: "", href: "" }])} className="flex items-center gap-1.5 text-sm text-white/30 hover:text-cyan-400 transition-colors">
                <span className="text-lg leading-none">+</span> Agregar segmento
              </button>
            </SectionCard>

          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Category */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
              <h3 className="text-white/80 text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500 inline-block" />
                Categoría
              </h3>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Nombre</label>
                  <input type="text" className={fieldClass} placeholder="ej: IA, Noticias..." value={category} onChange={e => setCategory(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Color</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {COLORS.map(c => {
                      const s = CATEGORY_COLORS[c];
                      return (
                        <button key={c} onClick={() => setCategoryColor(c)}
                          className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg border text-[10px] font-bold tracking-wide transition-all ${s.badge} ${categoryColor === c ? `ring-2 ${s.ring} ring-offset-2 ring-offset-[#0d1545]` : "opacity-50 hover:opacity-80"}`}>
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {category && (
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest border ${styles.badge}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />{category}
                  </div>
                )}
              </div>
            </div>

            {/* Meta */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 space-y-4">
              <h3 className="text-white/80 text-sm font-semibold flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500 inline-block" />
                Metadata
              </h3>
              <div>
                <label className={labelClass}>Fecha</label>
                <input type="date" className={fieldClass} value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Tiempo de lectura (min)</label>
                <input type="number" min={1} max={60} className={fieldClass} value={readTime} onChange={e => setReadTime(Number(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Ícono</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {ICONS.map(ic => (
                    <button key={ic} onClick={() => setIcon(ic)}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold tracking-wide transition-all ${icon === ic ? "bg-white/10 border-white/25 text-white" : "border-white/[0.07] text-white/30 hover:text-white/60"}`}>
                      {ic}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* JSON preview */}
            {jsonOutput && (
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
                <h3 className="text-white/80 text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-500 inline-block" />
                  JSON generado
                </h3>
                <div className="rounded-lg bg-black/30 border border-white/[0.06] p-3 max-h-64 overflow-auto">
                  <pre className="text-[10px] text-emerald-400/80 font-mono leading-relaxed whitespace-pre-wrap">{jsonOutput.slice(0, 800)}{jsonOutput.length > 800 ? "\n..." : ""}</pre>
                </div>
                <p className="text-white/20 text-[10px] mt-2">El archivo completo fue descargado</p>
              </div>
            )}

            {/* Summary card */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
              <h3 className="text-white/80 text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-violet-500 inline-block" />
                Resumen
              </h3>
              <ul className="space-y-2 text-xs text-white/40">
                <li className="flex justify-between"><span>Bloques de contenido</span><span className="text-white/60 font-semibold">{blocks.length}</span></li>
                <li className="flex justify-between"><span>Noticias relacionadas</span><span className="text-white/60 font-semibold">{relatedPosts.length}</span></li>
                <li className="flex justify-between"><span>Breadcrumb items</span><span className="text-white/60 font-semibold">{breadcrumb.length}</span></li>
                <li className="flex justify-between"><span>Tiempo de lectura</span><span className="text-white/60 font-semibold">{readTime} min</span></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom save bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0e2e]/80 backdrop-blur-xl border-t border-white/[0.06] px-4 py-3 flex items-center justify-between z-50">
          <div className="text-xs text-white/30">
            {title ? <><span className="text-white/50 font-medium">{title}</span>{titleHighlight && <span className={`ml-1 font-medium ${styles.accent}`}>{titleHighlight}</span>}</> : <span>Sin título</span>}
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-all shadow-lg ${saved ? "bg-emerald-500 shadow-emerald-500/30" : "bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-cyan-500/20"}`}
          >
            {saved ? "✓ Guardado" : "Guardar y Descargar JSON"}
          </button>
        </div>

        {/* Bottom padding for fixed bar */}
        <div className="h-16" />
      </div>
    </div>
  );
};

export default CreateNoticia;