import { useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../iconify/Icon";

interface NavbarProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const services = [
  {
    label: "Inteligencia Artificial",
    description: "Agentes, RAG y soluciones con IA",
    path: "/ia",
    icon: "mdi:brain",
  },
  {
    label: "Desarrollo Web",
    description: "Sitios y plataformas web",
    path: "/web",
    icon: "mdi:web",
  },
  {
    label: "Backend & APIs",
    description: "APIs, sistemas e integraciones",
    path: "/backend",
    icon: "mdi:server-outline",
  },
  {
    label: "Automatización",
    description: "Procesos y flujos inteligentes",
    path: "/automatizacion",
    icon: "mdi:lightning-bolt",
  },
  {
    label: "Documentos",
    description: "Procesamiento inteligente",
    path: "/documentos",
    icon: "mdi:file-document-outline",
  },
  {
    label: "Aplicaciones",
    description: "Web, mobile y software a medida",
    path: "/aplicaciones",
    icon: "mdi:application-brackets-outline",
  },
];

/* Estilo compartido de los links de escritorio */
const desktopLink = (active: boolean) =>
  `text-sm font-medium transition-colors cursor-pointer ${
    active ? "text-white" : "text-[#aaa] hover:text-white"
  }`;

export default function Navbar({ open, onToggle, onClose }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navbarRef = useRef<HTMLElement>(null);

  const [servicesOpen, setServicesOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Cerrar servicios cuando se cierra el menú móvil
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  /*
  |--------------------------------------------------------------------------
  | Cerrar todo al cambiar de página (incluye botón "atrás" del navegador)
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setServicesOpen(false);
    onClose();
  }, [location.pathname, onClose]);

  /*
  |--------------------------------------------------------------------------
  | Click / tap fuera del navbar
  |--------------------------------------------------------------------------
  |
  | - El ref está en TODO el <nav> (desktop + botón + panel móvil).
  | - Se usa "pointerdown" (y no "mousedown") porque en iOS Safari los taps
  |   sobre elementos no interactivos no siempre disparan mousedown.
  | - Solo cierra el menú móvil si está abierto, para no interferir con
  |   el menú de usuario.
  |
  */

  useEffect(() => {
    const handleOutside = (event: PointerEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
        if (open) onClose();
      }
    };

    document.addEventListener("pointerdown", handleOutside);

    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open, onClose]);

  /*
  |--------------------------------------------------------------------------
  | Escape cierra todo
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  /*
  |--------------------------------------------------------------------------
  | Navegación
  |--------------------------------------------------------------------------
  */

  const goTo = (path: string) => {
    setServicesOpen(false);
    onClose();
    navigate(path);
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const serviceActive = services.some((service) => isActive(service.path));

  return (
    <nav ref={navbarRef} className="relative flex items-center">
      {/* =========================================================
          DESKTOP NAVBAR
      ========================================================== */}

      <div className="hidden md:flex items-center gap-7">
        {/* SERVICIOS */}

        <div className="relative">
          <button
            type="button"
            onClick={() => setServicesOpen((current) => !current)}
            aria-expanded={servicesOpen}
            aria-haspopup="true"
            className={`flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer ${
              serviceActive || servicesOpen
                ? "text-white"
                : "text-[#aaa] hover:text-white"
            }`}
          >
            <span>Servicios</span>

            <Icon
              icon={servicesOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width={18}
              height={18}
            />
          </button>

          {servicesOpen && (
            <div
              className="
                absolute
                top-full
                left-1/2
                -translate-x-1/2
                mt-4
                w-[410px]
                max-w-[calc(100vw-2rem)]
                rounded-2xl
                border
                border-white/10
                bg-[#11131C]/95
                backdrop-blur-xl
                shadow-2xl
                shadow-black/40
                p-2
                z-[100]
              "
            >
              <div className="px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#666]">
                  Servicios
                </p>

                <p className="mt-1 text-sm text-[#999]">
                  Soluciones de software para tu negocio.
                </p>
              </div>

              <div className="h-px bg-white/[0.06] mb-2" />

              <div className="grid grid-cols-2 gap-1">
                {services.map((service) => (
                  <button
                    key={service.path}
                    type="button"
                    onClick={() => goTo(service.path)}
                    className="group flex items-start gap-3 rounded-xl p-3 text-left hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.06]">
                      <Icon
                        icon={service.icon}
                        width={19}
                        height={19}
                        className="text-brand-400 group-hover:text-cyan-400 transition-colors"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">
                        {service.label}
                      </p>

                      <p className="mt-0.5 text-xs leading-relaxed text-[#666]">
                        {service.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DOCUMENTACIÓN */}

        <button
          type="button"
          onClick={() => goTo("/documentation")}
          className={desktopLink(isActive("/documentation"))}
        >
          Documentación
        </button>

        {/* SOPORTE */}

        <button
          type="button"
          onClick={() => goTo("/support")}
          className={desktopLink(isActive("/support"))}
        >
          Soporte
        </button>
      </div>

      {/* =========================================================
          MOBILE MENU BUTTON
      ========================================================== */}

      <div className="md:hidden">
        <button
          type="button"
          onClick={() => {
            setServicesOpen(false);
            onToggle();
          }}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer"
        >
          <Icon icon={open ? "mdi:close" : "mdi:menu"} width={23} height={23} />
        </button>
      </div>

      {/* =========================================================
          MOBILE NAVIGATION

          - max-h + overflow-y-auto: si la lista de servicios no cabe en
            pantallas pequeñas / landscape, el panel hace scroll interno.
          - Servicios va primero (igual que en desktop) para que al
            expandirse no quede fuera de la pantalla.
      ========================================================== */}

      {open && (
        <div
          className="
            md:hidden
            fixed
            top-[80px]
            left-4
            right-4
            max-h-[calc(100dvh-96px)]
            overflow-y-auto
            overscroll-contain
            rounded-2xl
            border
            border-white/10
            bg-[#11131C]
            shadow-2xl
            shadow-black/40
            p-3
            z-[100]
          "
        >
          {/* SERVICIOS (acordeón) */}

          <button
            type="button"
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm hover:bg-white/[0.06] transition-colors cursor-pointer ${
              serviceActive || servicesOpen ? "text-white" : "text-[#ccc]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                icon="mdi:apps"
                width={20}
                height={20}
                className="text-brand-400"
              />

              <span>Servicios</span>
            </div>

            <Icon
              icon={servicesOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width={20}
              height={20}
            />
          </button>

          {servicesOpen && (
            <div className="mt-1 mb-2 ml-3 border-l border-white/10 pl-2">
              {services.map((service) => (
                <button
                  key={service.path}
                  type="button"
                  onClick={() => goTo(service.path)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-white/[0.06] transition-colors cursor-pointer ${
                    isActive(service.path) ? "bg-white/[0.06]" : ""
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.06]">
                    <Icon
                      icon={service.icon}
                      width={18}
                      height={18}
                      className="text-brand-400 group-hover:text-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">
                      {service.label}
                    </p>

                    <p className="mt-0.5 text-xs leading-relaxed text-[#666]">
                      {service.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="my-2 h-px bg-white/[0.06]" />

          {/* DOCUMENTACIÓN */}

          <button
            type="button"
            onClick={() => goTo("/documentation")}
            className={`w-full flex items-center rounded-xl px-4 py-3 text-left text-sm hover:bg-white/[0.06] transition-colors cursor-pointer ${
              isActive("/documentation") ? "text-white" : "text-[#ccc]"
            }`}
          >
            Documentación
          </button>

          {/* SOPORTE */}

          <button
            type="button"
            onClick={() => goTo("/support")}
            className={`w-full flex items-center rounded-xl px-4 py-3 text-left text-sm hover:bg-white/[0.06] transition-colors cursor-pointer ${
              isActive("/support") ? "text-white" : "text-[#ccc]"
            }`}
          >
            Soporte
          </button>
        </div>
      )}
    </nav>
  );
}