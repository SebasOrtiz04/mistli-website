import { Helmet } from "react-helmet-async";
import HomeView from "../../sections/website/views/HomeView.tsx";

export default function HomePage() {
  return (
    <>
        <Helmet>
            <title>Bienvenido | Mistli - Soluciones en Ingeniería</title>  
        </Helmet> 
        <HomeView/>
    </>
  )
}
