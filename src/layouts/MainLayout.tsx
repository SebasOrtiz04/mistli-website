import { ReactNode } from "react";
import Footer from "../components/ui/Footer.tsx";
import Header from "../components/ui/Header.tsx";

export default function MainLayout({children}: {children: ReactNode}) {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main className='min-h-[calc(100vh-144px)]'>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
  )
}
