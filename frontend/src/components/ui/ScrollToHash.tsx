import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      const el = document.getElementById(id)

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" })
        }, 50)
      }
    }
  }, [location])

  return null
}