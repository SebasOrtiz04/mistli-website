import { ReactNode } from "react";
import Footer from "../sections/website/home/Footer.tsx";
import Header from "../components/ui/Header.tsx";
import { Providers } from "./provider.tsx";
export interface IMainLayout {
    children: ReactNode
}
import useRole from "../hooks/useRole.ts";
import useAutenticacion from "../hooks/useAutenticacion.ts";

export default function MainLayout({ children }: IMainLayout) {
    const usuario = useAutenticacion()
    const role = useRole(usuario)
    console.log("Role en MainLayout:", role)
    return (
        <>
            <Providers>
                <header>
                    <Header role={role} />
                </header>
                <main className='min-h-[calc(100vh-144px)]'>
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>
            </Providers>
        </>
    )
}
