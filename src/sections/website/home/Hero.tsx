import { useTranslation } from 'react-i18next';
import { baseWhats } from '../../../constants';
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const contacto = baseWhats + encodeURIComponent(t('home.msgwhats1'));

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-[#2f4aa0]">
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Columna izquierda - Texto */}
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight font-pathway">            {t('home.hero.title')}
          </h1>
          <p className="text-lg text-blue-100 max-w-md leading-relaxed">            {t('home.hero.descripcion')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={contacto}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold text-base hover:shadow-lg transition-all"
            >
              {t('home.hero.contacto')}
            </a>
          </div>
        </div>

        {/* Columna derecha - Imagen */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md animate-bounce-slow">
            <img
              src="/mistli-cloud.png"
              alt="Mistli Cloud"
              className="rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent rounded-3xl" />
          </div>
        </div>

      </div>

      {/* Decorativo blur fondo */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

    </section>
  );
};

export default Hero;