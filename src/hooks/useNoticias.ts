"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { News } from "../types/types"
import firebase from "../lib/firebase"
export default function useNoticias() {
  const [data, setData] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
      if (!firebase.db) {
            throw new Error("Firestore no inicializado")
        }
    const unsubscribe = onSnapshot(
      collection(firebase.db, "newsPublic"),
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as Omit<News, "id">
        }))
        setData(docs)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { data, loading, error }
}