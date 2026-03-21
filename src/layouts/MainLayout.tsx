import { ReactNode } from "react";
import Footer from "../sections/website/home/Footer.tsx";
import Header from "../components/ui/Header.tsx";
import { Providers } from "./provider.tsx";
export interface IMainLayout {
    children: ReactNode
}

export default function MainLayout({ children }: IMainLayout) {
    return (
        <>
            <Providers>
                <header>
                    <Header />
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
