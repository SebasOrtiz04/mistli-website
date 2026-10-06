import { Link } from "react-router-dom";
import Icon from "../../../components/iconify/Icon";

const services = [
  ["mdi:server-outline", "Rescate de proyectos", "¿Tu programador desapareció y tienes el código pero nadie sabe cómo levantarlo? Revisamos, entendemos y ponemos en marcha tu backend."],
  ["mdi:api", "APIs y servicios", "Diseñamos APIs robustas para conectar aplicaciones, sistemas, bases de datos y servicios externos."],
  ["mdi:database-outline", "Bases de datos", "Diseñamos y optimizamos estructuras de datos para que tu aplicación sea mantenible y escalable."],
  ["mdi:shield-lock-outline", "Autenticación y seguridad", "Implementamos autenticación, permisos, validaciones y buenas prácticas para proteger tus servicios."],
];

const stack = ["Python", "FastAPI", "Django", "Flask", "PostgreSQL", "MongoDB", "Firebase", "Docker", "AWS", "Azure", "GCP"];

export default function Backend() {
  return (
    <main className="relative overflow-hidden bg-[#080A10] text-[#F4F5F8]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[850px] overflow-hidden">
        <div className="absolute -top-40 left-[5%] h-[520px] w-[520px] rounded-full opacity-[0.17] blur-[130px]" style={{ background: "var(--mistli-primary)" }} />
        <div className="absolute -top-10 right-[8%] h-[500px] w-[500px] rounded-full opacity-[0.15] blur-[130px]" style={{ background: "var(--mistli-cyan)" }} />
        <div className="m-grid-bg absolute inset-0" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#7992FC]/25 bg-[#7992FC]/10 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-[#C7D0FE]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7992FC]" />
            Backend & APIs
          </span>

          <h1 className="max-w-4xl text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            El backend que mantiene
            <span className="m-gradient-text block pb-2">tu idea funcionando.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#AEB3C2] sm:text-lg">
            Construimos, corregimos y recuperamos backends para aplicaciones que necesitan APIs, bases de datos,
            autenticación, integraciones y lógica de negocio confiable.
          </p>

          <div className="mt-10">
            <Link to="/contacto" className="m-btn m-btn-primary">Cuéntanos tu problema <Icon icon="mdi:arrow-right" width={19} height={19} /></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#FB5FEF]">Backend</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">De una API detenida a un sistema funcionando.</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map(([icon, title, text]) => (
              <article key={title} className="m-card rounded-2xl p-7">
                <div className="m-icon-tile mb-7 flex h-11 w-11 items-center justify-center rounded-xl">
                  <Icon icon={icon} width={22} height={22} />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#AEB3C2]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#858B9D]">Stack</p>
          <div className="mt-5 flex max-w-4xl flex-wrap gap-2">
            {stack.map((item) => (
              <span key={item} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-[#C4C9D6]">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="m-gradient-border rounded-3xl p-px">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0B0D14] px-6 py-16 text-center sm:px-12">
              <h2 className="text-4xl font-semibold sm:text-5xl">¿Tu proyecto está detenido?</h2>
              <p className="mx-auto mt-6 max-w-xl text-[#AEB3C2]">Si tienes el código pero nadie sabe cómo continuar, podemos empezar por entender qué tienes.</p>
              <Link to="/contacto" className="m-btn m-btn-primary mt-9">Revisar mi proyecto <Icon icon="mdi:arrow-right" width={19} height={19} /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
