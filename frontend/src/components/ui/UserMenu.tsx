import {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

import Icon from "../iconify/Icon";
import { FirebaseContext } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import type {
  RootState,
  AppDispatch,
} from "../../redux/store";

import { toggleLanguage } from "../../redux";

interface UserMenuProps {
  role?: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function UserMenu({
  role,
  open,
  onToggle,
  onClose,
}: UserMenuProps) {
  const context = useContext(FirebaseContext);

  const [loading, setLoading] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  // =====================================================
  // IDIOMA
  // =====================================================

  const idioma = useSelector(
    (state: RootState) => state.locale.language,
  );

  const bandera =
    idioma === "ES"
      ? "circle-flags:mx"
      : "circle-flags:us-um";

  // =====================================================
  // CLICK OUTSIDE
  // =====================================================

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener(
      "pointerdown",
      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        "pointerdown",
        handleClickOutside,
      );
  }, [open, onClose]);

  const usuario = context?.usuario;
  const firebase = context?.firebase;

  // =====================================================
  // LOGOUT
  // =====================================================

  const cerrarSesion = useCallback(async () => {
    if (!firebase) return;

    try {
      setLoading(true);

      onClose();

      await firebase.cerrarSesion();
    } catch (err) {
      console.error("Error logout:", err);
    } finally {
      setLoading(false);
    }
  }, [firebase, onClose]);

  if (!context) return null;

  // =====================================================
  // SELECTOR DE IDIOMA
  // =====================================================

  const selectorIdioma = (
    <button
      type="button"
      onClick={() => dispatch(toggleLanguage())}
      className="
        flex shrink-0 items-center gap-1.5
        rounded-full border border-white/[0.08]
        bg-white/[0.03]
        px-2.5 py-1.5
        text-xs font-medium text-ink-300
        transition-all
        hover:border-white/[0.16]
        hover:bg-white/[0.06]
        hover:text-white
        active:scale-95
        cursor-pointer
      "
      aria-label={`Cambiar idioma. Idioma actual: ${idioma}`}
    >
      <Icon
        icon={bandera}
        width={18}
        height={18}
      />

      <span>{idioma}</span>
    </button>
  );

  // =====================================================
  // USUARIO NO AUTENTICADO
  // =====================================================

  if (!usuario) {
    return (
      <div className="flex items-center gap-2">
        {selectorIdioma}

        <button
          disabled={loading}
          onClick={() => navigate("/auth/login")}
          className="
            flex shrink-0 items-center gap-2
            whitespace-nowrap
            rounded-full
            bg-brand-500
            px-3 py-2
            text-sm font-medium
            text-white
            transition-all
            hover:bg-brand-600
            active:scale-95
            disabled:opacity-50
            cursor-pointer
            sm:px-4
          "
        >
          {loading ? (
            <span
              className="
                h-4 w-4
                rounded-full
                border-2
                border-white
                border-t-transparent
                animate-spin
              "
            />
          ) : (
            <Icon
              icon="mdi:login"
              className="text-base"
            />
          )}

          {loading
            ? "Entrando..."
            : "Iniciar sesión"}
        </button>
      </div>
    );
  }

  // =====================================================
  // USUARIO AUTENTICADO
  // =====================================================

  return (
    <div className="flex items-center gap-2">
      {/* Idioma siempre visible */}
      {selectorIdioma}

      {/* Menú del usuario */}
      <div
        className="relative"
        ref={menuRef}
      >
        {/* =================================================
            AVATAR
        ================================================== */}

        <button
          type="button"
          onClick={onToggle}
          disabled={loading}
          className="
            h-10 w-10
            overflow-hidden
            rounded-full
            bg-[#171923]
            ring-2
            ring-transparent
            transition-all
            hover:ring-brand-400
            active:scale-95
            disabled:opacity-50
            cursor-pointer
            focus:outline-none
          "
          aria-label="Menú de usuario"
          aria-expanded={open}
        >
          {usuario.photoURL ? (
            <img
              src={usuario.photoURL}
              alt={
                usuario.displayName ??
                "Perfil"
              }
              referrerPolicy="no-referrer"
              className="
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            <span
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
              "
            >
              <Icon
                icon="mdi:user"
                className="
                  text-xl
                  text-[#888]
                "
              />
            </span>
          )}
        </button>

        {/* =================================================
            DROPDOWN
        ================================================== */}

        {open && (
          <div
            className="
              fixed
              right-4
              top-[80px]
              z-[60]
              w-64
              max-w-[calc(100vw-2rem)]
              rounded-2xl
              border
              border-white/10
              bg-[#11131C]/95
              py-2
              shadow-2xl
              shadow-black/40
              backdrop-blur-xl
              md:absolute
              md:right-0
              md:top-full
              md:mt-3
            "
          >
            {/* =================================================
                INFORMACIÓN DEL USUARIO
            ================================================== */}

            <div
              className="
                border-b
                border-white/[0.06]
                px-4
                py-3
              "
            >
              <p
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {usuario.displayName ??
                  "Usuario"}
              </p>

              <p
                className="
                  truncate
                  text-xs
                  text-[#777]
                "
              >
                {usuario.email}
              </p>
            </div>

            {/* =================================================
                NOTICIAS
            ================================================== */}

            <button
              type="button"
              onClick={() => {
                onClose();
                navigate("/noticias");
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-sm
                text-[#ccc]
                transition-colors
                hover:bg-white/[0.06]
                cursor-pointer
              "
            >
              <Icon
                icon="mdi:newspaper-variant-outline"
                width={19}
                height={19}
              />

              <span>
                Noticias
              </span>
            </button>

            {/* =================================================
                CREAR NOTICIA — SOLO ADMIN
            ================================================== */}

            {role === "admin" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/createnews");
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-brand-300
                  transition-colors
                  hover:bg-brand-500/10
                  cursor-pointer
                "
              >
                <Icon
                  icon="mdi:plus-circle-outline"
                  width={19}
                  height={19}
                />

                <span>
                  Crear noticia
                </span>
              </button>
            )}

            {/* =================================================
                SEPARADOR
            ================================================== */}

            <div
              className="
                my-1
                h-px
                bg-white/[0.06]
              "
            />

            {/* =================================================
                CERRAR SESIÓN
            ================================================== */}

            <button
              type="button"
              onClick={cerrarSesion}
              disabled={loading}
              className="
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-sm
                text-red-400
                transition-colors
                hover:bg-red-500/10
                disabled:opacity-50
                cursor-pointer
              "
            >
              {loading ? (
                <span
                  className="
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-red-400
                    border-t-transparent
                    animate-spin
                  "
                />
              ) : (
                <Icon
                  icon="mdi:logout"
                  width={19}
                  height={19}
                />
              )}

              <span>
                {loading
                  ? "Saliendo..."
                  : "Cerrar sesión"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}