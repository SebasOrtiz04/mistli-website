import { User } from "firebase/auth"
import { useState, useEffect } from "react"
import { obtenerRoleUsuario } from "../lib/firebase/services/userServices"



function useRole(usuario:User | null) {
    const [role, setRole] = useState<string>("")
    useEffect(() => {

        if (!usuario) return
        const uid = usuario.uid
        async function cargarRole() {
          try {

            const data = await obtenerRoleUsuario(uid)

            setRole(data)
          } catch (error) {
            console.error("Error obteniendo role:", error)
          }
        }

        cargarRole()

      }, [usuario])
    return role
}

export default useRole