import { Noticias } from "../noticias/noticias.tsx"
import {NewsletterBanner} from "../noticias/correo.tsx"
export default function NoticiasView() {
  return (
    <>        
        <Noticias/>
        <NewsletterBanner/>
    </>
  )
}
