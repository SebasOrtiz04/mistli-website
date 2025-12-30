import { FaQuoteLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Resenas: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
        {
          name: "Facundo M.",
          text: t('home.reviews.text1'),
        },
        {
          name: "Eren A.",
          text: t('home.reviews.text2'),
        },
        {
          name: "Pedro J.",
          text: t('home.reviews.text3'),
        },
      ];

  const title = t('home.reviews.title');

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
