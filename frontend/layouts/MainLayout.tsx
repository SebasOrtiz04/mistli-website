'use client'
import { ReactNode } from "react";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Providers from "@/Providers/Provider";

import useRole from "@/hooks/useRole";
import useAutenticacion from "@/hooks/useAutenticacion";

export interface IMainLayout {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: IMainLayout) {

  const usuario = useAutenticacion();
  const role = useRole(usuario);

  console.log("Role en MainLayout:", role);

  return (
    <>
      <Providers>

        <header>
          <Header role={role} />
        </header>

        <main className="min-h-[calc(100vh-144px)]">
          {children}
        </main>

        <footer>
          <Footer />
        </footer>

      </Providers>
    </>
  );
}