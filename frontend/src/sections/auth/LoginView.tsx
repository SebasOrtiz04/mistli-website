import {
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { FirebaseContext } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { usernamePro } from "../../helpers/uiAmounts";
import { useTranslation } from "react-i18next";

import ForgotPasswordModal from "../../components/ui/ForgotPasswordModal";
import Icon from "../../components/iconify/Icon";

export default function LoginView() {
  const { t } = useTranslation();

  const [showForgot, setShowForgot] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [keepSigned, setKeepSigned] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(FirebaseContext);

  const {
    usuario,
    firebase,
  } =
    context || {
      usuario: null as User | null,
      firebase: null,
    };

  const navigate = useNavigate();

  const lastlinks = [
    {
      nombre: t("login.footer.privacy"),
      link: "/privacy",
    },
    {
      nombre: t("login.footer.terms"),
      link: "/terms",
    },
    {
      nombre: t("login.footer.status"),
      link: "/statuspage",
    },
  ];

  // =====================================================
  // REDIRECT IF ALREADY LOGGED IN
  // =====================================================

  useEffect(() => {
    if (usuario) {
      navigate("/noticias");
    }
  }, [usuario, navigate]);

  // =====================================================
  // GOOGLE SSO
  // =====================================================

  const iniciarSesion = useCallback(async () => {
    if (!firebase) return;

    try {
      setLoading(true);
      setError(null);

      await firebase.registrarGoogle();
    } catch (err) {
      console.error("Error login Google:", err);
      setError(t("login.validation.googleError"));
    } finally {
      setLoading(false);
    }
  }, [firebase, t]);

  // =====================================================
  // EMAIL / PASSWORD
  // =====================================================

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
        loginErr?.code === "auth/invalid-email";

      if (userNotFound) {
        try {
          // Registrar con nombre generado automáticamente
          // y luego hacer login
          await firebase.registrar(
            usernamePro(),
            email,
            password,
          );

          await firebase.login(email, password);
        } catch (registerErr: any) {
          console.error(
            "Error al registrar:",
            registerErr,
          );

          setError(
            t("login.validation.registerError"),
          );
        }
      } else if (
        loginErr?.code === "auth/wrong-password"
      ) {
        setError(
          t("login.validation.wrongPassword"),
        );
      } else {
        console.error(
          "Error login:",
          loginErr,
        );

        setError(
          t("login.validation.generic"),
        );
      }
    } finally {
      setLoading(false);
    }
  }, [firebase, email, password, t]);

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (!email || !password) {
      setError(
        t("login.validation.required"),
      );

      return;
    }

    await iniciarSesionEmail();
  };

  // =====================================================
  // LOGIN VIEW
  // =====================================================

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-ink-950 text-ink-50">
      {/* =================================================
          AMBIENT BACKGROUND
      ================================================== */}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div
          className="
            absolute
            -left-[18vw]
            top-[12%]
            h-[45vw]
            w-[45vw]
            max-h-[700px]
            max-w-[700px]
            rounded-full
            bg-brand-500/[0.10]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            -right-[15vw]
            bottom-[0]
            h-[40vw]
            w-[40vw]
            max-h-[650px]
            max-w-[650px]
            rounded-full
            bg-cyan-500/[0.07]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            left-[45%]
            top-[30%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-magenta-500/[0.035]
            blur-[120px]
          "
        />

        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/10 to-ink-950/60" />
      </div>

      {/* =================================================
          NAVBAR
      ================================================== */}

      <nav className="relative z-20 flex items-center justify-between border-b border-white/[0.05] px-5 py-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            group
            flex
            cursor-pointer
            items-center
            gap-2.5
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-brand-400/20
              bg-brand-500/10
              transition-all
              group-hover:border-brand-400/40
              group-hover:bg-brand-500/15
            "
          >
            <div className="grid grid-cols-2 gap-[3px]">
              <span className="h-[6px] w-[6px] rounded-[1px] bg-brand-400" />
              <span className="h-[6px] w-[6px] rounded-[1px] bg-cyan-400" />
              <span className="h-[6px] w-[6px] rounded-[1px] bg-cyan-400" />
              <span className="h-[6px] w-[6px] rounded-[1px] bg-brand-400" />
            </div>
          </div>

          <span
            className="
              text-[17px]
              font-semibold
              tracking-[-0.02em]
              text-ink-100
            "
          >
            Mistli
          </span>
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/documentation")}
            className="
              hidden
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-ink-400
              transition-colors
              hover:bg-white/[0.04]
              hover:text-ink-100
              sm:block
            "
          >
            {t("login.navigation.documentation")}
          </button>

          <button
            type="button"
            onClick={() => navigate("/support")}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              px-3.5
              py-2
              text-sm
              font-medium
              text-ink-200
              transition-all
              hover:border-brand-400/20
              hover:bg-brand-500/[0.06]
              hover:text-white
              sm:px-4
            "
          >
            <Icon
              icon="mdi:help-circle-outline"
              width={17}
            />

            <span>
              {t("login.navigation.support")}
            </span>
          </button>
        </div>
      </nav>

      {/* =================================================
          MAIN
      ================================================== */}

      <main
        className="
          relative
          z-10
          flex
          flex-1
          items-center
          justify-center
          px-4
          py-10
          sm:px-6
          sm:py-14
        "
      >
        <div className="w-full max-w-[430px]">
          {/* =================================================
              LOGIN CARD
          ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/[0.08]
              bg-surface-900/80
              p-6
              shadow-2xl
              shadow-black/40
              backdrop-blur-2xl
              sm:p-9
            "
          >
            {/* Card glow */}
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-72
                w-72
                rounded-full
                bg-brand-500/[0.08]
                blur-[90px]
              "
            />

            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                -bottom-40
                -left-32
                h-72
                w-72
                rounded-full
                bg-cyan-500/[0.05]
                blur-[100px]
              "
            />

            <div className="relative">
              {/* =================================================
                  HEADER
              ================================================== */}

              <div className="mb-8 text-center">
                <div
                  className="
                    mx-auto
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-brand-400/20
                    bg-brand-500/10
                    shadow-lg
                    shadow-brand-500/10
                  "
                >
                  <Icon
                    icon="mdi:fingerprint"
                    width={29}
                    className="text-brand-300"
                  />
                </div>

                <h1
                  className="
                    text-[26px]
                    font-semibold
                    tracking-[-0.035em]
                    text-ink-50
                  "
                >
                  {t("login.hero.title")}
                </h1>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-[310px]
                    text-sm
                    leading-6
                    text-ink-500
                  "
                >
                  {t("login.hero.description")}
                </p>
              </div>

              {/* =================================================
                  ERROR
              ================================================== */}

              {error && (
                <div
                  className="
                    mb-5
                    flex
                    items-start
                    gap-2.5
                    rounded-xl
                    border
                    border-danger/20
                    bg-danger/[0.06]
                    px-4
                    py-3
                    text-[13px]
                    leading-5
                    text-danger
                  "
                >
                  <Icon
                    icon="mdi:alert-circle-outline"
                    width={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{error}</span>
                </div>
              )}

              {/* =================================================
                  EMAIL
              ================================================== */}

              <div className="mb-5">
                <label
                  htmlFor="login-email"
                  className="
                    mb-2
                    block
                    text-xs
                    font-medium
                    text-ink-300
                  "
                >
                  {t("login.form.email.label")}
                </label>

                <div className="relative">
                  <Icon
                    icon="mdi:email-outline"
                    width={18}
                    className="
                      pointer-events-none
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-brand-400
                    "
                  />

                  <input
                    id="login-email"
                    type="email"
                    placeholder={t(
                      "login.form.email.placeholder",
                    )}
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="
                      m-input
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.035]
                      py-3
                      pl-11
                      pr-4
                      text-sm
                      text-ink-100
                      outline-none
                      placeholder:text-ink-600
                      transition-all
                      focus:border-brand-400/50
                      focus:bg-white/[0.05]
                      focus:ring-2
                      focus:ring-brand-500/10
                    "
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* =================================================
                  PASSWORD
              ================================================== */}

              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="
                      text-xs
                      font-medium
                      text-ink-300
                    "
                  >
                    {t("login.form.password.label")}
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setShowForgot(true)
                    }
                    className="
                      cursor-pointer
                      text-xs
                      font-medium
                      text-brand-400
                      transition-colors
                      hover:text-brand-300
                    "
                  >
                    {t("login.form.password.forgot")}
                  </button>
                </div>

                <div className="relative">
                  <Icon
                    icon="mdi:lock-outline"
                    width={18}
                    className="
                      pointer-events-none
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-brand-400
                    "
                  />

                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder={t(
                      "login.form.password.placeholder",
                    )}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        void handleSubmit(
                          e as unknown as React.MouseEvent<HTMLButtonElement>,
                        );
                      }
                    }}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.035]
                      py-3
                      pl-11
                      pr-11
                      text-sm
                      text-ink-100
                      outline-none
                      placeholder:text-ink-600
                      transition-all
                      focus:border-brand-400/50
                      focus:bg-white/[0.05]
                      focus:ring-2
                      focus:ring-brand-500/10
                    "
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword,
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      rounded-lg
                      p-1.5
                      text-ink-600
                      transition-colors
                      hover:bg-white/[0.05]
                      hover:text-ink-300
                    "
                    aria-label={
                      showPassword
                        ? t(
                            "login.form.password.hide",
                          )
                        : t(
                            "login.form.password.show",
                          )
                    }
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "mdi:eye-off-outline"
                          : "mdi:eye-outline"
                      }
                      width={18}
                    />
                  </button>
                </div>
              </div>

              {/* =================================================
                  KEEP SIGNED IN
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  setKeepSigned(!keepSigned)
                }
                className="
                  mb-6
                  flex
                  cursor-pointer
                  items-center
                  gap-2.5
                  text-left
                "
              >
                <span
                  className={`
                    flex
                    h-[18px]
                    w-[18px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[5px]
                    border
                    transition-all
                    ${
                      keepSigned
                        ? "border-brand-400 bg-brand-500"
                        : "border-white/20 bg-white/[0.03]"
                    }
                  `}
                >
                  {keepSigned && (
                    <Icon
                      icon="mdi:check"
                      width={13}
                      className="text-white"
                    />
                  )}
                </span>

                <span
                  className="
                    text-xs
                    text-ink-400
                  "
                >
                  {t("login.form.keepSigned")}
                </span>
              </button>

              {/* =================================================
                  SIGN IN
              ================================================== */}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-brand-400/20
                  bg-brand-500
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-brand-500/20
                  transition-all
                  hover:bg-brand-400
                  hover:shadow-brand-500/30
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? (
                  <>
                    <Icon
                      icon="mdi:loading"
                      width={18}
                      className="animate-spin"
                    />

                    {t(
                      "login.form.submit.loading",
                    )}
                  </>
                ) : (
                  <>
                    {t(
                      "login.form.submit.default",
                    )}

                    <Icon
                      icon="mdi:arrow-right"
                      width={18}
                    />
                  </>
                )}
              </button>

              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.07]" />

                <span
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-ink-600
                  "
                >
                  {t("login.form.divider")}
                </span>

                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>

              {/* =================================================
                  GOOGLE SSO
              ================================================== */}

              <button
                type="button"
                onClick={() => iniciarSesion()}
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-white/[0.09]
                  bg-white/[0.025]
                  py-3
                  text-sm
                  font-medium
                  text-ink-300
                  transition-all
                  hover:border-white/[0.14]
                  hover:bg-white/[0.05]
                  hover:text-white
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {/* Google */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />

                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />

                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />

                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>

                {t("login.form.google")}
              </button>

              {/* =================================================
                  SECURITY
              ================================================== */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-center
                "
              >
                <Icon
                  icon="mdi:shield-lock-outline"
                  width={14}
                  className="text-ink-600"
                />

                <span
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-ink-600
                  "
                >
                  {t(
                    "login.security.protectedBy",
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Small footer message */}
          <p
            className="
              mt-5
              text-center
              text-[11px]
              leading-5
              text-ink-700
            "
          >
            {t("login.security.workspace")}
          </p>
        </div>
      </main>

      {/* =================================================
          FOOTER
      ================================================== */}

      <footer
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-between
          gap-3
          border-t
          border-white/[0.05]
          px-5
          py-4
          sm:flex-row
          sm:px-8
          lg:px-10
        "
      >
        <span className="text-[11px] text-ink-700">
          {t("login.footer.copyright")}
        </span>

        <div className="flex gap-4 sm:gap-5">
          {lastlinks.map((objeto) => (
            <button
              key={objeto.link}
              type="button"
              onClick={() =>
                navigate(objeto.link)
              }
              className="
                text-[11px]
                text-ink-700
                transition-colors
                hover:text-ink-400
              "
            >
              {objeto.nombre}
            </button>
          ))}
        </div>
      </footer>

      {/* =================================================
          FORGOT PASSWORD
      ================================================== */}

      {showForgot && (
        <ForgotPasswordModal
          onClose={() => setShowForgot(false)}
          defaultEmail={email}
        />
      )}
    </div>
  );
}
