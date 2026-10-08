import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../../components/iconify/Icon";

type Accent =
  | "ia"
  | "web"
  | "backend"
  | "automatizacion"
  | "documentos"
  | "aplicaciones";

interface Service {
  title: string;
  description: string;
  path: string;
  icon: string;
  tag: string;
  accent: Accent;
  highlights: string[];
}

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`m-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({
  eyebrow,
  title,
  muted,
  description,
}: {
  eyebrow: string;
  title: string;
  muted?: string;
  description?: string;
}) {
  return (
    <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
          {eyebrow}
        </p>

        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#F4F5F8] sm:text-4xl">
          {title}
          {muted && <span className="text-[#858B9D]"> {muted}</span>}
        </h2>
      </div>

      {description && (
        <p className="max-w-md text-sm leading-7 text-[#AEB3C2]">
          {description}
        </p>
      )}
    </div>
  );
}

function ServiceCard({
  service,
  cta,
}: {
  service: Service;
  cta: string;
}) {
  const handlePointerMove = (
    e: ReactPointerEvent<HTMLAnchorElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty(
      "--mx",
      `${e.clientX - rect.left}px`
    );

    e.currentTarget.style.setProperty(
      "--my",
      `${e.clientY - rect.top}px`
    );
  };

  return (
    <Link
      to={service.path}
      data-accent={service.accent}
      onPointerMove={handlePointerMove}
      className="m-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 no-underline"
    >
      <div className="m-icon-tile mb-7 flex h-11 w-11 items-center justify-center rounded-xl">
        <Icon
          icon={service.icon}
          width={22}
          height={22}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <p className="m-accent-text mb-2 text-[10px] font-semibold tracking-[0.16em]">
        {service.tag}
      </p>

      <h3 className="text-lg font-semibold text-[#F4F5F8]">
        {service.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#AEB3C2]">
        {service.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {service.highlights.map((item) => (
          <li
            key={item}
            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[11px] text-[#AEB3C2]"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="m-accent-text mt-auto flex items-center gap-1.5 pt-7 text-xs font-medium opacity-80 transition-opacity group-hover:opacity-100">
        {cta}
        <Icon
          icon="mdi:arrow-right"
          width={16}
          height={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

export default function Home() {
  const { t } = useTranslation();

  const services = t("home.services.items", {
    returnObjects: true,
  }) as Service[];

  const outcomes = t("home.outcomes", {
    returnObjects: true,
  }) as Array<{
    icon: string;
    title: string;
    text: string;
    color: string;
  }>;

  const approach = t("home.approach.steps", {
    returnObjects: true,
  }) as Array<{
    number: string;
    title: string;
    text: string;
    color: string;
  }>;

  const capabilities = t("home.technology.capabilities", {
    returnObjects: true,
  }) as string[];

  const trust = [
    {
      icon: "mdi:code-braces",
      label: t("home.hero.trust.customDevelopment"),
    },
    {
      icon: "mdi:brain",
      label: t("home.hero.trust.appliedAi"),
    },
    {
      icon: "mdi:lightning-bolt",
      label: t("home.hero.trust.automation"),
    },
    {
      icon: "mdi:cloud-outline",
      label: t("home.hero.trust.cloud"),
    },
    {
      icon: "mdi:map-marker-outline",
      label: t("home.hero.trust.madeInMexico"),
    },
  ];

  const flowSteps = [
    {
      icon: "mdi:file-document-outline",
      title: t("home.hero.workflow.steps.received.title"),
      meta: t("home.hero.workflow.steps.received.meta"),
      color: "var(--mistli-cyan)",
    },
    {
      icon: "mdi:brain",
      title: t("home.hero.workflow.steps.extraction.title"),
      meta: t("home.hero.workflow.steps.extraction.meta"),
      color: "var(--mistli-magenta)",
    },
    {
      icon: "mdi:shield-check-outline",
      title: t("home.hero.workflow.steps.validation.title"),
      meta: t("home.hero.workflow.steps.validation.meta"),
      color: "var(--mistli-primary)",
    },
    {
      icon: "mdi:database-check-outline",
      title: t("home.hero.workflow.steps.registration.title"),
      meta: t("home.hero.workflow.steps.registration.meta"),
      color: "var(--mistli-pink)",
    },
  ];

  return (
    <div className="relative overflow-x-clip bg-[#080A10] text-[#F4F5F8]">
      {/* BACKGROUND */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden"
      >
        <div
          className="absolute -top-44 left-[4%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[120px]"
          style={{ background: "var(--mistli-cyan)" }}
        />

        <div
          className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-[0.15] blur-[130px]"
          style={{ background: "var(--mistli-primary)" }}
        />

        <div
          className="absolute -right-20 top-24 h-[480px] w-[480px] rounded-full opacity-[0.13] blur-[120px]"
          style={{ background: "var(--mistli-magenta)" }}
        />

        <div className="m-grid-bg absolute inset-0" />
      </div>

      {/* HERO */}
      <section className="relative flex min-h-[calc(100svh-72px)] items-center">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-36">
          <div>
            <Reveal>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#7992FC]/25 bg-[#7992FC]/10 px-3.5 py-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "var(--mistli-cyan)",
                    boxShadow: "0 0 10px var(--mistli-cyan)",
                  }}
                />

                <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#C7D0FE]">
                  {t("home.hero.badge")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                {t("home.hero.title")}
                <span className="m-gradient-text block pb-1">
                  {t("home.hero.titleAccent")}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
                {t("home.hero.description")}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link to="/contacto" className="m-btn m-btn-primary">
                  {t("home.hero.primaryCta")}
                  <Icon icon="mdi:arrow-right" width={19} height={19} />
                </Link>

                <a href="#servicios" className="m-btn m-btn-ghost">
                  {t("home.hero.secondaryCta")}
                  <Icon icon="mdi:arrow-down" width={18} height={18} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#858B9D]">
                {trust.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-1.5"
                  >
                    <Icon
                      icon={item.icon}
                      width={15}
                      height={15}
                      className="text-[#7992FC]"
                    />
                    {item.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* WORKFLOW */}
          <Reveal
            delay={200}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 40%, rgba(121,146,252,0.28), rgba(251,95,239,0.10) 60%, transparent 80%)",
              }}
            />

            <div
              role="group"
              aria-label={t("home.hero.workflow.ariaLabel")}
              className="relative rounded-2xl border border-white/10 bg-[#0D0F17]/85 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="hidden gap-1.5 sm:flex" aria-hidden>
                    <i className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <i className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <i className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </span>

                  <span className="truncate text-xs text-[#858B9D] sm:ml-2">
                    {t("home.hero.workflow.title")}
                  </span>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#60E0FA]/25 bg-[#60E0FA]/10 px-2.5 py-1 text-[11px] font-medium text-[#60E0FA]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#60E0FA] opacity-70 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#60E0FA]" />
                  </span>
                  {t("home.hero.workflow.status")}
                </span>
              </div>

              <ol className="space-y-1.5 p-2 pt-0">
                {flowSteps.map((step, i) => (
                  <li
                    key={step.title}
                    className="m-flow-step flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5"
                    style={
                      {
                        "--accent": step.color,
                        "--i": i,
                      } as CSSProperties
                    }
                  >
                    <div className="m-icon-tile m-flow-dot flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      <Icon icon={step.icon} width={20} height={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#F4F5F8]">
                        {step.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-[#858B9D]">
                        {step.meta}
                      </p>
                    </div>

                    <span className="font-mono text-[11px] text-[#858B9D]">
                      0{i + 1}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div
              aria-hidden
              className="m-float absolute -left-7 -top-5 hidden items-center gap-2 rounded-xl border border-[#FB5FEF]/25 bg-[#11131C]/90 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur lg:flex"
            >
              <Icon
                icon="mdi:robot-outline"
                width={16}
                height={16}
                className="text-[#FB5FEF]"
              />
              {t("home.hero.workflow.floating.aiAgent")}
            </div>

            <div
              aria-hidden
              className="m-float m-float-b absolute -bottom-5 -right-4 hidden items-center gap-2 rounded-xl border border-[#60E0FA]/25 bg-[#11131C]/90 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur lg:flex"
            >
              <Icon
                icon="mdi:api"
                width={16}
                height={16}
                className="text-[#60E0FA]"
              />
              {t("home.hero.workflow.floating.connectedApi")}
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="relative border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/[0.06] px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
          {outcomes.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 100}
              className="md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <div
                className="flex gap-4 py-8 md:py-10"
                style={{ "--accent": item.color } as CSSProperties}
              >
                <div className="m-icon-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <Icon icon={item.icon} width={22} height={22} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#F4F5F8]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-[#AEB3C2]">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={t("home.services.section.eyebrow")}
              title={t("home.services.section.title")}
              muted={t("home.services.section.muted")}
              description={t("home.services.section.description")}
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal
                key={service.path}
                delay={(i % 3) * 90}
                className="h-full"
              >
                <ServiceCard
                  service={service}
                  cta={t("home.services.cardCta")}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="relative border-t border-white/[0.06] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                {t("home.approach.eyebrow")}
              </p>

              <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {t("home.approach.title")}
                <span className="m-gradient-text">
                  {" "}
                  {t("home.approach.titleAccent")}
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#AEB3C2]">
                {t("home.approach.description")}
              </p>
            </Reveal>

            <div className="relative">
              <span
                aria-hidden
                className="m-timeline-line absolute bottom-8 left-[calc(1.25rem+1.25rem+1px)] top-8 w-px"
              />

              <ol className="relative space-y-3">
                {approach.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.number}
                    delay={i * 90}
                    className="relative flex gap-5 rounded-2xl border border-white/[0.07] bg-[#0C0E15] p-5"
                    style={{ "--accent": item.color } as CSSProperties}
                  >
                    <span className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs">
                      {item.number}
                    </span>

                    <div>
                      <h3 className="text-sm font-semibold text-[#F4F5F8]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[#AEB3C2]">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#858B9D]">
                {t("home.technology.eyebrow")}
              </p>

              <p className="mt-2 text-sm text-[#AEB3C2]">
                {t("home.technology.description")}
              </p>
            </div>

            <ul className="flex max-w-3xl flex-wrap gap-2">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-[#C4C9D6] transition-colors hover:border-[#7992FC]/40 hover:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="m-gradient-border rounded-3xl p-px">
              <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0B0D14] px-6 py-16 text-center sm:px-12 lg:py-20">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-[0.18] blur-[100px]"
                  style={{ background: "var(--mistli-cyan)" }}
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full opacity-[0.18] blur-[110px]"
                  style={{ background: "var(--mistli-magenta)" }}
                />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">
                    {t("home.cta.eyebrow")}
                  </p>

                  <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                    {t("home.cta.title")}
                    <span className="m-gradient-text">
                      {" "}
                      {t("home.cta.titleAccent")}
                    </span>
                  </h2>

                  <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#AEB3C2]">
                    {t("home.cta.description")}
                  </p>

                  <div className="mt-9">
                    <Link
                      to="/contacto"
                      className="m-btn m-btn-primary px-7"
                    >
                      {t("home.cta.button")}
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
          </Reveal>
        </div>
      </section>
    </div>
  );
}