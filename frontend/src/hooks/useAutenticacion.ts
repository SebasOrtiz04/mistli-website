import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"

function useAutenticacion(): User | null {

    const [usuarioAutenticado, setUsuarioAutenticado] = useState<User | null>(null)

    useEffect(() => {

        const auth = getAuth()

        const unsuscribe = onAuthStateChanged(auth, (usuario) => {
            setUsuarioAutenticado(usuario)
        })

        return () => unsuscribe()

    }, [])

    return usuarioAutenticado
}

export default useAutenticacion