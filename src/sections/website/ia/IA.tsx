import { Link } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";
import { useTranslation } from "react-i18next";
import {
  FormEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/* =========================================================
   TYPES & HELPERS
========================================================= */

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  error?: boolean;
  streaming?: boolean;
};

const MAX_HISTORY = 20;
const API_URL = import.meta.env.VITE_MISTLI_AI_URL;

// Limpia el historial antes de mandarlo al backend
const buildHistory = (items: Message[]) => {
  const merged: { role: Message["role"]; content: string }[] = [];

  for (const m of items) {
    if (m.error || !m.content.trim()) continue;

    const last = merged[merged.length - 1];

    if (last && last.role === m.role) {
      // evita dos mensajes seguidos del mismo rol
      last.content += `\n\n${m.content}`;
    } else {
      merged.push({ role: m.role, content: m.content });
    }
  }

  const recent = merged.slice(-MAX_HISTORY);

  // el historial debe empezar con un mensaje del usuario
  while (recent.length && recent[0].role === "assistant") {
    recent.shift();
  }

  return recent;
};

/**
 * Lee la respuesta del backend como stream y va entregando texto.
 * Soporta dos formatos:
 *  - Texto plano en chunks (Content-Type: text/plain)
 *  - Server-Sent Events (Content-Type: text/event-stream), con líneas
 *    `data: {"delta":"..."}` o `data: texto`, y `data: [DONE]` al final.
 */
async function* readStream(
  response: Response,
  contentType: string
): AsyncGenerator<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  const isSSE = contentType.includes("text/event-stream");

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value, { stream: true });

    if (!isSSE) {
      yield chunk;
      continue;
    }

    buffer += chunk.replace(/\r\n/g, "\n");

    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      for (const line of event.split("\n")) {
        if (!line.startsWith("data:")) continue;

        const data = line.slice(5).trimStart();

        if (!data) continue;
        if (data === "[DONE]") return;

        try {
          const json = JSON.parse(data);
          const text =
            json.response ??
            json.choices?.[0]?.delta?.content ??
            json.delta ??
            json.text ??
            json.token ??
            json.content ??
            "";
          if (text) yield String(text);
        } catch {
          yield data;
        }
      }
    }
  }
}

/* =========================================================
   MARKDOWN
========================================================= */

function CodeBlock({
  language,
  code,
}: {
  language?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/[0.08] bg-[#070910]">
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-3 py-1.5">
        <span className="font-mono text-[11px] text-[#666D7D]">
          {language || "código"}
        </span>

        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-[#858B9D] transition hover:bg-white/[0.06] hover:text-white"
        >
          <Icon
            icon={copied ? "mdi:check" : "mdi:content-copy"}
            width={13}
            height={13}
          />
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-[12px] leading-6 [scrollbar-color:rgba(255,255,255,0.15)_transparent] [scrollbar-width:thin]">
        <code className="font-mono text-[#D7DCE8]">{code}</code>
      </pre>
    </div>
  );
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-3 mt-1 text-xl font-bold tracking-tight text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-2.5 mt-5 text-lg font-semibold tracking-tight text-white">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-4 text-base font-semibold text-white">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 leading-7 text-[#C4C9D6] last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }) => <em className="text-[#D5D9E5]">{children}</em>,
  ul: ({ children }) => (
    <ul className="mb-3 ml-5 list-disc space-y-1.5 text-[#C4C9D6] marker:text-[#7992FC]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 ml-5 list-decimal space-y-1.5 text-[#C4C9D6] marker:text-[#7992FC]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-6">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-[#7992FC] bg-[#7992FC]/5 px-4 py-2 italic text-[#AEB3C2]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-5 border-white/[0.08]" />,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#60E0FA] underline decoration-[#60E0FA]/30 underline-offset-2 transition hover:text-white hover:decoration-white"
    >
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const text = String(children);
    const isBlock = Boolean(className) || text.includes("\n");

    if (!isBlock) {
      return (
        <code className="rounded-md border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[0.85em] text-[#8FE8FF]">
          {children}
        </code>
      );
    }

    return (
      <CodeBlock
        language={className?.replace("language-", "")}
        code={text.replace(/\n$/, "")}
      />
    );
  },
  pre: ({ children }) => <>{children}</>,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="min-w-full border-collapse text-left text-xs">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/[0.05] text-white">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-white/[0.06]">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="transition hover:bg-white/[0.025]">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="whitespace-nowrap border-r border-white/[0.05] px-3 py-2.5 font-semibold last:border-r-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-r border-white/[0.05] px-3 py-2.5 text-[#BFC5D2] last:border-r-0">
      {children}
    </td>
  ),
};

/* =========================================================
   MESSAGE BUBBLE (memoizado: solo se re-renderiza el que cambia)
========================================================= */

const TypingDots = () => (
  <div className="flex items-center gap-1.5 py-1">
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#60E0FA]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7992FC] [animation-delay:150ms]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FB5FEF] [animation-delay:300ms]" />
  </div>
);

const MessageBubble = memo(function MessageBubble({
  message,
  onRetry,
}: {
  message: Message;
  onRetry?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const waitingFirstToken = message.streaming && !message.content;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="m-icon-tile mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <Icon icon="mdi:robot-outline" width={17} height={17} />
        </div>
      )}

      <div
        className={`flex min-w-0 max-w-[88%] flex-col sm:max-w-[80%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isUser
              ? "rounded-tr-md bg-gradient-to-br from-[#7992FC] to-[#6578E8] text-white shadow-lg shadow-[#7992FC]/10"
              : message.error
              ? "rounded-tl-md border border-red-400/25 bg-red-500/[0.06] text-red-200"
              : "rounded-tl-md border border-white/[0.07] bg-white/[0.035] text-[#C4C9D6]"
          }`}
        >
          {waitingFirstToken ? (
            <TypingDots />
          ) : isUser ? (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="markdown-message break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {message.content}
              </ReactMarkdown>

              {message.streaming && (
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-4 w-[3px] translate-y-0.5 animate-pulse rounded-full bg-[#60E0FA]"
                />
              )}
            </div>
          )}
        </div>

        {/* Acciones */}
        {!isUser && !message.streaming && (
          <div className="mt-1.5 flex items-center gap-1 pl-1">
            {!message.error && message.content && (
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-[#666D7D] transition hover:bg-white/[0.05] hover:text-white"
              >
                <Icon
                  icon={copied ? "mdi:check" : "mdi:content-copy"}
                  width={13}
                  height={13}
                />
                {copied ? "Copiado" : "Copiar"}
              </button>
            )}

            {message.error && onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-red-200/80 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Icon icon="mdi:refresh" width={13} height={13} />
                Reintentar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

/* =========================================================
   PAGE
========================================================= */

export default function IA() {
  const { t } = useTranslation();

  const capabilities = [
    {
      icon: "mdi:robot-outline",
      title: t("ia.aside.capabilities.0.title"),
      text: t("ia.aside.capabilities.0.text"),
    },
    {
      icon: "mdi:database-search-outline",
      title: t("ia.aside.capabilities.1.title"),
      text: t("ia.aside.capabilities.1.text"),
    },
    {
      icon: "mdi:brain",
      title: t("ia.aside.capabilities.2.title"),
      text: t("ia.aside.capabilities.2.text"),
    },
    {
      icon: "mdi:api",
      title: t("ia.aside.capabilities.3.title"),
      text: t("ia.aside.capabilities.3.text"),
    },
  ];

  const suggestedPrompts = [
    t("ia.chat.suggestedPrompts.0"),
    t("ia.chat.suggestedPrompts.1"),
    t("ia.chat.suggestedPrompts.2"),
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const stickToBottom = useRef(true);

  const canSend = input.trim().length > 0 && !isStreaming;
  const isEmpty = messages.length === 0;

  /* ---------- scroll inteligente ----------
     Solo baja automáticamente si el usuario ya estaba al final,
     así puede subir a leer mientras la respuesta sigue llegando. */

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    stickToBottom.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  useEffect(() => {
    const el = scrollRef.current;

    if (el && stickToBottom.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  /* ---------- textarea auto-ajustable ---------- */

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  /* ---------- cancelar al desmontar ---------- */

  useEffect(() => () => abortRef.current?.abort(), []);

  /* ---------- enviar con streaming ---------- */

  const send = async (text: string, base: Message[]) => {
    const content = text.trim();

    if (!content || isStreaming) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
    };

    const assistantId = Date.now() + 1;
    const conversation = [...base, userMessage];

    setMessages([
      ...conversation,
      { id: assistantId, role: "assistant", content: "", streaming: true },
    ]);
    setInput("");
    setIsStreaming(true);
    stickToBottom.current = true;

    const controller = new AbortController();
    abortRef.current = controller;

    const patch = (fn: (m: Message) => Message) =>
      setMessages((current) =>
        current.map((m) => (m.id === assistantId ? fn(m) : m))
      );

    let accumulated = "";

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream, text/plain, application/json",
        },
        body: JSON.stringify({
          message: content,
          messages: buildHistory(conversation),
          stream: true,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get("content-type") ?? "";

      // Fallback: si el backend aún responde JSON completo, no se rompe
      if (contentType.includes("application/json") || !response.body) {
        const data: { message: string } = await response.json();

        patch((m) => ({ ...m, content: data.message, streaming: false }));
        return;
      }

      for await (const chunk of readStream(response, contentType)) {
        accumulated += chunk;
        patch((m) => ({ ...m, content: accumulated }));
      }

      if (!accumulated.trim()) {
        throw new Error("Empty response");
      }

      patch((m) => ({ ...m, streaming: false }));
    } catch (error) {
      // El usuario detuvo la respuesta
      if ((error as Error).name === "AbortError") {
        if (accumulated) {
          patch((m) => ({ ...m, streaming: false }));
        } else {
          setMessages((current) =>
            current.filter((m) => m.id !== assistantId)
          );
        }
        return;
      }

      console.error("Error comunicando con Mistli IA:", error);

      // Si ya llegó texto parcial lo conservamos; si no, mostramos error
      if (accumulated) {
        patch((m) => ({ ...m, streaming: false }));
      } else {
        patch((m) => ({
          ...m,
          streaming: false,
          error: true,
          content: t(
            "ia.chat.error",
            "No pude conectarme con el asistente. Intenta de nuevo en unos segundos."
          ),
        }));
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const sendMessage = (event?: FormEvent) => {
    event?.preventDefault();
    void send(input, messages);
  };

  const stopStreaming = () => abortRef.current?.abort();

  const retry = () => {
    const lastUserIndex = messages.map((m) => m.role).lastIndexOf("user");

    if (lastUserIndex === -1) return;

    void send(
      messages[lastUserIndex].content,
      messages.slice(0, lastUserIndex)
    );
  };

  const resetChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <main className="relative overflow-hidden bg-[#080A10] text-[#F4F5F8]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1000px] overflow-hidden"
      >
        <div
          className="absolute -top-40 left-[8%] h-[520px] w-[520px] rounded-full opacity-[0.18] blur-[130px]"
          style={{ background: "var(--mistli-cyan)" }}
        />

        <div
          className="absolute -top-20 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[150px]"
          style={{ background: "var(--mistli-primary)" }}
        />

        <div
          className="absolute right-[-120px] top-32 h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[130px]"
          style={{ background: "var(--mistli-magenta)" }}
        />

        <div className="m-grid-bg absolute inset-0" />
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-28 lg:px-8 lg:pb-20 lg:pt-36">
          <div className="max-w-3xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#7992FC]/25 bg-[#7992FC]/10 px-3.5 py-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--mistli-cyan)",
                  boxShadow: "0 0 10px var(--mistli-cyan)",
                }}
              />

              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#C7D0FE]">
                {t("ia.hero.badge")}
              </span>
            </div>

            <h1 className="text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {t("ia.hero.titleLine1")}

              <span className="m-gradient-text block pb-2">
                {t("ia.hero.titleHighlight")}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
              {t("ia.hero.description")}
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          CHAT + CAPABILITIES
      ====================================================== */}

      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">

            {/* =================================================
                CHAT
            ================================================== */}

            <div className="relative flex h-[640px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0D0F17]/90 shadow-2xl shadow-black/40 backdrop-blur-xl sm:h-[700px] lg:h-[720px]">

              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-[0.10] blur-[100px]"
                style={{ background: "var(--mistli-cyan)" }}
              />

              {/* Header */}

              <header className="relative flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Icon icon="mdi:robot-outline" width={22} height={22} />
                  </div>

                  <div className="min-w-0">

                    <h2 className="truncate text-sm font-semibold">
                      {t("ia.chat.assistantName")}
                    </h2>

                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#858B9D]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#60E0FA] opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#60E0FA]" />
                      </span>
                      {isStreaming
                        ? t("ia.chat.writing", "Escribiendo…")
                        : t("ia.chat.status")}
                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={resetChat}
                  disabled={isEmpty}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs text-[#AEB3C2] transition hover:border-[#7992FC]/40 hover:text-white disabled:pointer-events-none disabled:opacity-0"
                >
                  <Icon icon="mdi:plus" width={14} height={14} />
                  {t("ia.chat.newChat", "Nueva conversación")}
                </button>

              </header>

              {/* Messages */}

              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 [scrollbar-color:rgba(255,255,255,0.14)_transparent] [scrollbar-width:thin] sm:px-6"
              >

                {isEmpty ? (

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <div className="m-icon-tile mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
                      <Icon icon="mdi:robot-outline" width={30} height={30} />
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight">
                      {t("ia.chat.emptyTitle", "¿En qué te ayudamos hoy?")}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#858B9D]">
                      {t(
                        "ia.chat.emptyText",
                        "Pregunta sobre nuestros servicios o elige una de estas ideas para empezar."
                      )}
                    </p>

                    <div className="mt-7 grid w-full max-w-lg gap-2">

                      {suggestedPrompts.map((prompt) => (

                        <button
                          key={prompt}
                          type="button"
                          onClick={() => void send(prompt, messages)}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-left text-sm text-[#C4C9D6] transition hover:border-[#7992FC]/40 hover:bg-[#7992FC]/[0.06] hover:text-white"
                        >
                          <span>{prompt}</span>

                          <Icon
                            icon="mdi:arrow-top-right"
                            width={16}
                            height={16}
                            className="shrink-0 text-[#666D7D] transition group-hover:text-[#60E0FA]"
                          />
                        </button>

                      ))}

                    </div>

                  </div>

                ) : (

                  <div className="space-y-5">

                    {messages.map((message) => (

                      <MessageBubble
                        key={message.id}
                        message={message}
                        onRetry={
                          message === lastMessage && message.error
                            ? retry
                            : undefined
                        }
                      />

                    ))}

                  </div>

                )}

              </div>

              {/* Composer */}

              <div className="relative shrink-0 border-t border-white/[0.07] bg-[#0D0F17]/80 p-4 sm:px-6 sm:py-5">

                {/* Sugerencias compactas mientras hay conversación */}

                {!isEmpty && !isStreaming && (

                  <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">

                    {suggestedPrompts.map((prompt) => (

                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void send(prompt, messages)}
                        className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-[#AEB3C2] transition hover:border-[#7992FC]/40 hover:text-white"
                      >
                        {prompt}
                      </button>

                    ))}

                  </div>

                )}

                <form
                  onSubmit={sendMessage}
                  className="flex items-end gap-2 rounded-2xl border border-white/[0.09] bg-[#080A10] p-2 transition focus-within:border-[#7992FC]/50 focus-within:shadow-[0_0_0_3px_rgba(121,146,252,0.12)]"
                >

                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing
                      ) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    rows={1}
                    placeholder={t(
                      "ia.chat.placeholder",
                      "Escribe tu pregunta..."
                    )}
                    className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-5 text-[#F4F5F8] outline-none placeholder:text-[#5F6473]"
                  />

                  {isStreaming ? (

                    <button
                      type="button"
                      onClick={stopStreaming}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.12]"
                      aria-label={t("ia.chat.stop", "Detener respuesta")}
                    >
                      <Icon icon="mdi:stop" width={20} height={20} />
                    </button>

                  ) : (

                    <button
                      type="submit"
                      disabled={!canSend}
                      className="m-btn m-btn-primary !h-11 !w-11 !p-0 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={t("ia.chat.send", "Enviar mensaje")}
                    >
                      <Icon icon="mdi:arrow-up" width={20} height={20} />
                    </button>

                  )}

                </form>

                <p className="mt-2.5 text-center text-[11px] text-[#5F6473]">
                  {t(
                    "ia.chat.disclaimer",
                    "Mistli IA puede equivocarse. Verifica la información importante."
                  )}
                </p>

              </div>

            </div>

            {/* =================================================
                CAPABILITIES
            ================================================== */}

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">

              <div className="rounded-3xl border border-white/[0.08] bg-[#0D0F17]/80 p-6 backdrop-blur-xl">

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                  {t("ia.aside.badge")}
                </p>

                <h2 className="mt-3 text-xl font-semibold tracking-tight">
                  {t("ia.aside.title")}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#AEB3C2]">
                  {t("ia.aside.text")}
                </p>

              </div>

              {capabilities.map((item) => (

                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-[#7992FC]/25 hover:bg-white/[0.035]"
                >

                  <div className="flex gap-4">

                    <div className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                      <Icon icon={item.icon} width={20} height={20} />
                    </div>

                    <div>

                      <h3 className="text-sm font-semibold">{item.title}</h3>

                      <p className="mt-1.5 text-xs leading-5 text-[#858B9D]">
                        {item.text}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </aside>

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative border-t border-white/[0.06] py-24 lg:py-32">

        <div className="mx-auto max-w-5xl px-6 lg:px-8">

          <div className="m-gradient-border rounded-3xl p-px">

            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0B0D14] px-6 py-16 text-center sm:px-12 lg:py-20">

              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-[0.16] blur-[100px]"
                style={{ background: "var(--mistli-cyan)" }}
              />

              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full opacity-[0.16] blur-[110px]"
                style={{ background: "var(--mistli-magenta)" }}
              />

              <div className="relative">

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                  {t("ia.cta.eyebrow")}
                </p>

                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">

                  {t("ia.cta.titleLine1")}

                  <span className="m-gradient-text">
                    {" "}
                    {t("ia.cta.titleHighlight")}
                  </span>

                </h2>

                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#AEB3C2]">
                  {t("ia.cta.text")}
                </p>

                <div className="mt-9">

                  <Link to="/contacto" className="m-btn m-btn-primary px-7">
                    {t("ia.cta.button")}

                    <Icon icon="mdi:arrow-right" width={19} height={19} />
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}