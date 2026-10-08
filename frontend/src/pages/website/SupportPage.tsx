import { useState } from "react";
import { useTranslation } from "react-i18next";

import Icon from "../../components/iconify/Icon";

type SupportForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const categoryConfig = [
  {
    key: "account",
    icon: "mdi:account-outline",
    color: "brand",
  },
  {
    key: "security",
    icon: "mdi:shield-check-outline",
    color: "cyan",
  },
  {
    key: "billing",
    icon: "mdi:credit-card-outline",
    color: "magenta",
  },
  {
    key: "integrations",
    icon: "mdi:connection",
    color: "brand",
  },
] as const;

export default function SupportPage() {
  const { t } = useTranslation();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [form, setForm] = useState<SupportForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const faqs = t("support.faq.items", {
    returnObjects: true,
  }) as Array<{
    question: string;
    answer: string;
  }>;

  const handleSend = async () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setError(t("support.validation.required"));
      return;
    }

    if (form.message.trim().length < 10) {
      setError(t("support.validation.shortMessage"));
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail || t("support.validation.sendError"),
        );
      }

      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("support.validation.sendError"),
      );
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-950 text-ink-50">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute -left-40 -top-40 h-[550px] w-[550px]
            rounded-full bg-cyan-500/[0.07] blur-[150px]
          "
        />

        <div
          className="
            absolute -right-40 top-[15%] h-[600px] w-[600px]
            rounded-full bg-brand-500/[0.09] blur-[160px]
          "
        />

        <div
          className="
            absolute bottom-[-300px] left-[35%] h-[500px] w-[500px]
            rounded-full bg-magenta-500/[0.05] blur-[160px]
          "
        />

        <div className="m-grid-bg absolute inset-0 opacity-25" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">
        {/* Hero */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="
              inline-flex items-center gap-2 rounded-full
              border border-brand-500/25 bg-brand-500/10
              px-4 py-2 text-[10px] font-semibold uppercase
              tracking-[0.18em] text-brand-200
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {t("support.hero.badge")}
          </span>

          <h1
            className="
              mt-7 text-4xl font-semibold tracking-[-0.045em]
              text-ink-50 sm:text-5xl
            "
          >
            {t("support.hero.title")}
            <span className="m-gradient-text block">
              {t("support.hero.titleHighlight")}
            </span>
          </h1>

          <p
            className="
              mx-auto mt-5 max-w-xl text-sm leading-7
              text-ink-400 sm:text-base
            "
          >
            {t("support.hero.description")}
          </p>
        </div>

        {/* Categories */}
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categoryConfig.map((category) => {
            const iconClasses =
              category.color === "cyan"
                ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
                : category.color === "magenta"
                  ? "border-magenta-500/20 bg-magenta-500/10 text-magenta-400"
                  : "border-brand-500/20 bg-brand-500/10 text-brand-300";

            return (
              <div
                key={category.key}
                className="
                  group rounded-2xl border border-white/[0.07]
                  bg-white/[0.02] p-4 transition-all duration-200
                  hover:-translate-y-0.5 hover:border-brand-500/25
                  hover:bg-white/[0.035]
                "
              >
                <div
                  className={`
                    mx-auto flex h-10 w-10 items-center justify-center
                    rounded-xl border ${iconClasses}
                  `}
                >
                  <Icon icon={category.icon} width={19} />
                </div>

                <span
                  className="
                    mt-3 block text-center text-xs font-medium text-ink-300
                  "
                >
                  {t(`support.categories.${category.key}`)}
                </span>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <section className="mb-14">
          <div className="mb-6">
            <p className="m-section-label">
              {t("support.faq.sectionLabel")}
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {t("support.faq.title")}
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const open = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={[
                    "overflow-hidden rounded-2xl border transition-all duration-200",
                    open
                      ? "border-brand-500/25 bg-brand-500/[0.035]"
                      : "border-white/[0.07] bg-white/[0.02]",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="
                      flex w-full items-center justify-between
                      px-5 py-4 text-left
                    "
                    aria-expanded={open}
                  >
                    <span
                      className={[
                        "text-sm font-medium transition-colors",
                        open ? "text-brand-300" : "text-ink-300",
                      ].join(" ")}
                    >
                      {faq.question}
                    </span>

                    <Icon
                      icon={
                        open
                          ? "mdi:chevron-up"
                          : "mdi:chevron-down"
                      }
                      width={19}
                      className={
                        open ? "text-cyan-400" : "text-ink-600"
                      }
                    />
                  </button>

                  {open && (
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-7 text-ink-500">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Support form */}
        <section>
          <div className="mb-6">
            <p className="m-section-label">
              {t("support.contact.sectionLabel")}
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {t("support.contact.title")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ink-500">
              {t("support.contact.description")}
            </p>
          </div>

          {sent ? (
            <div
              className="
                flex min-h-[400px] flex-col items-center justify-center
                rounded-[24px] border border-success/20
                bg-success/[0.04] p-8 text-center
              "
            >
              <div
                className="
                  flex h-16 w-16 items-center justify-center
                  rounded-2xl border border-success/20
                  bg-success/10 text-success
                "
              >
                <Icon icon="mdi:check" width={32} />
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {t("support.contact.success.title")}
              </h3>

              <p className="mt-3 max-w-md text-sm leading-7 text-ink-400">
                {t("support.contact.success.description")}{" "}
                <span className="text-cyan-400">
                  {form.email}
                </span>{" "}
                {t("support.contact.success.asap")}
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="
                  mt-7 inline-flex items-center gap-2 rounded-xl
                  border border-white/[0.08] bg-white/[0.03]
                  px-5 py-3 text-sm font-medium text-ink-300
                  transition hover:border-white/[0.16]
                  hover:bg-white/[0.06] hover:text-white
                "
              >
                {t("support.contact.success.newMessage")}
                <Icon icon="mdi:arrow-right" width={18} />
              </button>
            </div>
          ) : (
            <div
              className="
                relative overflow-hidden rounded-[24px]
                border border-white/[0.08] bg-ink-900/80 p-6
                shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8
              "
            >
              <div
                aria-hidden
                className="
                  pointer-events-none absolute -right-32 -top-32
                  h-72 w-72 rounded-full bg-brand-500/[0.06]
                  blur-[100px]
                "
              />

              <div className="relative">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="m-label">
                      {t("support.contact.form.name.label")}
                    </label>

                    <input
                      type="text"
                      placeholder={t(
                        "support.contact.form.name.placeholder",
                      )}
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      className="m-input"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="m-label">
                      {t("support.contact.form.email.label")}
                    </label>

                    <input
                      type="email"
                      placeholder={t(
                        "support.contact.form.email.placeholder",
                      )}
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      className="m-input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="m-label">
                    {t("support.contact.form.subject.label")}
                  </label>

                  <input
                    type="text"
                    placeholder={t(
                      "support.contact.form.subject.placeholder",
                    )}
                    value={form.subject}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subject: e.target.value,
                      })
                    }
                    className="m-input"
                  />
                </div>

                <div className="mt-5">
                  <label className="m-label">
                    {t("support.contact.form.message.label")}
                  </label>

                  <textarea
                    rows={7}
                    placeholder={t(
                      "support.contact.form.message.placeholder",
                    )}
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    className="m-input min-h-[180px] resize-y"
                  />
                </div>

                {error && (
                  <div
                    className="
                      mt-5 rounded-xl border border-danger/20
                      bg-danger/[0.05] px-4 py-3 text-xs
                      leading-5 text-danger
                    "
                  >
                    {error}
                  </div>
                )}

                <div className="mt-6 flex justify-end border-t border-white/[0.07] pt-6">
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={
                      sending ||
                      !form.name.trim() ||
                      !form.email.trim() ||
                      !form.message.trim()
                    }
                    className="
                      m-btn-primary min-w-[160px] justify-center
                      disabled:cursor-not-allowed disabled:opacity-50
                    "
                  >
                    {sending ? (
                      <>
                        <Icon
                          icon="mdi:loading"
                          width={18}
                          className="animate-spin"
                        />
                        {t(
                          "support.contact.form.submit.sending",
                        )}
                      </>
                    ) : (
                      <>
                        {t("support.contact.form.submit.send")}
                        <Icon
                          icon="mdi:arrow-right"
                          width={18}
                        />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-right text-[10px] leading-5 text-ink-600">
                  {t("support.contact.form.privacy")}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}