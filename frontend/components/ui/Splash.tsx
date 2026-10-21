import Image from "next/image";

export default function Splash() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 text-ink-50">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main brand glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-105
            w-105
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brand-500/10
            blur-[120px]
            animate-pulse
          "
        />

        {/* Cyan glow */}
        <div
          className="
            absolute
            left-[42%]
            top-[46%]
            h-65
            w-65
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400/8
            blur-[100px]
          "
        />

        {/* Magenta glow */}
        <div
          className="
            absolute
            left-[58%]
            top-[52%]
            h-55
            w-55
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-magenta-500/6
            blur-[100px]
          "
        />

        {/* Dot grid */}
        <div
          className="
            absolute
            inset-0
            opacity-20
            bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)]]
            bg-size-[32px_32px]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,10,15,0.35)_45%,#090a0f_100%)]
          "
        />
      </div>

      {/* =====================================================
          LOADER
      ===================================================== */}

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated rings */}
        <div className="relative flex h-64 w-64 items-center justify-center">
          {/* Outer ring */}
          <div
            className="
              absolute
              h-64
              w-64
              rounded-full
              border
              border-brand-400/8
              animate-[ping_3s_ease-out_infinite]
            "
          />

          {/* Middle ring */}
          <div
            className="
              absolute
              h-52
              w-52
              rounded-full
              border
              border-cyan-400/10
              animate-[ping_3s_ease-out_1s_infinite]
            "
          />

          {/* Inner glow */}
          <div
            className="
              absolute
              h-40
              w-40
              rounded-full
              bg-linear-to-br
              from-brand-500/12
              via-cyan-400/8
              to-magenta-500/8
              blur-2xl
              animate-pulse
            "
          />

          {/* Logo */}
          <div
            className="
              relative
              flex
              h-36
              w-36
              items-center
              justify-center
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-brand-500/12
                blur-2xl
              "
            />

            <Image
              src="/logo.png"
              fill
              sizes="h-auto w-32"
              alt="Mistli"
              className="
                relative
                z-10
                object-contain
                drop-shadow-[0_0_25px_rgba(121,146,252,0.35)]
                animate-[mistliFloat_3s_ease-in-out_infinite]
              "
              priority
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="mt-2 text-center">
          <h1
            className="
              text-[18px]
              font-semibold
              tracking-[0.18em]
              text-ink-100
            "
          >
            MISTLI
          </h1>

          <p
            className="
              mt-2
              text-[11px]
              tracking-[0.12em]
              text-ink-600
            "
          >
            Soluciones en la nube
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-8 flex items-center gap-1.5">
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-brand-400
              animate-[loadingDot_1.4s_ease-in-out_infinite]
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-400
              animate-[loadingDot_1.4s_ease-in-out_0.2s_infinite]
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-magenta-400
              animate-[loadingDot_1.4s_ease-in-out_0.4s_infinite]
            "
          />
        </div>

        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ink-700">
          Cargando
        </p>
      </div>

      {/* =====================================================
          CUSTOM ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes mistliFloat {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }

          50% {
            transform: translateY(-5px) scale(1.015);
          }
        }

        @keyframes loadingDot {
          0%,
          100% {
            opacity: 0.25;
            transform: translateY(0) scale(0.8);
          }

          50% {
            opacity: 1;
            transform: translateY(-3px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}