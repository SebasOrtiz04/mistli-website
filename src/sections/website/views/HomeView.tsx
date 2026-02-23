// import Pricing from "../home/Pricing.tsx";
// import Resenas from "../home/Reseñas.tsx";
import Hero from "../home/Hero.tsx"
import ExcelCreationAnimation from "../home/Excel.tsx"
// import PythonAutomationSection from "../home/Scripts.tsx";
import BackendAPIsSection from "../home/Backend.tsx";
import FrontendDevSection from "../home/Frontend.tsx";
import AISection from "../home/IA.tsx";
import Footer from "../home/Footer.tsx";

export default function HomeView() {
  return (
    <>        
        <Hero/>
        <AISection />
        <BackendAPIsSection/>
        <FrontendDevSection/>
        <ExcelCreationAnimation/>
        {/* <PythonAutomationSection/> */}
        {/* <Pricing/>
        <Resenas/> */}
        <Footer/>
    </>
  )
}
