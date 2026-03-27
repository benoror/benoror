import type { AnchorHTMLAttributes, ReactNode } from "react"
import { ExternalLink as ExternalLinkIcon } from "lucide-react"

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  showIcon?: boolean
  iconSize?: number
  iconClassName?: string
}

export default function ExternalLink({
  children,
  className,
  showIcon = true,
  iconSize = 12,
  iconClassName = "opacity-70",
  target,
  rel,
  ...props
}: ExternalLinkProps) {
  const resolvedRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)

  return (
    <a
      target={target}
      rel={resolvedRel}
      className={`inline-flex items-center gap-1 ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
      {showIcon ? <ExternalLinkIcon size={iconSize} aria-hidden="true" className={iconClassName} /> : null}
    </a>
  )
}
