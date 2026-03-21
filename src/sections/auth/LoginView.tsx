import { useState, useCallback, useContext, useEffect } from "react";
import { FirebaseContext } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { usernamePro } from "../../helpers/uiAmounts";
import ForgotPasswordModal from "../../components/ui/ForgotPasswordModal";


export default function LoginView() {
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSigned, setKeepSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(FirebaseContext);
  const { usuario, firebase } = context || { usuario: null as User | null, firebase: null };
  const navigate = useNavigate();
  const lastlinks = [{nombre:"Privacy Policy", link:"/privacy"}, {nombre:"Terms of Service", link:"/terms"}, {nombre:"System Status", link:"/statuspage"}];
  // Redirigir si ya hay sesión activa
  useEffect(() => {
    if (usuario) {
      navigate("/noticias");
    }
  }, [usuario]);

  // Google SSO — sin cambios
  const iniciarSesion = useCallback(async () => {
    if (!firebase) return;
    try {
      setLoading(true);
      setError(null);
      await firebase.registrarGoogle();
    } catch (err) {
      console.error("Error login Google:", err);
      setError("No se pudo iniciar sesión con Google.");
    } finally {
      setLoading(false);
    }
  }, [firebase]);

  // Email/Password — intenta login; si el usuario no existe, lo registra primero
  const iniciarSesionEmail = useCallback(async () => {
    if (!firebase) return;
    setError(null);

    try {
      setLoading(true);
      // Intentar login directo
      await firebase.login(email, password);
    } catch (loginErr: any) {
      // Códigos que indican que el usuario NO existe aún
      const userNotFound =
        loginErr?.code === "auth/user-not-found" ||
        loginErr?.code === "auth/invalid-credential" ||
        loginErr?.code === "auth/invalid-email"; // por si acaso

      if (userNotFound) {
        try {
          // Registrar con nombre generado automáticamente y luego hacer login
          await firebase.registrar(usernamePro(), email, password);
          await firebase.login(email, password);
        } catch (registerErr: any) {
          console.error("Error al registrar:", registerErr);
          setError("No se pudo crear la cuenta. Verifica tus datos.");
        }
      } else if (loginErr?.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else {
        console.error("Error login:", loginErr);
        setError("Ocurrió un error al iniciar sesión.");
      }
    } finally {
      setLoading(false);
    }
  }, [firebase, email, password]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor ingresa tu correo y contraseña.");
      return;
    }
    await iniciarSesionEmail();
  };

  return (
    <div className="relative min-h-screen bg-[#0d0d1a] text-[#e8e8f0] flex flex-col overflow-hidden font-sans">

      {/* Ambient glows */}
      <div className="pointer-events-none fixed top-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(100,80,220,0.13) 0%, transparent 70%)" }} />
      <div className="pointer-events-none fixed bottom-[10%] -right-[10%] w-[35vw] h-[35vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(80,60,200,0.10) 0%, transparent 70%)" }} />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-9 py-[18px]">
        <div onClick={() => navigate("/")} className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center"
            style={{ background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.3)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="#7c6dfa" opacity="0.9" />
            </svg>
          </div>
          <span className="text-[17px] font-bold tracking-tight text-[#e8e8f4]">Mistli</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/documentation")}  className="text-sm font-medium text-[#aaa] hover:text-white transition-colors">
            Documentation
          </button>
          <button onClick={() => navigate("/support")}
            className="text-sm font-semibold text-[#e8e8f4] px-5 py-2 rounded-lg transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}>
            Support
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-[440px] rounded-[20px] px-12 py-11"
          style={{
            background: "rgba(18,18,32,0.85)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,109,250,0.06)",
          }}
        >
          {/* Fingerprint icon */}
          <div
            className="w-[54px] h-[54px] rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.25)" }}
          >
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" stroke="#a89cf7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 32c0-12.15 9.85-22 22-22s22 9.85 22 22" />
              <path d="M16 32c0-8.84 7.16-16 16-16s16 7.16 16 16c0 4-.5 7.8-1.4 11.4" />
              <path d="M22 32c0-5.52 4.48-10 10-10s10 4.48 10 10c0 6-1.5 11.5-4 16" />
              <path d="M32 22c0 0 0 20 0 26" />
              <path d="M10 32c0 12 7 20 14 24" />
              <path d="M22 50c-4-4-6-10-6-18" />
            </svg>
          </div>

          <h1 className="text-[26px] font-bold text-center text-[#f0f0f8] tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-[#888] text-center mb-8 leading-relaxed">
            Access the secure Mistli management portal.
          </p>

          {/* Error message */}
          {error && (
            <div
              className="mb-5 px-4 py-3 rounded-xl text-[13px] text-red-300"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-[18px]">
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
                className="w-full rounded-[10px] py-3 pl-[42px] pr-4 text-sm text-[#e0e0ee] outline-none transition-all placeholder:text-[#555]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7c6dfa")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <div onClick={() => setShowForgot(true)} className="flex justify-between items-center mb-2">
              <label className="text-[13px] font-medium text-[#bbb]">Password</label>
              <a href="#" className="text-[13px] font-medium text-[#7c6dfa] hover:text-[#a89cf7] transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-[14px] flex items-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c6dfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[10px] py-3 pl-[42px] pr-10 text-sm text-[#e0e0ee] outline-none transition-all placeholder:text-[#555]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7c6dfa")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 flex items-center p-1 text-[#666] hover:text-[#aaa] transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none mb-6">
            <div
              onClick={() => setKeepSigned(!keepSigned)}
              className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center flex-shrink-0 cursor-pointer transition-all"
              style={{
                background: keepSigned ? "#7c6dfa" : "rgba(255,255,255,0.04)",
                border: keepSigned ? "1.5px solid #7c6dfa" : "1.5px solid rgba(255,255,255,0.2)",
              }}
            >
              {keepSigned && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[13px] text-[#aaa]">Keep me signed in for 30 days</span>
          </label>

          {/* Sign In button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-[14px] rounded-xl text-[15px] font-semibold text-white tracking-tight transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #7c6dfa 0%, #5a4de0 100%)",
              boxShadow: "0 4px 20px rgba(124,109,250,0.35)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Signing in...
              </span>
            ) : "Sign In to Portal"}
          </button>

          {/* Divider */}
          <div className="my-[22px] h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

          {/* SSO button — sin cambios */}
          <button
            type="button"
            onClick={() => iniciarSesion()}
            disabled={loading}
            className="w-full py-[13px] rounded-xl text-sm font-medium text-[#ccc] flex items-center justify-center gap-2.5 transition-all hover:bg-white/[0.06] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Single Sign-On
          </button>
        </div>

        {/* Encryption badge */}
        <div className="flex items-center gap-2 mt-5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[11px] font-medium tracking-widest text-[#555]">
            PROTECTED BY GOOGLE FIREBASE
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 flex items-center justify-between px-9 py-[18px]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span className="text-xs text-[#444]">© 2024 Mistli Technologies Inc. All rights reserved.</span>
        <div className="flex gap-5">
          {lastlinks.map((objeto) => (
            <button key={objeto.link} onClick={()=>navigate(objeto.link)} className="text-xs text-[#555] hover:text-[#888] transition-colors">
              {objeto.nombre}
            </button>
          ))}
        </div>
      </footer>
      {showForgot && (
  <ForgotPasswordModal
    onClose={() => setShowForgot(false)}
    defaultEmail={email} // pre-llena con lo que ya escribió
  />
)}
    </div>
  );
}