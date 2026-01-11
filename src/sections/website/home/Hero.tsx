import { useTranslation } from 'react-i18next';
import { baseWhats } from '../../../constants';
import CustomButton from '../../../components/utils/CustomButton';
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const contacto = baseWhats + encodeURIComponent(t('home.msgwhats1'));

  return (
    <section className=" bg-gradient-to-b from-blue-900 to-blue-800 text-white md:h-[100vh] ">
      
      <div className="flex flex-col md:flex-row items-center justify-between h-full max-w-6xl mx-auto">

      {/* Texto */}
      <div className="md:max-w-xl text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
          {t('home.hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-blue-200 text-balance">
          {t('home.hero.descripcion')}
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <CustomButton label={t('home.hero.contacto')} href={contacto} color="white" icon="mdi:whatsapp" />
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
      </div>
    </section>
  );
};

export default Hero;
