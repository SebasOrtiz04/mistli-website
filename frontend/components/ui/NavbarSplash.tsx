
"use client";

import styles from "@/styles/NavbarSplash.module.css";

export default function NavbarSplash() {
  return (
    <div
      className={styles.navbarSplash}
      role="status"
      aria-label="Cargando navegación de Mistli"
    >
      {/* Resplandor ambiental de marca */}
      <div className={styles.glow} aria-hidden="true" />

      {/* Marca */}
      <div className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true">
          m
        </span>

        <span className={styles.brandName}>mistli</span>
      </div>

      {/* Esqueleto de los enlaces */}
      <div className={styles.desktopLinks} aria-hidden="true">
        <span className={styles.linkSkeleton} />
        <span className={styles.linkSkeleton} />
        <span className={styles.linkSkeleton} />
        <span className={styles.linkSkeleton} />
      </div>

      {/* Esqueleto del menú móvil */}
      <div className={styles.mobileMenu} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <span className={styles.srOnly}>Cargando...</span>
    </div>
  );
}
