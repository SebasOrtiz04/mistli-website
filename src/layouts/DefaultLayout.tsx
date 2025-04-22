import { Outlet } from "react-router";
import Footer from "../components/ui/Footer.tsx";
import Header from "../components/ui/Header.tsx";

export default function DefaultLayout() {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
  )
}
