import { Link } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";

const solutions = [
  ["mdi:file-document-multiple-outline", "Extracción de información", "Extraemos datos de documentos para evitar captura manual y convertir archivos en información utilizable."],
  ["mdi:text-box-search-outline", "Clasificación", "Clasificamos documentos y contenido automáticamente según las reglas o categorías de tu operación."],
  ["mdi:file-check-outline", "Validación", "Detectamos información faltante, inconsistencias y condiciones que requieren revisión."],
  ["mdi:database-arrow-right-outline", "Documentos → sistemas", "Llevamos la información procesada hacia bases de datos, APIs, ERPs u otras herramientas."],
];

export default function Documentos() {
  return (
    <main className="relative overflow-hidden bg-[#080A10] text-[#F4F5F8]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
        <div className="absolute -top-40 left-[10%] h-[520px] w-[520px] rounded-full opacity-[0.17] blur-[130px]" style={{ background: "var(--mistli-cyan)" }} />
        <div className="absolute -top-20 right-[8%] h-[560px] w-[560px] rounded-full opacity-[0.15] blur-[140px]" style={{ background: "var(--mistli-magenta)" }} />
        <div className="m-grid-bg absolute inset-0" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#60E0FA]/25 bg-[#60E0FA]/10 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-[#C7F5FC]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#60E0FA]" />
            Procesamiento de documentos
          </span>

          <h1 className="max-w-4xl text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Convierte documentos
            <span className="m-gradient-text block pb-2">en información útil.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
            Automatizamos la lectura, extracción, clasificación y validación de documentos para que tu equipo deje de
            capturar información manualmente.
          </p>

          <div className="mt-10">
            <Link to="/contacto" className="m-btn m-btn-primary">Automatizar documentos <Icon icon="mdi:arrow-right" width={19} height={19} /></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#60E0FA]">Document AI</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Del archivo al dato.</h2>
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

      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FB5FEF]">Flujo</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Un documento puede activar todo un proceso.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#AEB3C2]">
              La información extraída no tiene por qué quedarse en una pantalla. Podemos validarla, almacenarla,
              enviarla a otro sistema y utilizarla para activar automatizaciones.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#0D0F17] p-5">
            {[
              ["mdi:file-upload-outline", "Documento recibido"],
              ["mdi:text-search", "Información detectada"],
              ["mdi:shield-check-outline", "Datos validados"],
              ["mdi:database-arrow-right-outline", "Información registrada"],
              ["mdi:lightning-bolt-outline", "Proceso activado"],
            ].map(([icon, title], index) => (
              <div key={title} className="flex items-center gap-4 border-b border-white/[0.06] py-4 last:border-0">
                <div className="m-icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <Icon icon={icon} width={20} height={20} />
                </div>
                <span className="text-sm">{title}</span>
                <span className="ml-auto font-mono text-[10px] text-[#5F6473]">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="m-gradient-border rounded-3xl p-px">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0B0D14] px-6 py-16 text-center sm:px-12">
              <h2 className="text-4xl font-semibold sm:text-5xl">¿Tu equipo captura datos de documentos?</h2>
              <p className="mx-auto mt-6 max-w-xl text-[#AEB3C2]">Podemos convertir ese trabajo manual en un proceso digital.</p>
              <Link to="/contacto" className="m-btn m-btn-primary mt-9">Hablar con Mistli <Icon icon="mdi:arrow-right" width={19} height={19} /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
