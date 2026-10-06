import { doc, setDoc, getDoc } from "firebase/firestore"
import firebase from "../firebase"
import { UserRole} from "../../../types/types"


export async function obtenerRoleUsuario(uid: string): Promise<UserRole> {

  if (!firebase.db) {
    throw new Error("Firestore no inicializado")
  }

  const ref = doc(firebase.db, "users", uid)
  const snapshot = await getDoc(ref)

  // si el usuario no existe lo creamos
  if (!snapshot.exists()) {

    await setDoc(ref, {
      uid,
      role: "usuario",
      createdAt: new Date()
    })

    return "usuario"
  }

  const data = snapshot.data()

  return (data.role ?? "usuario") as UserRole
}