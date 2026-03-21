import { useState, useCallback, useContext } from "react";
import { FirebaseContext } from "../../lib/firebase";
import { User } from "firebase/auth";

interface Props {
  onClose: () => void;
  /** email pre-llenado desde el input del login */
  defaultEmail?: string;
}

type Step = "form" | "sent";

export default function ForgotPasswordModal({ onClose, defaultEmail = "" }: Props) {
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("form");

  const context = useContext(FirebaseContext);
  const { firebase } = context || { usuario: null as User | null, firebase: null };

  const handleReset = useCallback(async () => {
    if (!firebase) return;
    if (!email.trim()) {
      setError("Ingresa un correo válido.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await firebase.recuperarPassword(email.trim());
      setStep("sent");
    } catch (err: any) {
      if (err?.code === "auth/user-not-found") {
        setError("No encontramos una cuenta con ese correo.");
      } else if (err?.code === "auth/invalid-email") {
        setError("El formato del correo no es válido.");
      } else {
        setError("No se pudo enviar el correo. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  }, [firebase, email]);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-[400px] rounded-[20px] p-8 relative"
        style={{
          background: "rgba(18,18,32,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,109,250,0.08)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#555] hover:text-[#aaa] transition-colors p-1"
          aria-label="Cerrar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {step === "form" ? (
          <>
            {/* Icon */}
            <div
              className="w-[48px] h-[48px] rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.25)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a89cf7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
            </div>

            <h2 className="text-[20px] font-bold text-center text-[#f0f0f8] tracking-tight mb-1">
              Reset your password
            </h2>
            <p className="text-[13px] text-[#777] text-center mb-7 leading-relaxed">
              Enter your work email and we'll send you a link to reset your password.
            </p>

            {/* Error */}
            {error && (
              <div
                className="mb-4 px-4 py-3 rounded-xl text-[13px] text-red-300"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {error}
              </div>
            )}

            {/* Email input */}
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#bbb] mb-2">Work Email</label>
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-[14px] flex items-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c6dfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleReset()}
                  className="w-full rounded-[10px] py-3 pl-[42px] pr-4 text-sm text-[#e0e0ee] outline-none transition-all placeholder:text-[#555]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7c6dfa")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  autoFocus
                />
              </div>
            </div>

            {/* Send button */}
            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full py-[13px] rounded-xl text-[14px] font-semibold text-white tracking-tight transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #7c6dfa 0%, #5a4de0 100%)",
                boxShadow: "0 4px 20px rgba(124,109,250,0.3)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Sending...
                </span>
              ) : "Send Reset Link"}
            </button>

            <button
              onClick={onClose}
              className="w-full mt-3 py-3 text-[13px] text-[#666] hover:text-[#aaa] transition-colors"
            >
              Back to sign in
            </button>
          </>
        ) : (
          /* Step: sent */
          <>
            <div
              className="w-[48px] h-[48px] rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>

            <h2 className="text-[20px] font-bold text-center text-[#f0f0f8] tracking-tight mb-1">
              Check your inbox
            </h2>
            <p className="text-[13px] text-[#777] text-center mb-2 leading-relaxed">
              We sent a password reset link to
            </p>
            <p className="text-[13px] font-semibold text-[#a89cf7] text-center mb-7">
              {email}
            </p>

            <button
              onClick={onClose}
              className="w-full py-[13px] rounded-xl text-[14px] font-semibold text-white tracking-tight transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7c6dfa 0%, #5a4de0 100%)",
                boxShadow: "0 4px 20px rgba(124,109,250,0.3)",
              }}
            >
              Back to sign in
            </button>

            <p className="text-[12px] text-[#555] text-center mt-4">
              Didn't receive it?{" "}
              <button
                onClick={() => { setStep("form"); setError(null); }}
                className="text-[#7c6dfa] hover:text-[#a89cf7] transition-colors underline underline-offset-2"
              >
                Try again
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}