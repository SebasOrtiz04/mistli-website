import { Link } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";
import { useTranslation } from 'react-i18next';
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  error?: boolean;
};

const WELCOME_ID = 1;
const MAX_HISTORY = 20;

// Limpia el historial antes de mandarlo al backend
const buildHistory = (items: Message[]) => {
  const merged: { role: Message["role"]; content: string }[] = [];

  for (const m of items) {
    if (m.id === WELCOME_ID || m.error) continue;

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
  while (recent.length && recent[0].role === "assistant") recent.shift();

  return recent;
};
export default function IA() {
  const { t } = useTranslation();
  const capabilities = [
    {
      icon: "mdi:robot-outline",
      title: t('ia.aside.capabilities.0.title'),
      text: t('ia.aside.capabilities.0.text'),
    },
    {
      icon: "mdi:database-search-outline",
      title: t('ia.aside.capabilities.1.title'),
      text: t('ia.aside.capabilities.1.text'),
    },
    {
      icon: "mdi:brain",
      title: t('ia.aside.capabilities.2.title'),
      text: t('ia.aside.capabilities.2.text'),
    },
    {
      icon: "mdi:api",
      title: t('ia.aside.capabilities.3.title'),
      text: t('ia.aside.capabilities.3.text'),
    },
  ];
  const suggestedPrompts = [
    t('ia.chat.suggestedPrompts.0'),
    t('ia.chat.suggestedPrompts.1'),
    t('ia.chat.suggestedPrompts.2'),
  ];
  const [messages, setMessages] = useState<Message[]>([
    // { id: WELCOME_ID, role: "assistant", content: t('ia.chat.welcomeMessage') },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const canSend = useMemo(
    () => input.trim().length > 0,
    [input]
  );

  const API_URL = import.meta.env.VITE_MISTLI_AI_URL;

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();

    const message = input.trim();
    if (!message || isTyping) return;

    const userMessage: Message = { id: Date.now(), role: "user", content: message };
    const conversation = [...messages, userMessage];

    setMessages(conversation);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          messages: buildHistory(conversation),
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: { message: string } = await response.json();

      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Error comunicando con Mistli IA:", error);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          error: true,
          content:
            "Disculpa, en este momento no pude conectarme con nuestro asistente. Intenta nuevamente en unos segundos.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  const usePrompt = (prompt: string) => {
    setInput(prompt);
  };

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
                {t('ia.hero.badge')}
              </span>
            </div>

            <h1 className="text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {t('ia.hero.titleLine1')}
              <span className="m-gradient-text block pb-2">
                {t('ia.hero.titleHighlight')}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
              {t('ia.hero.description')}
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
            {/* CHAT */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D0F17]/90 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-[0.10] blur-[100px]"
                style={{ background: "var(--mistli-cyan)" }}
              />

              {/* Header */}
              <header className="relative flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Icon
                      icon="mdi:robot-outline"
                      width={22}
                      height={22}
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold">
                      {t('ia.chat.assistantName')}
                    </h2>

                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#858B9D]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#60E0FA]" />
                      {t('ia.chat.status')}
                    </div>
                  </div>
                </div>
              </header>

              {/* Messages */}
              <div className="relative flex min-h-auto flex-col gap-5 p-5 sm:p-6">
                <div   ref={scrollRef} className=" object-contain flex-1 space-y-4 overflow-y-auto pr-1">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user"
                          ? "bg-[#7992FC] text-white"
                          : "border border-white/[0.07] bg-white/[0.035] text-[#C4C9D6]"
                          }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60E0FA]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7992FC] [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FB5FEF] [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggestions */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => usePrompt(prompt)}
                      className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-[#AEB3C2] transition hover:border-[#7992FC]/40 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form
                  onSubmit={sendMessage}
                  className="flex items-end gap-2 rounded-2xl border border-white/[0.09] bg-[#080A10] p-2 focus-within:border-[#7992FC]/50"
                >
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void sendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Escribe tu pregunta..."
                    className="min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-[#F4F5F8] outline-none placeholder:text-[#5F6473]"
                  />

                  <button
                    type="submit"
                    disabled={!canSend || isTyping}
                    className="m-btn m-btn-primary !h-11 !w-11 !p-0 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Enviar mensaje"
                  >
                    <Icon
                      icon="mdi:arrow-up"
                      width={20}
                      height={20}
                    />
                  </button>
                </form>

              </div>
            </div>

            {/* CAPABILITIES */}
            <aside className="space-y-4">
              <div className="rounded-3xl border border-white/[0.08] bg-[#0D0F17]/80 p-6 backdrop-blur-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                  {t('ia.aside.badge')}
                </p>

                <h2 className="mt-3 text-xl font-semibold tracking-tight">
                  {t('ia.aside.title')}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#AEB3C2]">
                  {t('ia.aside.text')}
                </p>
              </div>

              {capabilities.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-[#7992FC]/25 hover:bg-white/[0.035]"
                >
                  <div className="flex gap-4">
                    <div className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                      <Icon
                        icon={item.icon}
                        width={20}
                        height={20}
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold">
                        {item.title}
                      </h3>

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
                  {t('ia.cta.eyebrow')}
                </p>

                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                  {t('ia.cta.titleLine1')}
                  <span className="m-gradient-text">
                    {" "}
                    {t('ia.cta.titleHighlight')}
                  </span>
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#AEB3C2]">
                  {t('ia.cta.text')}
                </p>

                <div className="mt-9">
                  <Link
                    to="/contacto"
                    className="m-btn m-btn-primary px-7"
                  >
                    {t('ia.cta.button')}
                    <Icon
                      icon="mdi:arrow-right"
                      width={19}
                      height={19}
                    />
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
