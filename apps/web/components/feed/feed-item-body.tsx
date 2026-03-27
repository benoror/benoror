"use client"

import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import { Highlight, themes } from "prism-react-renderer"
import { useAppTheme } from "@/hooks/use-app-theme"

type FeedBodyProps = {
  body?: string
  bodyFormat?: "html" | "markdown" | "code" | "text"
  codeLanguage?: string
  className?: string
  continueHref?: string
  maxChars?: number
  maxCodeLines?: number
  continueLinkClassName?: string
}

const contentContainerClass = [
  "[&>*+*]:mt-3",
  "[&_hr]:my-4",
  "[&_h1]:text-2xl",
  "[&_h2]:text-xl",
  "[&_h3]:text-lg",
  "[&_h4]:text-base",
  "[&_h1]:font-semibold",
  "[&_h2]:font-semibold",
  "[&_h3]:font-semibold",
  "[&_h4]:font-semibold",
  "[&_p]:leading-relaxed",
  "[&_ul]:list-disc [&_ul]:pl-5",
  "[&_ol]:list-decimal [&_ol]:pl-5",
  "[&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:italic",
].join(" ")

const sanitizeHtml = (html: string): string =>
  html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "")

const decodeHtmlEntities = (input: string): string =>
  input
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ")

const stripHtmlTags = (input: string): string =>
  decodeHtmlEntities(input.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]+>/g, ""))

const truncateAtWord = (input: string, maxChars: number): { text: string; truncated: boolean } => {
  if (input.length <= maxChars) {
    return { text: input, truncated: false }
  }

  const sliced = input.slice(0, maxChars)
  const lastBreak = Math.max(sliced.lastIndexOf(" "), sliced.lastIndexOf("\n"), sliced.lastIndexOf("\t"))
  const cutAt = lastBreak > Math.floor(maxChars * 0.6) ? lastBreak : maxChars
  const rounded = sliced.slice(0, cutAt).trimEnd()

  return { text: `${rounded}...`, truncated: true }
}

const normalizeCodeContent = (input: string): string => {
  const lines = input.replace(/\r\n/g, "\n").split("\n").map((line) => line.replace(/\s+$/g, ""))

  // Some feeds (notably gist HTML extracts) can yield an alternating
  // "code line + blank line" pattern. Compact that while preserving
  // intentionally separated blocks when possible.
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0).length
  const blankLines = lines.length - nonEmptyLines
  const hasAlternatingBlankPattern =
    lines.length >= 6 &&
    blankLines >= nonEmptyLines - 1 &&
    lines.every((line, index) => (index % 2 === 1 ? line.trim().length === 0 : true))

  const normalizedInputLines = hasAlternatingBlankPattern ? lines.filter((_, index) => index % 2 === 0) : lines
  const collapsed: string[] = []
  let blankCount = 0

  for (const line of normalizedInputLines) {
    const isBlank = line.trim().length === 0
    if (isBlank) {
      blankCount += 1
      if (blankCount > 1) continue
      collapsed.push("")
      continue
    }

    blankCount = 0
    collapsed.push(line)
  }

  return collapsed.join("\n").trim()
}

const truncateCodeByLines = (input: string, maxLines: number): { code: string; truncated: boolean } => {
  const lines = input.split("\n")
  if (lines.length <= maxLines) {
    return { code: input, truncated: false }
  }

  const trimmed = lines.slice(0, maxLines).join("\n").trimEnd()
  return { code: `${trimmed}\n...`, truncated: true }
}

const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
  const { isBlueDark } = useAppTheme()
  const theme = isBlueDark ? themes.vsDark : themes.vsLight
  const normalizedLanguage = (language || "text") as Parameters<typeof Highlight>[0]["language"]
  const normalizedCode = normalizeCodeContent(code)

  return (
    <Highlight theme={theme} code={normalizedCode} language={normalizedLanguage}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} overflow-x-auto rounded-md p-3 text-xs leading-5`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default function FeedItemBody({
  body,
  bodyFormat,
  codeLanguage,
  className,
  continueHref,
  maxChars = 2000,
  maxCodeLines = 20,
  continueLinkClassName,
}: FeedBodyProps) {
  const normalizedBody = body?.trim()
  if (!normalizedBody) return null
  const { text: truncatedBody, truncated } = truncateAtWord(normalizedBody, maxChars)
  const bodyForRender =
    bodyFormat === "html" && truncated
      ? stripHtmlTags(truncatedBody)
      : truncatedBody

  if (bodyFormat === "code") {
    const normalizedCode = normalizeCodeContent(normalizedBody)
    const { code: codeByLines, truncated: truncatedByLines } = truncateCodeByLines(normalizedCode, maxCodeLines)

    return (
      <div className="space-y-2">
        <CodeBlock code={codeByLines} language={codeLanguage} />
        {(truncatedByLines || truncated) && continueHref ? (
          <a
            href={continueHref}
            target="_blank"
            rel="noopener noreferrer"
            className={continueLinkClassName ?? "text-sm underline underline-offset-4"}
          >
            Continue reading...
          </a>
        ) : null}
      </div>
    )
  }

  if (bodyFormat === "markdown") {
    const markdownBody = bodyForRender

    return (
      <div className="space-y-2">
        <div className={`${className ?? ""} ${contentContainerClass}`.trim()}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              h4: ({ children }) => <h4>{children}</h4>,
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              hr: () => <hr />,
              code({ children, className }) {
                const match = /language-(\w+)/.exec(className || "")
                if (!match) {
                  return <code className="rounded bg-black/20 px-1 py-0.5 text-xs">{children as ReactNode}</code>
                }

                return <CodeBlock code={String(children).replace(/\n$/, "")} language={match[1]} />
              },
            }}
          >
            {markdownBody}
          </ReactMarkdown>
        </div>
        {truncated && continueHref ? (
          <a
            href={continueHref}
            target="_blank"
            rel="noopener noreferrer"
            className={continueLinkClassName ?? "text-sm underline underline-offset-4"}
          >
            Continue reading...
          </a>
        ) : null}
      </div>
    )
  }

  if (bodyFormat === "html") {
    return (
      <div className="space-y-2">
        {truncated ? (
          <p className={className}>{bodyForRender}</p>
        ) : (
          <div
            className={`${className ?? ""} ${contentContainerClass}`.trim()}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyForRender) }}
          />
        )}
        {truncated && continueHref ? (
          <a
            href={continueHref}
            target="_blank"
            rel="noopener noreferrer"
            className={continueLinkClassName ?? "text-sm underline underline-offset-4"}
          >
            Continue reading...
          </a>
        ) : null}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className={className}>{bodyForRender}</p>
      {truncated && continueHref ? (
        <a
          href={continueHref}
          target="_blank"
          rel="noopener noreferrer"
          className={continueLinkClassName ?? "text-sm underline underline-offset-4"}
        >
          Continue reading...
        </a>
      ) : null}
    </div>
  )
}
