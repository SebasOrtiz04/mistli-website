import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";
import Logo from "../../../components/logo/Logo";

/* Cámbialo por un correo @mistli.com.mx cuando lo tengas. */
const CONTACT_EMAIL = "fernandosanchezor@gmail.com";

/* `accent` coincide con los data-accent de index.css */


const linkClass =
  "inline-flex items-center gap-2 py-1 text-sm text-[#AEB3C2] transition-colors hover:text-white";

const headingClass =
  "mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#F4F5F8]";

export default function Footer() {
  const { t } = useTranslation();
  const services = t("footer.footer.services", { returnObjects: true }) as { label: string; path: string; accent: string }[];
  const resources = t("footer.footer.resources", { returnObjects: true }) as { label: string; path: string }[];
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#06080D] text-[#AEB3C2]">
      {/* Línea de degradado de marca en el borde superior */}
      <div
        aria-hidden
        className="m-gradient-border absolute inset-x-0 top-0 h-px opacity-40"
      />

      {/* Glow ambiental */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: "var(--mistli-primary)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* ---------- Top ---------- */}

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_0.8fr_1.2fr] lg:gap-10">
          {/* Marca */}

          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Logo showText={true} className="h-8 w-8" />

            <p className="max-w-sm text-sm leading-relaxed text-[#858B9D]">
              {t("footer.footer.slogan")}
            </p>
          </div>

          {/* Servicios */}

          <nav aria-label="Servicios">
            <h2 className={headingClass}>{t("footer.footer.titles.services")}</h2>

            <ul>
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    data-accent={service.accent}
                    className={`${linkClass} group hover:text-[color:var(--accent)]`}
                  >
                    <span className="h-1 w-1 rounded-full bg-[color:var(--accent)] opacity-60 transition-opacity group-hover:opacity-100" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recursos */}

          <nav aria-label="Recursos">
            <h2 className={headingClass}>{t("footer.footer.titles.resources")}</h2>

            <ul>
              {resources.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}

          <div>
            <h2 className={headingClass}>{t("footer.footer.titles.contact")}</h2>

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-center gap-3 text-[#AEB3C2] transition-colors hover:text-white"
                >
                  <span className="m-icon-tile flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    <Icon icon="mdi:email-outline" width={16} height={16} />
                  </span>

                  <span className="break-all">{CONTACT_EMAIL}</span>
                </a>
              </li>

              <li className="flex items-center gap-3 text-[#AEB3C2]">
                <span className="m-icon-tile flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                  <Icon icon="mdi:map-marker-outline" width={16} height={16} />
                </span>

                México / Remoto
              </li>
            </ul>

            <Link
              to="/contacto"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
            >
              <span className="m-gradient-text">{t("footer.footer.cuentanos")}</span>

              <Icon
                icon="mdi:arrow-right"
                width={16}
                height={16}
                className="text-[#7992FC] transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ---------- Bottom ---------- */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-[#858B9D] md:flex-row">
          <p className="text-center md:text-left">{t("footer.footer.ley")}</p>

          <div className="flex gap-6">
            <Link to="/terms" className="transition-colors hover:text-white">
              {t("footer.footer.terms")}
            </Link>

            <Link to="/privacy" className="transition-colors hover:text-white">
              {t("footer.footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}