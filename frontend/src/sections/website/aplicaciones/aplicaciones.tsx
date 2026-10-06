import { Link } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";

const types = [
  ["mdi:cellphone", "Aplicaciones móviles", "Apps para clientes, operadores o equipos internos con la funcionalidad que realmente necesitas."],
  ["mdi:view-dashboard-outline", "Plataformas internas", "Sistemas para administrar operaciones, usuarios, información y procesos desde un solo lugar."],
  ["mdi:map-marker-path", "Apps con geolocalización", "Soluciones que utilizan mapas, GPS, rutas, ubicaciones y datos en tiempo real."],
  ["mdi:cloud-outline", "Aplicaciones conectadas", "Aplicaciones integradas con APIs, servicios cloud, bases de datos y sistemas existentes."],
];

export default function Aplicaciones() {
  return (
    <main className="relative overflow-hidden bg-[#080A10] text-[#F4F5F8]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
        <div className="absolute -top-40 left-[8%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[130px]" style={{ background: "var(--mistli-cyan)" }} />
        <div className="absolute right-[-100px] top-20 h-[540px] w-[540px] rounded-full opacity-[0.15] blur-[130px]" style={{ background: "var(--mistli-primary)" }} />
        <div className="m-grid-bg absolute inset-0" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#7992FC]/25 bg-[#7992FC]/10 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-[#C7D0FE]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7992FC]" />
            Aplicaciones
          </span>

          <h1 className="max-w-4xl text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Software hecho
            <span className="m-gradient-text block pb-2">para la forma en que trabajas.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
            Creamos aplicaciones y plataformas a medida cuando una herramienta genérica ya no alcanza para resolver
            el problema de tu negocio.
          </p>

          <div className="mt-10">
            <Link to="/contacto" className="m-btn m-btn-primary">Diseñar mi aplicación <Icon icon="mdi:arrow-right" width={19} height={19} /></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">Aplicaciones a medida</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Tu proceso, convertido en software.</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {types.map(([icon, title, text]) => (
              <article key={title} className="m-card rounded-2xl p-6">
                <div className="m-icon-tile mb-7 flex h-11 w-11 items-center justify-center rounded-xl">
                  <Icon icon={icon} width={22} height={22} />
                </div>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#AEB3C2]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ["01", "Entendemos", "Definimos usuarios, procesos, reglas y objetivos antes de escribir código."],
              ["02", "Construimos", "Desarrollamos la aplicación por módulos para poder validar y evolucionar rápido."],
              ["03", "Conectamos", "Integramos APIs, datos, autenticación, IA y servicios externos cuando hacen falta."],
            ].map(([number, title, text]) => (
              <article key={number} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
                <span className="font-mono text-xs text-[#60E0FA]">{number}</span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#AEB3C2]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="m-gradient-border rounded-3xl p-px">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0B0D14] px-6 py-16 text-center sm:px-12">
              <h2 className="text-4xl font-semibold sm:text-5xl">¿Necesitas una herramienta que no existe?</h2>
              <p className="mx-auto mt-6 max-w-xl text-[#AEB3C2]">La podemos construir alrededor de tu operación.</p>
              <Link to="/contacto" className="m-btn m-btn-primary mt-9">Cuéntanos tu idea <Icon icon="mdi:arrow-right" width={19} height={19} /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
