import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';

const Hero: React.FC = () => {
  const idioma = useSelector((state: RootState) => state.locale.language);

  const textos = idioma === 'ES'
    ? {
        titulo: "Una solución de ingeniería del futuro para negocios del futuro",
        descripcion: "Desarrollo de software en la nube, escalable y a medida para impulsar tu empresa.",
        contacto: "Contáctanos",
        servicios: "Ver Servicios",
      }
    : {
        titulo: "An engineering solution of the future for businesses of the future",
        descripcion: "Cloud-based, scalable, and custom software development to boost your company.",
        contacto: "Contact Us",
        servicios: "View Services",
      };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-48 py-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Texto */}
      <div className="md:max-w-xl text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {textos.titulo}
        </h1>
        <p className="text-lg md:text-xl text-blue-200">
          {textos.descripcion}
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <button className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow hover:bg-blue-100 transition">
            {textos.contacto}
          </button>
          <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition">
            {textos.servicios}
          </button>
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
