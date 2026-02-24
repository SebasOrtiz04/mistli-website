import React, { useState } from "react";

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
    if (!emailRegex.test(email)) {
      setError("Ingresa un correo válido.");
      return;
    }
    setError("");
    setSubmitted(true);
    onSubscribe?.(email);
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#0d1545] to-[#0a0e2e] border-t border-white/[0.07] py-14 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-7">

        <h2 className="text-white text-xl sm:text-2xl font-bold text-center tracking-tight">
          ¿Quieres recibir estas actualizaciones en tu correo?
        </h2>

        {submitted ? (
          <p className="flex items-center gap-2 text-emerald-400 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            ¡Suscrito! Te mantendremos al tanto.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full max-w-sm">
            <div className="flex w-full">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className={`flex-1 h-11 px-4 bg-white/[0.06] border border-white/[0.12] border-r-0 rounded-l-lg text-white text-sm placeholder:text-white/30 outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-colors ${error ? "border-red-500/50" : ""}`}
              />
              <button
                onClick={handleSubmit}
                className="h-11 px-5 bg-violet-700 hover:bg-violet-800 active:scale-95 text-white text-sm font-medium rounded-r-lg transition-all whitespace-nowrap"
              >
                Suscribirse
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
          </div>
        )}

      </div>
    </section>
  );
};