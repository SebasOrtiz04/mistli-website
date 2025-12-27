import { FaQuoteLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';

const Resenas: React.FC = () => {
  const idioma = useSelector((state: RootState) => state.locale.language);

  const testimonials = idioma === 'ES'
    ? [
        {
          name: "Facundo M.",
          text: "Me encantó mi página web orientada a mi negocio.",
        },
        {
          name: "Eren A.",
          text: "La inteligencia artificial que hicieron para poder clasificar mis datos sobrepasó mis expectativas.",
        },
        {
          name: "Pedro J.",
          text: "El algoritmo que desarrollaron para mi trabajo es exactamente lo que necesitaba para cumplir mi meta laboral.",
        },
      ]
    : [
        {
          name: "Facundo M.",
          text: "I loved the website they built for my business.",
        },
        {
          name: "Eren A.",
          text: "The AI they built to classify my data exceeded my expectations.",
        },
        {
          name: "Pedro J.",
          text: "The algorithm they developed was exactly what I needed to reach my professional goals.",
        },
      ];

  const title = idioma === 'ES' ? "Reseñas de Clientes Reales" : "Real Customer Reviews";

  return (
    <section className="px-6 md:px-20 text-center">
      <h2 className="text-4xl font-bold mb-12 text-black">{title}</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {testimonials.map(({ name, text }, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-br from-[#1A1A1E] to-[#26262A] text-white p-8 rounded-3xl shadow-xl max-w-sm w-full mx-auto hover:scale-[1.03] transition duration-300"
          >
            {/* Comillas grandes al fondo */}
            <FaQuoteLeft className="absolute top-6 left-6 text-[#A1F0D1] opacity-20 text-4xl" />

            <p className="text-lg leading-relaxed z-10 relative">{text}</p>
            
            <div className="mt-6 text-right">
              <p className="text-sm text-[#A1F0D1] font-semibold">— {name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resenas;
