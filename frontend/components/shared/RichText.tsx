import type { ReactNode } from "react";
import Image from "next/image";
import { mediaUrl } from "@/app/lib/strapi";
import type { BlocksContent } from "@/app/lib/types";

interface Block {
  type: string;
  children?: TextNode[];
  level?: number;
  format?: "ordered" | "unordered";
  url?: string;
  image?: {
    url: string;
    alternativeText?: string | null;
    width: number;
    height: number;
  };
}

interface TextNode {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: TextNode[];
}

function renderText(node: TextNode, i: number): ReactNode {
  if (node.type === "link" && node.children) {
    return (
      <a key={i} href={node.url} target="_blank" rel="noopener noreferrer">
        {node.children.map(renderText)}
      </a>
    );
  }

  let content: ReactNode = node.text ?? "";
  if (node.bold) content = <strong key={`b${i}`}>{content}</strong>;
  if (node.italic) content = <em key={`i${i}`}>{content}</em>;
  if (node.underline) content = <u key={`u${i}`}>{content}</u>;
  if (node.strikethrough) content = <s key={`s${i}`}>{content}</s>;
  if (node.code) content = <code key={`c${i}`}>{content}</code>;
  return <span key={i}>{content}</span>;
}

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.type) {
    case "paragraph":
      return <p key={key}>{block.children?.map(renderText)}</p>;
    case "heading": {
      const lvl = Math.min(Math.max(block.level ?? 2, 2), 4);
      const Tag = `h${lvl}` as "h2" | "h3" | "h4";
      return <Tag key={key}>{block.children?.map(renderText)}</Tag>;
    }
    case "list": {
      const Tag = block.format === "ordered" ? "ol" : "ul";
      return (
        <Tag key={key}>
          {(block.children as unknown as Block[])?.map((li, i) => (
            <li key={i}>{(li.children as TextNode[])?.map(renderText)}</li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return <blockquote key={key}>{block.children?.map(renderText)}</blockquote>;
    case "code":
      return (
        <pre key={key}>
          <code>{block.children?.map((c) => c.text).join("")}</code>
        </pre>
      );
    case "image": {
      const img = block.image;
      if (!img) return null;
      const src = mediaUrl(img.url);
      if (!src) return null;
      return (
        <Image
          key={key}
          src={src}
          alt={img.alternativeText ?? ""}
          width={img.width}
          height={img.height}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      );
    }
    default:
      return null;
  }
}

interface RichTextProps {
  content?: BlocksContent | null;
  className?: string;
}

export default function RichText({ content, className }: RichTextProps) {
  if (!content || !Array.isArray(content) || content.length === 0) return null;
  const cls = ["prose", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {(content as unknown as Block[]).map((b, i) => renderBlock(b, i))}
    </div>
  );
}
