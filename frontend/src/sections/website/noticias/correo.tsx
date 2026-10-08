import React, { useState } from "react";
import Icon from "../../../components/iconify/Icon";

interface NewsletterBannerProps {
  onSubscribe?: (email: string) => void;
}

export const NewsletterBanner: React.FC<NewsletterBannerProps> = ({
  onSubscribe,
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError("Ingresa tu correo electrónico.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Ingresa un correo válido.");
      return;
    }

    setError("");
    setSubmitted(true);
    onSubscribe?.(email.trim());
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        border-t
        border-white/[0.06]
        bg-ink-950
        px-5
        py-14
        sm:px-8
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Brand glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[320px]
            w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brand-500/[0.07]
            blur-[120px]
          "
        />

        {/* Cyan accent */}
        <div
          className="
            absolute
            left-[30%]
            top-1/2
            h-[180px]
            w-[180px]
            -translate-y-1/2
            rounded-full
            bg-cyan-400/[0.035]
            blur-[100px]
          "
        />

        {/* Magenta accent */}
        <div
          className="
            absolute
            right-[25%]
            top-1/2
            h-[160px]
            w-[160px]
            -translate-y-1/2
            rounded-full
            bg-magenta-500/[0.025]
            blur-[100px]
          "
        />

        {/* Dot grid */}
        <div
          className="
            absolute
            inset-0
            opacity-20
            [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

        {/* Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950/40" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        {/* Small badge */}
        <div
          className="
            mb-5
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-brand-400/20
            bg-brand-500/[0.08]
            shadow-lg
            shadow-brand-500/[0.05]
          "
        >
          <Icon
            icon="mdi:email-newsletter"
            width={18}
            className="text-brand-300"
          />
        </div>

        {/* Heading */}
        <h2
          className="
            text-center
            text-xl
            font-semibold
            tracking-[-0.025em]
            text-ink-100
            sm:text-2xl
          "
        >
          ¿Quieres recibir estas actualizaciones en tu correo?
        </h2>

        {/* Description */}
        <p
          className="
            mt-3
            max-w-md
            text-center
            text-[13px]
            leading-6
            text-ink-600
          "
        >
          Recibe las novedades y actualizaciones de Mistli
          directamente en tu correo.
        </p>

        {/* =================================================
            SUCCESS
        ================================================= */}

        {submitted ? (
          <div
            className="
              mt-7
              flex
              items-center
              gap-2.5
              rounded-xl
              border
              border-success-400/20
              bg-success-400/[0.06]
              px-4
              py-3
              text-sm
              text-success-300
            "
          >
            <Icon
              icon="mdi:check-circle-outline"
              width={18}
            />

            <span>
              ¡Suscrito! Te mantendremos al tanto.
            </span>
          </div>
        ) : (
          /* =================================================
              FORM
          ================================================= */

          <div className="mt-7 w-full max-w-md">
            <div className="flex w-full">
              {/* Input */}
              <div className="relative flex-1">
                <Icon
                  icon="mdi:email-outline"
                  width={17}
                  className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-ink-700
                  "
                />

                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  className={`
                    h-11
                    w-full
                    rounded-l-xl
                    border
                    border-r-0
                    bg-surface-900/70
                    pl-10
                    pr-4
                    text-sm
                    text-ink-100
                    outline-none
                    backdrop-blur-xl
                    transition-all
                    placeholder:text-ink-700
                    focus:bg-surface-900
                    focus:ring-1
                    ${
                      error
                        ? "border-danger-400/40 focus:border-danger-400/50 focus:ring-danger-400/10"
                        : "border-white/[0.08] focus:border-brand-400/40 focus:ring-brand-400/10"
                    }
                  `}
                />
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="
                  group
                  relative
                  h-11
                  shrink-0
                  overflow-hidden
                  rounded-r-xl
                  border
                  border-brand-400/30
                  bg-brand-500
                  px-5
                  text-sm
                  font-medium
                  text-white
                  shadow-lg
                  shadow-brand-500/10
                  transition-all
                  hover:bg-brand-400
                  hover:shadow-brand-500/20
                  active:scale-[0.98]
                "
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Suscribirse

                  <Icon
                    icon="mdi:arrow-right"
                    width={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>

                {/* Hover shine */}
                <span
                  aria-hidden
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                    transition-transform
                    duration-500
                    group-hover:translate-x-full
                  "
                />
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-2.5 flex items-center gap-1.5 px-1">
                <Icon
                  icon="mdi:alert-circle-outline"
                  width={14}
                  className="shrink-0 text-danger-400"
                />

                <p className="text-xs text-danger-400">
                  {error}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom hint */}
        {!submitted && (
          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-ink-700">
            <Icon
              icon="mdi:shield-check-outline"
              width={13}
            />

            <span>
              Sin spam. Solo novedades de Mistli.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};