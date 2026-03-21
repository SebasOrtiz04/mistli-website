'use client'

import { useContext, useState, useCallback, useRef, useEffect } from "react"
import Icon from "../iconify/Icon"
import { FirebaseContext } from "../../lib/firebase"

export default function UserMenu() {
  const context = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!context) return null

  const { usuario, firebase } = context

  const iniciarSesion = useCallback(async () => {
    if (!firebase) return
    try {
      setLoading(true)
      await firebase.registrarGoogle()
    } catch (err) {
      console.error("Error login:", err)
    } finally {
      setLoading(false)
    }
  }, [firebase])

  const cerrarSesion = useCallback(async () => {
    if (!firebase) return
    try {
      setLoading(true)
      setOpen(false)
      await firebase.cerrarSesion()
    } catch (err) {
      console.error("Error logout:", err)
    } finally {
      setLoading(false)
    }
  }, [firebase])

  // ── Usuario NO autenticado ──────────────────────────────────────────────────
  if (!usuario) {
    return (
      <button
        disabled={loading}
        onClick={iniciarSesion}
        className="flex items-center gap-2 px-4 py-2 rounded-full
          bg-blue-500 text-white text-sm font-medium
          hover:bg-blue-600 active:scale-95
          disabled:opacity-50 transition-all cursor-pointer"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Icon icon="mdi:google" className="text-base" />
        )}
        {loading ? "Entrando..." : "Iniciar sesión"}
      </button>
    )
  }

  // ── Usuario autenticado ─────────────────────────────────────────────────────
  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar / trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        disabled={loading}
        className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent
          hover:ring-blue-400 active:scale-95
          disabled:opacity-50 transition-all cursor-pointer focus:outline-none"
        aria-label="Menú de usuario"
        aria-expanded={open}
      >
        {usuario.photoURL ? (
          <img
            src={usuario.photoURL}
            alt={usuario.displayName ?? "Perfil"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Icon icon="mdi:user" className="text-xl text-gray-500" />
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg
            bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
            py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Info del usuario */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {usuario.displayName ?? "Usuario"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {usuario.email}
            </p>
          </div>

          {/* Cerrar sesión */}
          <button
            onClick={cerrarSesion}
            disabled={loading}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm
              text-red-600 dark:text-red-400
              hover:bg-red-50 dark:hover:bg-red-900/20
              disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon icon="mdi:logout" className="text-base" />
            )}
            {loading ? "Saliendo..." : "Cerrar sesión"}
          </button>
        </div>
      )}
    </div>
  )
}