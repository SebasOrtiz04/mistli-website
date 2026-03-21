import { createContext } from "react"
import { User } from "firebase/auth"
import firebase from "./firebase"

type FirebaseContextType = {
  usuario: User | null
  firebase: typeof firebase
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null)

export default FirebaseContext