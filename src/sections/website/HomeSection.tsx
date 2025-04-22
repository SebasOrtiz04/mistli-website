import { Helmet } from "react-helmet-async";
import HomePage from "../../pages/HomePage.tsx";

export default function HomeSection() {
  return (
    <>
        <Helmet>
            <title>Bienvenido | Mistli - Soluciones en Ingeniería</title>  
        </Helmet> 
        <HomePage/>
    </>
  )
}
