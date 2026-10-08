import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

type ContactForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  budget: string;
};

const serviceIcons: Record<ServiceKey, string> = {
  ia: "mdi:brain",
  web: "mdi:web",
  backend: "mdi:server-outline",
  automatizacion: "mdi:robot-outline",
  aplicaciones: "mdi:cellphone-link",
  documentos: "mdi:file-document-outline",
  otro: "mdi:lightbulb-outline",
};

export default function Contacto() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const serviceParam = searchParams.get("servicio");
  const typeParam = searchParams.get("tipo");

  const services = t("contact.services", {
    returnObjects: true,
  }) as Record<
    ServiceKey,
    {
      label: string;
      description: string;
    }
  >;

  const initialService =
    serviceParam && serviceParam in services
      ? (serviceParam as ServiceKey)
      : "";

  const [form, setForm] = useState<ContactForm>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: initialService,
    message: typeParam
      ? `Me interesa ${
          initialService
            ? services[initialService].label
            : t("contact.serviceMessage.yourServices")
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
    if (serviceParam && serviceParam in services) {
      const service = serviceParam as ServiceKey;

      setForm((current) => ({
        ...current,
        service,
        message: typeParam
          ? `${t("contact.serviceMessage.interestedIn")} ${
              services[service].label
            } ${t("contact.serviceMessage.specifically")} ${typeParam}.`
          : current.message,
      }));
    }
  }, [serviceParam, typeParam]);

  const handleChange = (
    field: keyof ContactForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.service) {
      setError(t("contact.validation.service"));
      return;
    }

    if (form.message.trim().length < 10) {
      setError(t("contact.validation.message"));
      return;
    }

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

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail || t("contact.validation.submit"),
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("contact.validation.error"),
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedService = form.service
    ? services[form.service as ServiceKey]
    : null;

  const whatsappMessage = encodeURIComponent(
    `${t("contact.whatsapp.message")} ${
      selectedService?.label ||
      t("contact.whatsapp.defaultService")
    }.${
      form.message
        ? `\n\n${t("contact.whatsapp.need")}: ${form.message}`
        : ""
    }`,
  );

  // Reemplaza TU_NUMERO por tu número real.
  const whatsappUrl =
    `https://wa.me/TU_NUMERO?text=${whatsappMessage}`;

  const projectSteps = t("contact.project.steps", {
    returnObjects: true,
  }) as {
    icon: string;
    title: string;
    description: string;
  }[];

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-950 text-ink-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute -left-40 -top-40
            h-[600px] w-[600px]
            rounded-full
            bg-cyan-500/[0.10]
            blur-[150px]
          "
        />

        <div
          className="
            absolute -right-40 top-[10%]
            h-[650px] w-[650px]
            rounded-full
            bg-brand-500/[0.10]
            blur-[160px]
          "
        />

        <div
          className="
            absolute bottom-[-250px] left-[30%]
            h-[500px] w-[500px]
            rounded-full
            bg-magenta-500/[0.06]
            blur-[160px]
          "
        />

        <div className="m-grid-bg absolute inset-0 opacity-30" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 lg:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-brand-500/25
                bg-brand-500/10
                px-4 py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-brand-200
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {t("contact.hero.badge")}
            </span>

            <h1
              className="
                mt-7
                text-4xl
                font-semibold
                tracking-[-0.045em]
                text-ink-50
                sm:text-6xl
              "
            >
              {t("contact.hero.title")}

              <span className="m-gradient-text block">
                {t("contact.hero.titleHighlight")}
              </span>
            </h1>

            <p
              className="
                mx-auto mt-6
                max-w-2xl
                text-sm
                leading-7
                text-ink-400
                sm:text-base
              "
            >
              {t("contact.hero.description")}
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="m-section-label">
                  {t("contact.project.eyebrow")}
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  {t("contact.project.title")}
                </h2>

                <p className="mt-4 text-sm leading-7 text-ink-500">
                  {t("contact.project.description")}
                </p>

                <div className="mt-8 space-y-5">
                  {projectSteps.map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3"
                    >
                      <div
                        className="
                          flex h-10 w-10 shrink-0
                          items-center justify-center
                          rounded-xl
                          border border-brand-500/20
                          bg-brand-500/10
                          text-cyan-400
                        "
                      >
                        <Icon
                          icon={item.icon}
                          width={20}
                        />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-ink-100">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-ink-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-white/[0.07] pt-7">
                  <p className="text-xs text-ink-500">
                    {t("contact.whatsapp.direct")}
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      mt-3
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-cyan-400
                      transition
                      hover:text-white
                    "
                  >
                    <Icon
                      icon="mdi:whatsapp"
                      width={19}
                    />

                    {t("contact.whatsapp.button")}
                  </a>
                </div>
              </div>
            </aside>

            <div
              className="
                relative overflow-hidden
                rounded-[28px]
                border border-white/[0.08]
                bg-ink-900/80
                p-5
                shadow-2xl
                shadow-black/30
                backdrop-blur-xl
                sm:p-8
                lg:p-10
              "
            >
              <div
                aria-hidden
                className="
                  pointer-events-none absolute
                  -right-32 -top-32
                  h-72 w-72
                  rounded-full
                  bg-brand-500/[0.07]
                  blur-[100px]
                "
              />

              <div
                aria-hidden
                className="
                  pointer-events-none absolute
                  -bottom-32 -left-32
                  h-72 w-72
                  rounded-full
                  bg-cyan-500/[0.05]
                  blur-[100px]
                "
              />

              <div className="relative">
                {submitted ? (
                  <div className="flex min-h-[620px] flex-col items-center justify-center text-center">
                    <div
                      className="
                        flex h-16 w-16
                        items-center justify-center
                        rounded-2xl
                        border border-success/20
                        bg-success/10
                        text-success
                      "
                    >
                      <Icon
                        icon="mdi:check"
                        width={32}
                      />
                    </div>

                    <h2 className="mt-7 text-3xl font-semibold">
                      {t("contact.success.title")}
                    </h2>

                    <p className="mt-4 max-w-md text-sm leading-7 text-ink-400">
                      {t("contact.success.description")}
                    </p>

                    <Link
                      to="/"
                      className="
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border border-white/[0.08]
                        bg-white/[0.03]
                        px-5 py-3
                        text-sm
                        font-medium
                        text-ink-200
                        transition
                        hover:border-white/[0.16]
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      {t("contact.success.backHome")}

                      <Icon
                        icon="mdi:arrow-left"
                        width={18}
                      />
                    </Link>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div>
                      <div className="mb-5">
                        <p className="m-section-label">
                          {t("contact.form.service.eyebrow")}
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                          {t("contact.form.service.title")}
                        </h2>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {Object.entries(services).map(
                          ([key, service]) => {
                            const serviceKey =
                              key as ServiceKey;

                            const selected =
                              form.service === key;

                            return (
                              <button
                                type="button"
                                key={key}
                                onClick={() =>
                                  handleChange(
                                    "service",
                                    key,
                                  )
                                }
                                className={[
                                  "group rounded-2xl border p-4 text-left transition-all duration-200",
                                  selected
                                    ? "border-brand-500/60 bg-brand-500/[0.10] shadow-lg shadow-brand-500/10"
                                    : "border-white/[0.07] bg-white/[0.02] hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-white/[0.04]",
                                ].join(" ")}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={[
                                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
                                      selected
                                        ? "bg-brand-500/20 text-cyan-400"
                                        : "bg-white/[0.05] text-ink-500 group-hover:text-white",
                                    ].join(" ")}
                                  >
                                    <Icon
                                      icon={
                                        serviceIcons[
                                          serviceKey
                                        ]
                                      }
                                      width={21}
                                    />
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium text-ink-100">
                                      {service.label}
                                    </p>

                                    <p className="mt-1 text-[11px] leading-5 text-ink-500">
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="mb-5">
                        <p className="m-section-label">
                          {t("contact.form.contact.eyebrow")}
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                          {t("contact.form.contact.title")}
                        </h2>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="m-label">
                            {t("contact.form.contact.name.label")}
                          </label>

                          <input
                            required
                            value={form.name}
                            onChange={(e) =>
                              handleChange(
                                "name",
                                e.target.value,
                              )
                            }
                            placeholder={t(
                              "contact.form.contact.name.placeholder",
                            )}
                            className="m-input"
                          />
                        </div>

                        <div>
                          <label className="m-label">
                            {t(
                              "contact.form.contact.company.label",
                            )}
                          </label>

                          <input
                            value={form.company}
                            onChange={(e) =>
                              handleChange(
                                "company",
                                e.target.value,
                              )
                            }
                            placeholder={t(
                              "contact.form.contact.company.placeholder",
                            )}
                            className="m-input"
                          />
                        </div>

                        <div>
                          <label className="m-label">
                            {t(
                              "contact.form.contact.email.label",
                            )}
                          </label>

                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              handleChange(
                                "email",
                                e.target.value,
                              )
                            }
                            placeholder={t(
                              "contact.form.contact.email.placeholder",
                            )}
                            className="m-input"
                          />
                        </div>

                        <div>
                          <label className="m-label">
                            {t(
                              "contact.form.contact.phone.label",
                            )}
                          </label>

                          <input
                            value={form.phone}
                            onChange={(e) =>
                              handleChange(
                                "phone",
                                e.target.value,
                              )
                            }
                            placeholder={t(
                              "contact.form.contact.phone.placeholder",
                            )}
                            className="m-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-5">
                        <p className="m-section-label">
                          {t("contact.form.project.eyebrow")}
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                          {t("contact.form.project.title")}
                        </h2>
                      </div>

                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) =>
                          handleChange(
                            "message",
                            e.target.value,
                          )
                        }
                        placeholder={t(
                          "contact.form.project.placeholder",
                        )}
                        className="m-input min-h-[170px] resize-y"
                      />
                    </div>

                    <div>
                      <div className="mb-5">
                        <p className="m-section-label">
                          {t("contact.form.budget.eyebrow")}
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                          {t("contact.form.budget.title")}
                        </h2>

                        <p className="mt-2 text-xs text-ink-500">
                          {t(
                            "contact.form.budget.description",
                          )}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                          [
                            "",
                            t(
                              "contact.form.budget.options.flexible",
                            ),
                          ],
                          [
                            "5-15k",
                            t(
                              "contact.form.budget.options.low",
                            ),
                          ],
                          [
                            "15-30k",
                            t(
                              "contact.form.budget.options.medium",
                            ),
                          ],
                          [
                            "30k+",
                            t(
                              "contact.form.budget.options.high",
                            ),
                          ],
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
                                  value,
                                )
                              }
                              className={[
                                "rounded-xl border px-3 py-3 text-xs transition",
                                selected
                                  ? "border-brand-500/60 bg-brand-500/10 text-white"
                                  : "border-white/[0.07] text-ink-500 hover:border-white/[0.15] hover:text-white",
                              ].join(" ")}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {error && (
                      <div
                        className="
                          rounded-xl
                          border border-danger/20
                          bg-danger/[0.05]
                          px-4 py-3
                          text-xs
                          leading-5
                          text-danger
                        "
                      >
                        {error}
                      </div>
                    )}

                    <div className="border-t border-white/[0.07] pt-7">
                      <button
                        type="submit"
                        disabled={
                          loading ||
                          !form.service ||
                          form.message.trim().length < 10
                        }
                        className="
                          m-btn-primary
                          w-full
                          justify-center
                          py-3.5
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        {loading ? (
                          <>
                            <Icon
                              icon="mdi:loading"
                              width={19}
                              className="animate-spin"
                            />

                            {t(
                              "contact.form.submit.loading",
                            )}
                          </>
                        ) : (
                          <>
                            {t(
                              "contact.form.submit.button",
                            )}

                            <Icon
                              icon="mdi:arrow-right"
                              width={19}
                            />
                          </>
                        )}
                      </button>

                      <p className="mt-4 text-center text-[10px] leading-5 text-ink-600">
                        {t("contact.form.submit.privacy")}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}