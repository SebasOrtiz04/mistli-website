"use client"

import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import firebase from "../lib/firebase"
import { ContentBlock } from "../types/types"

export default function useContent(contentId?: string) {

  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {

    if (!firebase.db) {
      setError(new Error("Firestore no inicializado"))
      setLoading(false)
      return
    }

    if (!contentId) return

    const ref = doc(firebase.db, "contents", contentId)

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {

        if (!snap.exists()) {
          setBlocks([])
          setLoading(false)
          return
        }

        const data = snap.data() as { blocks: ContentBlock[] }

        setBlocks(data.blocks ?? [])
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()

  }, [contentId])

  return { blocks, loading, error }
}