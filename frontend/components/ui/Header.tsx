import { useCallback, useState } from "react";
import Logo from "@/components/logo/Logo";
import Container from "@/components/utils/Container";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";

interface HeaderProps {
  role: string;
}

export default function Header({ role }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<"navigation" | "user" | null>(null);

  const toggleNavigation = useCallback(() => {
    setOpenMenu((current) => (current === "navigation" ? null : "navigation"));
  }, []);

  const toggleUser = useCallback(() => {
    setOpenMenu((current) => (current === "user" ? null : "user"));
  }, []);

  /*
   * Referencia ESTABLE: Navbar y UserMenu la usan como dependencia de
   * sus useEffect. Con una función inline se re-suscribirían los listeners
   * en cada render.
   */
  const closeMenus = useCallback(() => setOpenMenu(null), []);

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        h-18
        border-b
        border-white/6
        bg-surface-950/90
        backdrop-blur-xl
      "
    >
      <Container className="flex h-full items-center gap-2.5">
        {/* Logo: siempre a la izquierda */}
        <div className="order-1 w-8.5 h-8.5 shrink-0">
          <Logo />
        </div>

        {/*
          Navbar:
          - Desktop: centrado entre el logo y el usuario.
          - Móvil: el botón hamburguesa queda a la derecha, junto al avatar.
        */}
        <div className="order-3 md:order-2 md:flex md:flex-1 md:justify-center">
          <Navbar
            open={openMenu === "navigation"}
            onToggle={toggleNavigation}
            onClose={closeMenus}
          />
        </div>

        {/* Usuario: se empuja a la derecha en móvil */}
        <div className="order-2 md:order-3 ml-auto md:ml-0 shrink-0">
          <UserMenu
            role={role}
            open={openMenu === "user"}
            onToggle={toggleUser}
            onClose={closeMenus}
          />
        </div>
      </Container>
    </header>
  );
}