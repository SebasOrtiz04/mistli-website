import {Noticia} from "../noticias/[noticia].tsx"

export default function NoticiaView() {
  const noticias=[{
    breadcrumb:[{label:"inicio",href:"/"}],
    category:"AI UPDATE",
    categoryColor:"cyan" as const,
    date:"",
    readTime:5,
    title:"titulo",
    titleHighlight:"highlight",
    heroImage:"",
    heroImageAlt:"",
    content: (
      <p>contenido</p>
    ),    
    relatedPosts:[{
    id: "1",
    title: "Otra noticia",
    date: "2024",
    category: "AI",
    link: "/url"
  }]
  }]
  return (
    <>        
        {noticias.map((noticia, index) => (
          <Noticia key={index} {...noticia} />
        ))}
    </>
  )
}
