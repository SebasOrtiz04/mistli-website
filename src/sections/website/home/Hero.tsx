import { useTranslation } from 'react-i18next';
import { baseWhats } from '../../../constants';
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const contacto = baseWhats + encodeURIComponent(t('home.msgwhats1'));

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-48 py-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Texto */}
      <div className="md:max-w-xl text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {t('home.hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-blue-200">
          {t('home.hero.descripcion')}
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <a href={contacto} className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow hover:bg-blue-100 transition">
            {t('home.hero.contacto')}
          </a>
        </div>
      </div>

      {/* Imagen */}
      <div className="mt-10 md:mt-0">
        <img
          src="/mistli-cloud.png"
          alt="Mistli Cloud"
          className="w-96 h-96 object-contain mx-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
