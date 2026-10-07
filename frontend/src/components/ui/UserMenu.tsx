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

  /*
   * =====================================================
   * IDIOMA
   * =====================================================
   */

  const idioma = useSelector(
    (state: RootState) =>
      state.locale.language
  );

  const bandera =
    idioma === "ES"
      ? "circle-flags:mx"
      : "circle-flags:us-um";


  /*
   * =====================================================
   * CLICK OUTSIDE
   * =====================================================
   *
   * Solo se escucha cuando ESTE menú está abierto. Antes se
   * registraba siempre, así que cualquier toque dentro del menú
   * móvil del Navbar (que está "fuera" de este ref) llamaba a
   * onClose() y cerraba el menú de navegación antes de que el
   * click llegara al botón "Servicios".
   */

  useEffect(() => {

    if (!open) return;

    const handleClickOutside = (
      e: PointerEvent
    ) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {
        onClose();
      }

    };

    document.addEventListener(
      "pointerdown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "pointerdown",
        handleClickOutside
      );

  }, [open, onClose]);


  const usuario = context?.usuario;
  const firebase = context?.firebase;


  /*
   * =====================================================
   * LOGOUT
   * =====================================================
   */

  const cerrarSesion = useCallback(
    async () => {

      if (!firebase) return;

      try {

        setLoading(true);

        onClose();

        await firebase.cerrarSesion();

      } catch (err) {

        console.error(
          "Error logout:",
          err
        );

      } finally {

        setLoading(false);

      }

    },
    [firebase, onClose]
  );


  if (!context) return null;


  /*
   * =====================================================
   * USUARIO NO AUTENTICADO
   * =====================================================
   */

  if (!usuario) {

    return (
      <button
        disabled={loading}
        onClick={() =>
          navigate("/auth/login")
        }
        className="
          flex
          shrink-0
          items-center
          gap-2
          whitespace-nowrap
          px-3
          sm:px-4
          py-2
          rounded-full
          bg-brand-500
          text-white
          text-sm
          font-medium
          hover:bg-brand-600
          active:scale-95
          disabled:opacity-50
          transition-all
          cursor-pointer
        "
      >

        {loading ? (

          <span
            className="
              w-4
              h-4
              border-2
              border-white
              border-t-transparent
              rounded-full
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
    );
  }


  /*
   * =====================================================
   * USUARIO AUTENTICADO
   * =====================================================
   */

  return (

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
          w-10
          h-10
          rounded-full
          overflow-hidden
          ring-2
          ring-transparent
          hover:ring-brand-400
          active:scale-95
          disabled:opacity-50
          transition-all
          cursor-pointer
          focus:outline-none
          bg-[#171923]
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
              w-full
              h-full
              object-cover
            "
          />

        ) : (

          <span
            className="
              w-full
              h-full
              flex
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
            w-64
            max-w-[calc(100vw-2rem)]
            md:absolute
            md:right-0
            md:top-full
            md:mt-3
            rounded-2xl
            bg-[#11131C]/95
            backdrop-blur-xl
            border
            border-white/10
            shadow-2xl
            shadow-black/40
            py-2
            z-[60]
          "
        >

          {/* =================================================
              INFORMACIÓN DEL USUARIO
          ================================================== */}

          <div
            className="
              px-4
              py-3
              border-b
              border-white/[0.06]
            "
          >

            <p
              className="
                text-sm
                font-semibold
                text-white
                truncate
              "
            >
              {usuario.displayName ??
                "Usuario"}
            </p>

            <p
              className="
                text-xs
                text-[#777]
                truncate
              "
            >
              {usuario.email}
            </p>

          </div>


          {/* =================================================
              IDIOMA
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              dispatch(toggleLanguage())
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-[#ccc]
              hover:bg-white/[0.06]
              transition-colors
              cursor-pointer
            "
          >

            <Icon
              icon={bandera}
              width={20}
              height={20}
            />

            <span>
              Idioma
            </span>

            <span
              className="
                ml-auto
                text-xs
                text-[#666]
                font-medium
              "
            >
              {idioma}
            </span>

          </button>


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
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-[#ccc]
              hover:bg-white/[0.06]
              transition-colors
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
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-sm
                text-brand-300
                hover:bg-brand-500/10
                transition-colors
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
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-red-400
              hover:bg-red-500/10
              disabled:opacity-50
              transition-colors
              cursor-pointer
            "
          >

            {loading ? (

              <span
                className="
                  w-4
                  h-4
                  border-2
                  border-red-400
                  border-t-transparent
                  rounded-full
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
  );
}