import {Content, News} from "../../../types/types"
import {collection,addDoc,doc,getDoc, getDocs, query} from "firebase/firestore"
import firebase from "../firebase"

export async function obtenerNews(): Promise<News[]> {

  if (!firebase.db) {
    throw new Error("Firestore no inicializado")
  }

  const newsref = collection(firebase.db, "newsPublic")

  
  const q = query(newsref)
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<News, "id">)
  }))
}

export async function obtenerUnaNews(id: string): Promise<News | null> {
  if (!firebase.db) {
    throw new Error("Firestore no inicializado")
  }

  const docRef = doc(firebase.db, "newsPublic", id)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<News, "id">)
  }
}


export async function createNews(news: News): Promise<string> {
  if (!firebase.db) {
    throw new Error("Firestore no inicializado")
  }

  // 1. Primero guardamos el contenido y obtenemos su id
  const contentId = await createContent(news.content as Content["content"])

  // 2. Guardamos la noticia con el id del contenido
  const newsref = collection(firebase.db, "newsPublic")
  const nuevoNews = {
    ...news,
    content: contentId
  }

  const docRef = await addDoc(newsref, nuevoNews)
  return docRef.id
}

export async function createContent(content: Content["content"]): Promise<string> {
  if (!firebase.db) {
    throw new Error("Firestore no inicializado")
  }

  const contentref = collection(firebase.db, "contents")
  
  // Guardamos el array completo de bloques sin los ids locales
  const blocks = content.map(({ id, ...block }) => block)
  
  const docRef = await addDoc(contentref, { blocks })
  return docRef.id
}