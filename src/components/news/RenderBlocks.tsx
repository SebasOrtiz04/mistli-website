import React from "react"
import { ContentBlock } from "../../types/types"

export const RenderBlock: React.FC<{ block: ContentBlock }> = ({ block }) => {

  switch (block.type) {

    case "paragraph":
      return (
        <p className="text-white/60 leading-relaxed">
          {block.text}
        </p>
      )

    case "heading":
      const Tag = `h${block.level}` as keyof JSX.IntrinsicElements
      return (
        <Tag className="text-white font-bold mt-8 mb-3 text-xl">
          {block.text}
        </Tag>
      )

    case "list":
      if (block.style === "number") {
        return (
          <ol className="space-y-2 list-decimal pl-5">
            {block.items.map((item, i) => (
              <li key={i} className="text-white/60">{item}</li>
            ))}
          </ol>
        )
      }

      return (
        <ul className="space-y-2 pl-0 list-none">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-white/60">
              <span className="text-violet-400 mt-[2px]">•</span>
              {item}
            </li>
          ))}
        </ul>
      )

    case "image":
      return (
        <figure className="my-6">
          <img
            src={block.url}
            className="rounded-xl border border-white/10"
          />
          {block.caption && (
            <figcaption className="text-xs text-white/30 mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case "video":
      return (
        <div className="my-8">
          <video
            src={block.url}
            poster={block.poster}
            controls
            className="w-full rounded-xl border border-white/10"
          />
        </div>
      )

    case "code":
      return (
        <pre className="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-emerald-300">
          <code>
            {block.code}
          </code>
        </pre>
      )

    case "embed":

      if (block.provider === "youtube") {
        const videoId = block.url.split("v=")[1]?.split("&")[0]

        return (
          <div className="aspect-video my-8">
            <iframe
              className="w-full h-full rounded-xl border border-white/10"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          </div>
        )
      }

      return (
        <iframe
          src={block.url}
          className="w-full rounded-xl border border-white/10 my-8"
          style={{ height: block.height ?? 400 }}
        />
      )

    case "quote":
      return (
        <blockquote className="border-l-4 border-violet-500 pl-4 italic text-white/60 my-6">
          {block.text}
          {block.author && (
            <div className="text-xs text-white/30 mt-2">
              — {block.author}
            </div>
          )}
        </blockquote>
      )

    case "divider":
      return (
        <div className="border-t border-white/10 my-8" />
      )

    default:
      return null
  }
}