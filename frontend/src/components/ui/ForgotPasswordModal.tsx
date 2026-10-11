import { useState, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FirebaseContext } from "../../lib/firebase";
import { User } from "firebase/auth";
import { Icon } from "@iconify/react";

interface Props {
  onClose: () => void;
  /** email pre-llenado desde el input del login */
  defaultEmail?: string;
}

type Step = "form" | "sent";

export default function ForgotPasswordModal({
  onClose,
  defaultEmail = "",
}: Props) {
  const { t } = useTranslation();

  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("form");

  const context = useContext(FirebaseContext);

  const { firebase } = context || {
    usuario: null as User | null,
    firebase: null,
  };

  const handleReset = useCallback(async () => {
    if (!firebase) return;

    if (!email.trim()) {
      setError(t("forgotPassword.validation.invalidEmail"));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await firebase.recuperarPassword(email.trim());
      setStep("sent");
    } catch (err: any) {
      if (err?.code === "auth/user-not-found") {
        setError(t("forgotPassword.validation.userNotFound"));
      } else if (err?.code === "auth/invalid-email") {
        setError(t("forgotPassword.validation.invalidEmailFormat"));
      } else {
        setError(t("forgotPassword.validation.sendError"));
      }
    } finally {
      setLoading(false);
    }
  }, [firebase, email, t]);

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-ink-950/80
        px-4
        backdrop-blur-md
      "
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative w-full max-w-md
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-surface-900/95
          shadow-2xl shadow-black/50
        "
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("forgotPassword.close")}
          className="
            absolute right-4 top-4 z-10
            flex h-9 w-9 items-center justify-center
            rounded-xl
            border border-white/5
            bg-white/[0.03]
            text-ink-400
            transition-all
            hover:border-white/10
            hover:bg-white/[0.06]
            hover:text-white
          "
        >
          <Icon icon="mdi:close" width={20} />
        </button>

        <div className="relative px-6 py-8 sm:px-8">
          {step === "form" ? (
            <>
              {/* Icon */}
              <div
                className="
                  mx-auto mb-5
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl
                  border border-brand-500/20
                  bg-brand-500/10
                  shadow-lg shadow-brand-500/10
                "
              >
                <Icon
                  icon="mdi:lock-reset"
                  width={27}
                  className="text-brand-400"
                />
              </div>

              {/* Heading */}
              <div className="mb-7 text-center">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  {t("forgotPassword.form.title")}
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-400">
                  {t("forgotPassword.form.description")}
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="
                    mb-5 flex items-start gap-3
                    rounded-xl
                    border border-danger-500/20
                    bg-danger-500/10
                    px-4 py-3
                    text-sm text-danger-300
                  "
                >
                  <Icon
                    icon="mdi:alert-circle-outline"
                    width={19}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{error}</span>
                </div>
              )}

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="forgot-email"
                  className="mb-2 block text-sm font-medium text-ink-200"
                >
                  {t("forgotPassword.form.email.label")}
                </label>

                <div className="relative">
                  <Icon
                    icon="mdi:email-outline"
                    width={19}
                    className="
                      pointer-events-none
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-brand-400
                    "
                  />

                  <input
                    id="forgot-email"
                    type="email"
                    placeholder={t(
                      "forgotPassword.form.email.placeholder",
                    )}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);

                      if (error) {
                        setError(null);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        void handleReset();
                      }
                    }}
                    autoFocus
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/[0.04]
                      py-3.5 pl-12 pr-4
                      text-sm text-white
                      outline-none
                      transition-all
                      placeholder:text-ink-500
                      focus:border-brand-500/60
                      focus:bg-white/[0.06]
                      focus:ring-2
                      focus:ring-brand-500/10
                    "
                  />
                </div>
              </div>

              {/* Send */}
              <button
                type="button"
                onClick={() => void handleReset()}
                disabled={loading}
                className="
                  flex w-full items-center justify-center
                  rounded-xl
                  bg-brand-500
                  py-3.5
                  text-sm font-semibold text-ink-950
                  shadow-lg shadow-brand-500/20
                  transition-all
                  hover:bg-brand-400
                  hover:shadow-brand-500/30
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon
                      icon="mdi:loading"
                      width={18}
                      className="animate-spin"
                    />

                    {t("forgotPassword.form.submit.sending")}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {t("forgotPassword.form.submit.send")}

                    <Icon
                      icon="mdi:arrow-right"
                      width={18}
                    />
                  </span>
                )}
              </button>

              {/* Back */}
              <button
                type="button"
                onClick={onClose}
                className="
                  mt-3 w-full
                  py-3
                  text-sm
                  text-ink-400
                  transition-colors
                  hover:text-white
                "
              >
                {t("forgotPassword.form.back")}
              </button>
            </>
          ) : (
            <>
              {/* Success icon */}
              <div
                className="
                  mx-auto mb-5
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl
                  border border-success-500/20
                  bg-success-500/10
                  shadow-lg shadow-success-500/10
                "
              >
                <Icon
                  icon="mdi:check-circle-outline"
                  width={28}
                  className="text-success-400"
                />
              </div>

              {/* Heading */}
              <div className="text-center">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  {t("forgotPassword.sent.title")}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {t("forgotPassword.sent.description")}
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-brand-400">
                  {email}
                </p>
              </div>

              {/* Success info */}
              <div
                className="
                  mt-6
                  rounded-xl
                  border border-success-500/10
                  bg-success-500/5
                  px-4 py-3
                "
              >
                <div className="flex items-start gap-3">
                  <Icon
                    icon="mdi:email-check-outline"
                    width={20}
                    className="mt-0.5 shrink-0 text-success-400"
                  />

                  <p className="text-xs leading-relaxed text-ink-300">
                    {t("forgotPassword.sent.info")}
                  </p>
                </div>
              </div>

              {/* Back */}
              <button
                type="button"
                onClick={onClose}
                className="
                  mt-6 flex w-full items-center justify-center
                  gap-2
                  rounded-xl
                  bg-brand-500
                  py-3.5
                  text-sm font-semibold
                  text-ink-950
                  shadow-lg shadow-brand-500/20
                  transition-all
                  hover:bg-brand-400
                  hover:shadow-brand-500/30
                "
              >
                {t("forgotPassword.sent.back")}
              </button>

              {/* Try again */}
              <p className="mt-4 text-center text-xs text-ink-500">
                {t("forgotPassword.sent.retry.question")}{" "}

                <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setError(null);
                  }}
                  className="
                    font-medium
                    text-brand-400
                    underline
                    underline-offset-2
                    transition-colors
                    hover:text-brand-300
                  "
                >
                  {t("forgotPassword.sent.retry.action")}
                </button>
              </p>
            </>
          )}
        </div>

        {/* Bottom accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
      </div>
    </div>
  );
}