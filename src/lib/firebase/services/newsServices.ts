import {News} from "../../../types/types"
import {collection, documentId, getDocs, query, where, Query} from "firebase/firestore"
import firebase from "../firebase"

export async function obtenerNews(uid: string | null): Promise<News[]> {

  if (!firebase.db) {
    throw new Error("Firestore no inicializado")
  }

  const newsref = collection(firebase.db, "newsPublic")

  let q: Query
  if (uid) {
    const newsPublics= await obtenerNews(uid)
    q = query(newsref, where(documentId(), "in", newsPublics.map(r => r.id)))
  } else {
    q = query(newsref)
  }

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<News, "id">)
  }))
}