export type UserRole = "usuario" | "admin"
export type CategoryColor = "cyan" | "blue" | "green" | "yellow" | "red" | "purple"
export type Category = "AI UPDATE" | "AI" | "INGENIERÍA" | "TECNOLOGÍA"

export interface UserProfile {
  uid: string
  nombre: string
  email: string
  role: UserRole
  createdAt: number
}

export interface RelatedNew {
  id:string
  title:string
  date:number
  category:Category
  categoryColor: CategoryColor
  link:string
}

export interface BaseBlock {
  id: string
  type: string
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph"
  text: string
}

export interface HeadingBlock extends BaseBlock{
  type: "heading"
  level: 1 | 2 | 3 | 4
  text: string
}

export interface ListBlock extends BaseBlock{
  type: "list"
  style: "bullet" | "number"
  items: string[]
}

export interface ImageBlock extends BaseBlock{
  type: "image"
  url: string
  caption?: string
}

export interface VideoBlock extends BaseBlock{
  type: "video"
  url: string
  poster?: string
}

export interface CodeBlock extends BaseBlock{
  type: "code"
  language: string
  code: string
}

export interface EmbedBlock extends BaseBlock{
  type: "embed"
  provider: "youtube" | "loom" | "figma" | "iframe"
  url: string
  height?: number
}

export interface QuoteBlock extends BaseBlock{
  type: "quote"
  text: string
  author?: string
}

export interface DividerBlock extends BaseBlock{
  type: "divider"
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | ImageBlock
  | VideoBlock
  | CodeBlock
  | EmbedBlock
  | QuoteBlock
  | DividerBlock

export interface News {
  id:string
  breadcrumb: {label: string, href: string}[]
  description:string
  image:string
  category: Category
  categoryColor: CategoryColor
  date:string
  icon: "ai" | "api" | "automation" | "cloud" | "frontend" | "news"
  readTime:number
  title:string
  titleHighlight:string
  heroImage:string
  heroImageAlt:string
  relatedPosts:RelatedNew[]
}

export interface CompleteNews extends News {
  content:ContentBlock[]
}

