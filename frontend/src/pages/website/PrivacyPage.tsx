import { useTranslation } from "react-i18next";
import Icon from "../../components/iconify/Icon";

export default function PrivacyPage() {
  const { t } = useTranslation();

  const sections = t("privacy.sections", {
    returnObjects: true,
  }) as Array<{
    title: string;
    content: Array<{
      subtitle: string;
      text: string;
    }>;
  }>;

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 text-ink-50">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        {/* Brand glow */}
        <div
          className="
            absolute
            -left-[20vw]
            top-[5%]
            h-[45vw]
            w-[45vw]
            max-h-[700px]
            max-w-[700px]
            rounded-full
            bg-brand-500/[0.07]
            blur-[150px]
          "
        />

        {/* Cyan glow */}
        <div
          className="
            absolute
            -right-[18vw]
            top-[30%]
            h-[40vw]
            w-[40vw]
            max-h-[650px]
            max-w-[650px]
            rounded-full
            bg-cyan-500/[0.045]
            blur-[160px]
          "
        />

        {/* Small central accent */}
        <div
          className="
            absolute
            left-[45%]
            top-[20%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-brand-400/[0.025]
            blur-[120px]
          "
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-20
            [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/20 to-ink-950/80" />
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative z-10">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-20">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-12">
            {/* Badge */}
            <div className="mb-5 flex items-center gap-2">
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-brand-400/20
                  bg-brand-500/10
                "
              >
                <Icon
                  icon="mdi:shield-lock-outline"
                  width={16}
                  className="text-brand-300"
                />
              </div>

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-brand-400
                "
              >
                {t("privacy.header.badge")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="
                mb-4
                text-3xl
                font-semibold
                tracking-[-0.04em]
                text-ink-50
                sm:text-[40px]
              "
            >
              {t("privacy.header.title")}
            </h1>

            {/* Date */}
            <p className="text-[13px] text-ink-600">
              {t("privacy.header.lastUpdated")}{" "}
              <span className="text-ink-500">
                {t("privacy.header.date")}
              </span>
            </p>

            {/* Intro */}
            <div
              className="
                relative
                mt-8
                overflow-hidden
                rounded-2xl
                border
                border-brand-400/10
                bg-surface-900/70
                p-5
                shadow-lg
                shadow-black/20
                backdrop-blur-xl
              "
            >
              {/* Accent line */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-[2px]
                  bg-gradient-to-b
                  from-brand-400
                  to-cyan-400
                "
              />

              <div className="pl-2">
                <p className="text-[13px] leading-7 text-ink-400">
                  {t("privacy.header.description")}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              TABLE OF CONTENTS
          ================================================= */}

          <div
            className="
              mb-14
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.07]
              bg-surface-900/60
              shadow-xl
              shadow-black/10
              backdrop-blur-xl
            "
          >
            {/* Header */}
            <div
              className="
                border-b
                border-white/[0.06]
                bg-white/[0.015]
                px-5
                py-4
              "
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  icon="mdi:format-list-bulleted"
                  width={16}
                  className="text-brand-400"
                />

                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-ink-500
                  "
                >
                  {t("privacy.navigation.contents")}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="p-5">
              <ol className="grid gap-1 sm:grid-cols-2">
                {sections.map((section, index) => (
                  <li key={index}>
                    <a
                      href={`#section-${index}`}
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-[13px]
                        text-ink-500
                        no-underline
                        transition-all
                        hover:bg-brand-500/[0.05]
                        hover:text-ink-200
                      "
                    >
                      <span
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-md
                          border
                          border-white/[0.06]
                          bg-white/[0.02]
                          text-[10px]
                          font-medium
                          tabular-nums
                          text-ink-700
                          transition-colors
                          group-hover:border-brand-400/20
                          group-hover:text-brand-400
                        "
                      >
                        {index + 1}
                      </span>

                      <span>{section.title}</span>

                      <Icon
                        icon="mdi:arrow-top-right"
                        width={13}
                        className="
                          ml-auto
                          text-ink-700
                          opacity-0
                          transition-all
                          group-hover:text-brand-400
                          group-hover:opacity-100
                        "
                      />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* =================================================
              SECTIONS
          ================================================= */}

          <div className="space-y-12">
            {sections.map((section, index) => (
              <section
                key={index}
                id={`section-${index}`}
                className="scroll-mt-8"
              >
                {/* Section heading */}
                <div className="mb-6 flex items-start gap-4">
                  <div
                    className="
                      mt-0.5
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-brand-400/15
                      bg-brand-500/[0.07]
                    "
                  >
                    <span className="text-[11px] font-semibold tabular-nums text-brand-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h2
                      className="
                        text-[19px]
                        font-semibold
                        tracking-[-0.025em]
                        text-ink-100
                      "
                    >
                      {section.title}
                    </h2>

                    <div
                      className="
                        mt-2
                        h-px
                        w-10
                        bg-gradient-to-r
                        from-brand-400
                        to-cyan-400
                      "
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-7 pl-12">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3
                        className="
                          mb-2
                          text-[14px]
                          font-semibold
                          text-ink-200
                        "
                      >
                        {item.subtitle}
                      </h3>

                      <p
                        className="
                          text-[13px]
                          leading-7
                          text-ink-500
                        "
                      >
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                {index < sections.length - 1 && (
                  <div className="mt-10 h-px bg-white/[0.05]" />
                )}
              </section>
            ))}
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              mt-16
              border-t
              border-white/[0.06]
              pt-6
            "
          >
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:shield-check-outline"
                width={16}
                className="text-brand-400/70"
              />

              <span className="text-[11px] text-ink-700">
                Mistli
              </span>

              <span className="text-[11px] text-ink-800">
                •
              </span>

              <span className="text-[11px] text-ink-700">
                {t("privacy.header.title")}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
