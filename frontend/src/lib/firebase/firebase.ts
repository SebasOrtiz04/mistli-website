import { initializeApp, FirebaseApp } from "firebase/app";
import firebaseConfig from "./config.ts"

import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail 
} from "firebase/auth";

import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

class Firebase {

  app?: FirebaseApp
  auth?: Auth
  db?: Firestore
  storage?: FirebaseStorage
  analytics?: Analytics
  provider?: GoogleAuthProvider

  constructor() {

    if (typeof window !== "undefined") {

      const app = initializeApp(firebaseConfig)
      this.app = app

      isSupported()
        .then((supported) => {
          if (supported) {
            this.analytics = getAnalytics(app)
          } else {
            console.log("Analytics is not supported in this environment.")
          }
        })
        .catch((error) => {
          console.error("Error checking if analytics is supported:", error)
        })

      this.auth = getAuth(app)
      this.db = getFirestore(app)
      this.storage = getStorage(app)
      this.provider = new GoogleAuthProvider()
    }
  }

  async registrar(nombre: string, email: string, password: string) {

    if (!this.auth) throw new Error("Auth no inicializado")

    const nuevoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    )

    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre
    })
  }

  async recuperarPassword(email: string): Promise<void> {

    if (!this.auth || !this.provider) {
      throw new Error("Auth no inicializado")
    }
    await sendPasswordResetEmail(this.auth, email);
  }

  async registrarGoogle() {

    if (!this.auth || !this.provider) {
      throw new Error("Auth no inicializado")
    }

    try {
      this.provider.addScope("profile")
      this.provider.addScope("email")

      return await signInWithPopup(this.auth, this.provider)

    } catch (error) {
      console.log("Error al registrar/iniciar sesión con Google:", error)
      throw error
    }
  }

  async login(email: string, password: string) {

    if (!this.auth) throw new Error("Auth no inicializado")

    return signInWithEmailAndPassword(this.auth, email, password)
  }

  async cerrarSesion() {

    if (!this.auth) throw new Error("Auth no inicializado")

    await signOut(this.auth)
  }

}

const firebase = new Firebase()

export default firebase