import { Link } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";

const solutions = [
  ["mdi:robot-outline", "Agentes de IA", "Automatiza tareas que requieren consultar información, tomar decisiones y utilizar herramientas."],
  ["mdi:sync", "Integración de sistemas", "Conecta CRM, ERP, APIs, bases de datos y herramientas que actualmente trabajan por separado."],
  ["mdi:email-fast-outline", "Flujos automáticos", "Elimina tareas repetitivas como notificaciones, reportes, registros y procesamiento de información."],
  ["mdi:chart-timeline-variant", "Procesos inteligentes", "Combina reglas, APIs, IA y datos para crear flujos que se ejecutan con mínima intervención humana."],
];

export default function Automatizacion() {
  return (
    <main className="relative overflow-hidden bg-[#080A10] text-[#F4F5F8]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
        <div className="absolute -top-40 left-[10%] h-[520px] w-[520px] rounded-full opacity-[0.17] blur-[130px]" style={{ background: "var(--mistli-magenta)" }} />
        <div className="absolute -top-20 right-[5%] h-[560px] w-[560px] rounded-full opacity-[0.15] blur-[140px]" style={{ background: "var(--mistli-cyan)" }} />
        <div className="m-grid-bg absolute inset-0" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#FB5FEF]/25 bg-[#FB5FEF]/10 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-[#F9C8F5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FB5FEF]" />
            Automatización
          </span>

          <h1 className="max-w-4xl text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Menos tareas repetitivas.
            <span className="m-gradient-text block pb-2">Más tiempo para crecer.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
            Diseñamos automatizaciones que conectan tus sistemas y convierten procesos manuales en flujos digitales,
            medibles y repetibles.
          </p>

          <div className="mt-10">
            <Link to="/contacto" className="m-btn m-btn-primary">Automatizar un proceso <Icon icon="mdi:arrow-right" width={19} height={19} /></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#FB5FEF]">Soluciones</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Automatización alrededor de tu operación.</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map(([icon, title, text]) => (
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
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">Cómo funciona</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Primero entendemos el proceso. Después lo automatizamos.</h2>
          </div>
          <ol className="space-y-3">
            {[
              ["01", "Mapeamos", "Identificamos dónde se pierde tiempo, información o dinero."],
              ["02", "Conectamos", "Integramos las herramientas y fuentes de datos involucradas."],
              ["03", "Automatizamos", "Construimos el flujo y las reglas que ejecutarán el trabajo."],
              ["04", "Medimos", "Dejamos trazabilidad para saber qué está ocurriendo y mejorar."],
            ].map(([number, title, text]) => (
              <li key={number} className="flex gap-5 rounded-2xl border border-white/[0.07] bg-[#0C0E15] p-5">
                <span className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs">{number}</span>
                <div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#AEB3C2]">{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="m-gradient-border rounded-3xl p-px">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0B0D14] px-6 py-16 text-center sm:px-12">
              <h2 className="text-4xl font-semibold sm:text-5xl">¿Qué proceso te quita más tiempo?</h2>
              <p className="mx-auto mt-6 max-w-xl text-[#AEB3C2]">Cuéntanos cómo trabajas hoy y encontramos qué partes pueden convertirse en un flujo automático.</p>
              <Link to="/contacto" className="m-btn m-btn-primary mt-9">Hablar con Mistli <Icon icon="mdi:arrow-right" width={19} height={19} /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
