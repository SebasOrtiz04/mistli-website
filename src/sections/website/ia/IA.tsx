import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";
import MainLayout from "../../../layouts/MainLayout";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const suggestedPrompts = [
  "¿Qué puede automatizar la IA en mi empresa?",
  "Quiero conectar un chatbot con mis documentos",
  "¿Qué es un agente de IA?",
];

const capabilities = [
  {
    icon: "mdi:robot-outline",
    title: "Agentes de IA",
    text: "Sistemas capaces de razonar, consultar información y ejecutar acciones.",
  },
  {
    icon: "mdi:database-search-outline",
    title: "RAG",
    text: "Conecta modelos de lenguaje con tus propios documentos y datos.",
  },
  {
    icon: "mdi:brain",
    title: "Machine Learning",
    text: "Modelos predictivos y de clasificación adaptados a problemas reales.",
  },
  {
    icon: "mdi:api",
    title: "Integraciones",
    text: "Conectamos la IA con tus APIs, sistemas internos y herramientas.",
  },
];

export default function IA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hola. Soy el asistente de Mistli. Puedo ayudarte a explorar cómo aplicar IA, automatización y machine learning a tu negocio.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const canSend = useMemo(
    () => input.trim().length > 0,
    [input]
  );

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();

    const message = input.trim();

    if (!message || isTyping) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setIsTyping(true);

    /*
     * FUTURO BACKEND
     *
     * Aquí conectaremos el chatbot real con tu backend.
     *
     * Ejemplo:
     *
     * const response = await fetch("/api/chat", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({
     *     message,
     *     conversationId,
     *   }),
     * });
     *
     * const data = await response.json();
     *
     * setMessages((current) => [
     *   ...current,
     *   {
     *     id: Date.now(),
     *     role: "assistant",
     *     content: data.message,
     *   },
     * ]);
     */

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          role: "assistant",
          content:
            "Este chatbot está en modo demostración. La siguiente etapa será conectarlo con un modelo de IA mediante tu backend FastAPI y, posteriormente, agregar memoria, RAG y herramientas.",
        },
      ]);

      setIsTyping(false);
    }, 700);
  };

  const usePrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <MainLayout>
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
                Inteligencia Artificial
              </span>
            </div>

            <h1 className="text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              IA que entiende
              <span className="m-gradient-text block pb-2">
                tu negocio.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
              Integramos inteligencia artificial en procesos reales:
              asistentes, agentes, RAG, machine learning y automatización
              conectados con los sistemas que ya utilizas.
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
                      Asistente Mistli
                    </h2>

                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#858B9D]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#60E0FA]" />
                      IA disponible
                    </div>
                  </div>
                </div>

                <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#858B9D] sm:inline-flex">
                  Demo
                </span>
              </header>

              {/* Messages */}
              <div className="relative flex min-h-[430px] flex-col gap-5 p-5 sm:p-6">
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                          message.role === "user"
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

                <p className="text-center text-[10px] text-[#5F6473]">
                  El asistente de esta página es una demostración.
                </p>
              </div>
            </div>

            {/* CAPABILITIES */}
            <aside className="space-y-4">
              <div className="rounded-3xl border border-white/[0.08] bg-[#0D0F17]/80 p-6 backdrop-blur-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                  IA aplicada
                </p>

                <h2 className="mt-3 text-xl font-semibold tracking-tight">
                  No se trata de poner un chatbot.
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#AEB3C2]">
                  Se trata de conectar inteligencia con información,
                  herramientas y procesos para resolver problemas concretos.
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
                  ¿Tienes un proceso que mejorar?
                </p>

                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                  Hagamos que la IA
                  <span className="m-gradient-text">
                    {" "}
                    trabaje para ti.
                  </span>
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#AEB3C2]">
                  Cuéntanos qué quieres automatizar, predecir, clasificar o
                  conectar y diseñemos una solución alrededor de tu problema.
                </p>

                <div className="mt-9">
                  <Link
                    to="/contacto"
                    className="m-btn m-btn-primary px-7"
                  >
                    Hablar con Mistli
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
    </MainLayout>
  );
}
