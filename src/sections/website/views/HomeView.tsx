import Pricing from "../home/Pricing.tsx";
import Resenas from "../home/Reseñas.tsx";

export default function HomeView() {
  return (
    <>  
            <img
              src="/mistli-cloud.png"
              alt="Mistli Cloud"
              className="w-64 h-64 object-contain"
            />        
        <Pricing/>
        <Resenas/>
    </>
  )
}
