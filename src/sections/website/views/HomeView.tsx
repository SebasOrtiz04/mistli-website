import Pricing from "../home/Pricing.tsx";
import Resenas from "../home/Reseñas.tsx";
import Hero from "../home/Hero.tsx"
import NeuralNetworkChart from "../home/RedesNeuronales.tsx"
export default function HomeView() {
  return (
    <>        
        <Hero/>
        <Pricing/>
        <Resenas/>
        <NeuralNetworkChart/>
    </>
  )
}
