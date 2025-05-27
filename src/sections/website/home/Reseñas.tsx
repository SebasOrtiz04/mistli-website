
const Resenas: React.FC = () => {
    const testimonials = [
      { name: "Facundo M.", text: "Me encantó mi página web orientada a mi negocio." },
      { name: "Eren A.", text: "La inteligencia artificial que hicieron para poder clasificar mis datos sobrepasó mis expectativas." },
      { name: "Pedro J.", text: "El algoritmo que desarrollaron para mi trabajo es exactamente lo que necesitaba para cumplir mi meta laboral." },
    ];
    return (
    <div>
      <section className="mt-20 text-center">
          <h2 className="text-3xl font-semibold mb-8">Reseñas de Clientes Reales</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {testimonials.map(({ name, text }, idx) => (
              <div
                key={idx}
                className="bg-[#1A1A1E] p-6 rounded-2xl shadow-md w-full max-w-sm"
              >
                <p className="text-lg mb-4">{text}</p>
                <p className="text-sm text-[#A1F0D1]">— {name}</p>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
};

export default Resenas;
