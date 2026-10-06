import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";

type ServiceKey =
  | "ia"
  | "web"
  | "backend"
  | "automatizacion"
  | "aplicaciones"
  | "documentos"
  | "otro";

type Service = {
  label: string;
  description: string;
  icon: string;
};

const services: Record<ServiceKey, Service> = {
  ia: {
    label: "Inteligencia Artificial",
    description: "Chatbots, agentes, RAG y Machine Learning.",
    icon: "mdi:brain",
  },

  web: {
    label: "Desarrollo Web",
    description: "Landing pages, e-commerce y sistemas web.",
    icon: "mdi:web",
  },

  backend: {
    label: "Backend & APIs",
    description: "APIs, bases de datos e integraciones.",
    icon: "mdi:server-outline",
  },

  automatizacion: {
    label: "Automatización",
    description: "Procesos, workflows e integraciones.",
    icon: "mdi:robot-outline",
  },

  aplicaciones: {
    label: "Aplicaciones",
    description: "Software y plataformas a medida.",
    icon: "mdi:cellphone-link",
  },

  documentos: {
    label: "Documentos",
    description: "Procesamiento y extracción inteligente.",
    icon: "mdi:file-document-outline",
  },

  otro: {
    label: "Otro proyecto",
    description: "Cuéntanos qué tienes en mente.",
    icon: "mdi:lightbulb-outline",
  },
};

export default function Contacto() {
  const [searchParams] = useSearchParams();

  const serviceParam = searchParams.get("servicio");
  const typeParam = searchParams.get("tipo");

  const initialService =
    serviceParam && serviceParam in services
      ? (serviceParam as ServiceKey)
      : "";

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: initialService,
    message: typeParam
      ? `Me interesa ${
          initialService
            ? services[initialService].label
            : "sus servicios"
        }${
          typeParam
            ? ` y específicamente ${typeParam}`
            : ""
        }.`
      : "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      serviceParam &&
      serviceParam in services
    ) {
      const service = serviceParam as ServiceKey;

      setForm((current) => ({
        ...current,
        service,
        message: typeParam
          ? `Me interesa ${services[service].label} y específicamente ${typeParam}.`
          : current.message,
      }));
    }
  }, [serviceParam, typeParam]);

  const handleChange = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: window.location.pathname,
          serviceType: typeParam || null,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el formulario.");
      }

      setSubmitted(true);
    } catch {
      setError(
        "No pudimos enviar tu solicitud. Puedes contactarnos directamente por WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedService = form.service
    ? services[form.service as ServiceKey]
    : null;

  const whatsappMessage = encodeURIComponent(
    `Hola Mistli, me interesa ${
      selectedService?.label || "un servicio de software"
    }.${
      form.message
        ? `\n\nNecesito: ${form.message}`
        : ""
    }`
  );

  const whatsappUrl =
    `https://wa.me/TU_NUMERO?text=${whatsappMessage}`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080A10] text-[#F4F5F8]">

      {/* Background */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-[0.14] blur-[150px]"
          style={{
            background: "var(--mistli-cyan)",
          }}
        />

        <div
          className="absolute -right-40 top-[10%] h-[650px] w-[650px] rounded-full opacity-[0.13] blur-[160px]"
          style={{
            background: "var(--mistli-primary)",
          }}
        />

        <div className="m-grid-bg absolute inset-0 opacity-40" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 lg:pt-36">

          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-[#7992FC]/25 bg-[#7992FC]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C7D0FE]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#60E0FA]" />
              Hablemos
            </span>

            <h1 className="mt-7 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Cuéntanos qué
              <span className="m-gradient-text block">
                quieres construir.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#9EA5B7] sm:text-base">
              Cuéntanos qué problema quieres resolver,
              qué tienes actualmente y qué te gustaría
              conseguir. Nosotros nos encargamos de
              convertirlo en una solución.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">

            {/* Left */}

            <aside className="hidden lg:block">

              <div className="sticky top-28">

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                  Tu proyecto
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Empecemos por entenderlo.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#858B9D]">
                  No necesitas tener todos los detalles
                  definidos. Explícanos el problema y
                  nosotros te ayudamos a encontrar el
                  camino.
                </p>

                <div className="mt-8 space-y-4">

                  <div className="flex gap-3">
                    <div className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                      <Icon
                        icon="mdi:message-text-outline"
                        width={20}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Hablemos de tu proyecto
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#73798A]">
                        Cuéntanos qué necesitas sin
                        preocuparte por términos técnicos.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                      <Icon
                        icon="mdi:lightbulb-outline"
                        width={20}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Analizamos la solución
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#73798A]">
                        Revisamos tus necesidades antes
                        de proponerte una solución.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                      <Icon
                        icon="mdi:rocket-launch-outline"
                        width={20}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Pasamos a la acción
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#73798A]">
                        Definimos alcance, tecnología y
                        siguientes pasos.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="mt-10 border-t border-white/[0.07] pt-7">

                  <p className="text-xs text-[#73798A]">
                    ¿Prefieres hablar directamente?
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#60E0FA] transition hover:text-white"
                  >
                    <Icon
                      icon="mdi:whatsapp"
                      width={19}
                    />
                    Escríbenos por WhatsApp
                  </a>

                </div>

              </div>

            </aside>

            {/* Form */}

            <div className="rounded-[28px] border border-white/[0.08] bg-[#0C0F17]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10">

              {submitted ? (

                <div className="flex min-h-[620px] flex-col items-center justify-center text-center">

                  <div className="m-icon-tile flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Icon
                      icon="mdi:check"
                      width={32}
                    />
                  </div>

                  <h2 className="mt-7 text-3xl font-semibold">
                    Recibimos tu solicitud.
                  </h2>

                  <p className="mt-4 max-w-md text-sm leading-7 text-[#969DAE]">
                    Gracias por contactar a Mistli.
                    Revisaremos la información y nos
                    pondremos en contacto contigo.
                  </p>

                  <Link
                    to="/"
                    className="m-btn m-btn-ghost mt-8"
                  >
                    Volver al inicio
                  </Link>

                </div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >

                  {/* Service */}

                  <div>

                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                        01 / Servicio
                      </p>

                      <h2 className="mt-2 text-xl font-semibold">
                        ¿Qué quieres construir?
                      </h2>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">

                      {Object.entries(services).map(
                        ([key, service]) => {
                          const selected =
                            form.service === key;

                          return (
                            <button
                              type="button"
                              key={key}
                              onClick={() =>
                                handleChange(
                                  "service",
                                  key
                                )
                              }
                              className={[
                                "group rounded-2xl border p-4 text-left transition-all",
                                selected
                                  ? "border-[#7992FC]/60 bg-[#7992FC]/10 shadow-lg shadow-[#7992FC]/10"
                                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04]",
                              ].join(" ")}
                            >

                              <div className="flex items-start gap-3">

                                <div
                                  className={[
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
                                    selected
                                      ? "bg-[#7992FC]/20 text-[#60E0FA]"
                                      : "bg-white/[0.05] text-[#858B9D] group-hover:text-white",
                                  ].join(" ")}
                                >
                                  <Icon
                                    icon={service.icon}
                                    width={21}
                                  />
                                </div>

                                <div>

                                  <p className="text-sm font-medium">
                                    {service.label}
                                  </p>

                                  <p className="mt-1 text-[11px] leading-5 text-[#73798A]">
                                    {service.description}
                                  </p>

                                </div>

                              </div>

                            </button>
                          );
                        }
                      )}

                    </div>

                  </div>

                  {/* Contact */}

                  <div>

                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                        02 / Contacto
                      </p>

                      <h2 className="mt-2 text-xl font-semibold">
                        ¿Cómo podemos encontrarte?
                      </h2>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#C4C9D6]">
                          Nombre *
                        </label>

                        <input
                          required
                          value={form.name}
                          onChange={(e) =>
                            handleChange(
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Tu nombre"
                          className="m-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#C4C9D6]">
                          Empresa
                        </label>

                        <input
                          value={form.company}
                          onChange={(e) =>
                            handleChange(
                              "company",
                              e.target.value
                            )
                          }
                          placeholder="Nombre de tu empresa"
                          className="m-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#C4C9D6]">
                          Email *
                        </label>

                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            handleChange(
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="tu@empresa.com"
                          className="m-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#C4C9D6]">
                          WhatsApp
                        </label>

                        <input
                          value={form.phone}
                          onChange={(e) =>
                            handleChange(
                              "phone",
                              e.target.value
                            )
                          }
                          placeholder="+52 222..."
                          className="m-input"
                        />
                      </div>

                    </div>

                  </div>

                  {/* Project */}

                  <div>

                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                        03 / Proyecto
                      </p>

                      <h2 className="mt-2 text-xl font-semibold">
                        Cuéntanos qué necesitas.
                      </h2>
                    </div>

                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        handleChange(
                          "message",
                          e.target.value
                        )
                      }
                      placeholder="¿Qué quieres construir, automatizar o resolver?"
                      className="m-input min-h-[170px] resize-y"
                    />

                  </div>

                  {/* Budget */}

                  <div>

                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                        04 / Opcional
                      </p>

                      <h2 className="mt-2 text-xl font-semibold">
                        ¿Tienes un presupuesto definido?
                      </h2>

                      <p className="mt-2 text-xs text-[#73798A]">
                        No es obligatorio. Nos ayuda a
                        plantear una solución acorde.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                      {[
                        ["", "Prefiero hablarlo"],
                        ["5-15k", "$5k – $15k"],
                        ["15-30k", "$15k – $30k"],
                        ["30k+", "$30k+"],
                      ].map(([value, label]) => {

                        const selected =
                          form.budget === value;

                        return (
                          <button
                            type="button"
                            key={value}
                            onClick={() =>
                              handleChange(
                                "budget",
                                value
                              )
                            }
                            className={[
                              "rounded-xl border px-3 py-3 text-xs transition",
                              selected
                                ? "border-[#7992FC]/60 bg-[#7992FC]/10 text-white"
                                : "border-white/[0.07] text-[#858B9D] hover:border-white/[0.15] hover:text-white",
                            ].join(" ")}
                          >
                            {label}
                          </button>
                        );
                      })}

                    </div>

                  </div>

                  {/* Error */}

                  {error && (
                    <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-xs text-red-300">
                      {error}
                    </div>
                  )}

                  {/* Submit */}

                  <div className="border-t border-white/[0.07] pt-7">

                    <button
                      type="submit"
                      disabled={loading || !form.service}
                      className="m-btn m-btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading
                        ? "Enviando..."
                        : "Solicitar propuesta"}

                      {!loading && (
                        <Icon
                          icon="mdi:arrow-right"
                          width={19}
                        />
                      )}
                    </button>

                    <p className="mt-4 text-center text-[10px] leading-5 text-[#5F6473]">
                      Tus datos se utilizarán únicamente
                      para dar seguimiento a tu solicitud.
                    </p>

                  </div>

                </form>
              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}