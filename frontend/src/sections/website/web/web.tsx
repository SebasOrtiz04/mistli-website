import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../../components/iconify/Icon";

const stack = [
  "React",
  "Next.js",
  "Vite",
  "TypeScript",
  "Tailwind CSS",
  "APIs",
  "PostgreSQL",
  "Firebase",
];

export default function Web() {
  const { t } = useTranslation();

  const features = t("web.solutions.items", {
    returnObjects: true,
  }) as {
    icon: string;
    title: string;
    description: string;
  }[];

  return (
    <main className="relative overflow-hidden bg-[#080A10] text-[#F4F5F8]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[850px] overflow-hidden"
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
          className="absolute right-[-120px] top-32 h-[520px] w-[520px] rounded-full opacity-[0.14] blur-[130px]"
          style={{ background: "var(--mistli-magenta)" }}
        />

        <div className="m-grid-bg absolute inset-0" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
          <div className="max-w-4xl">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#60E0FA]/25 bg-[#60E0FA]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[#C7F5FC]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#60E0FA]" />
              {t("web.badge")}
            </span>

            <h1 className="text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {t("web.hero.title")}

              <span className="m-gradient-text block pb-2">
                {t("web.hero.titleHighlight")}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
              {t("web.hero.description")}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contacto"
                className="m-btn m-btn-primary"
              >
                {t("web.hero.primaryButton")}

                <Icon
                  icon="mdi:arrow-right"
                  width={19}
                  height={19}
                />
              </Link>

              <a
                href="#soluciones"
                className="m-btn m-btn-ghost"
              >
                {t("web.hero.secondaryButton")}

                <Icon
                  icon="mdi:arrow-down"
                  width={18}
                  height={18}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="soluciones"
        className="relative border-y border-white/[0.06] bg-white/[0.015] py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
              {t("web.solutions.eyebrow")}
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("web.solutions.title")}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="m-card rounded-2xl p-6"
              >
                <div className="m-icon-tile mb-7 flex h-11 w-11 items-center justify-center rounded-xl">
                  <Icon
                    icon={feature.icon}
                    width={22}
                    height={22}
                  />
                </div>

                <h3 className="text-base font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#AEB3C2]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
              {t("web.technology.eyebrow")}
            </p>

            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t("web.technology.title")}
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#AEB3C2]">
              {t("web.technology.description")}
            </p>
          </div>

          <div className="flex flex-wrap content-start gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-[#C4C9D6]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="m-gradient-border rounded-3xl p-px">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0B0D14] px-6 py-16 text-center sm:px-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                {t("web.cta.eyebrow")}
              </p>

              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                {t("web.cta.title")}
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-[#AEB3C2]">
                {t("web.cta.description")}
              </p>

              <Link
                to="/contacto"
                className="m-btn m-btn-primary mt-9"
              >
                {t("web.cta.button")}

                <Icon
                  icon="mdi:arrow-right"
                  width={19}
                  height={19}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}