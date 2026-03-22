import {Noticia} from "../noticias/[noticia].tsx"
import useNoticias from "../../../hooks/useNoticias"
import { News } from "../../../types/types.ts"

export default function NoticiaView() {
  const {data:noticias} = useNoticias()
  return (
    <>        
        {noticias.map((noticia:News) => (
          <Noticia key={noticia.id} {...noticia} />
        ))}
    </>
  )
}
