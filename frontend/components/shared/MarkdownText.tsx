import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import { safeHref } from "@/app/lib/strapi";

interface MarkdownTextProps {
  content?: string | null;
  className?: string;
  style?: CSSProperties;
}

export default function MarkdownText({
  content,
  className,
  style,
}: MarkdownTextProps) {
  if (!content) return null;

  return (
    <div className={className} style={style}>
      <ReactMarkdown
        skipHtml
        components={{
          a: ({ href, children, ...props }) => {
            const safeUrl = safeHref(href);
            if (!safeUrl) return <span>{children}</span>;
            const external =
              safeUrl.startsWith("http://") || safeUrl.startsWith("https://");
            return (
              <a
                href={safeUrl}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
