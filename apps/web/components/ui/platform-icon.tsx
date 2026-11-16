import { Github, Link as LinkIcon, PawPrint } from "lucide-react"
import type { FeedPlatform } from "@/lib/feed/platform"

type PlatformIconProps = {
  platform: FeedPlatform
  className?: string
  size?: number
}

function MaskIcon({
  src,
  className,
  size,
  scale = "contain",
}: {
  src: string
  className?: string
  size: number
  scale?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        maskImage: `url('${src}')`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: scale,
        WebkitMaskImage: `url('${src}')`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: scale,
      }}
    />
  )
}

function BrandSvg({
  className,
  children,
  size,
  viewBox = "0 0 24 24",
}: {
  className?: string
  children: React.ReactNode
  size: number
  viewBox?: string
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={viewBox}
      className={`block shrink-0 fill-current ${className ?? ""}`}
      style={{ minWidth: size, minHeight: size }}
    >
      {children}
    </svg>
  )
}

// Monochrome brand paths are based on the official marks distributed by
// Simple Icons (CC0-1.0), so they inherit the site's theme color.
export function PlatformIcon({ platform, className, size = 16 }: PlatformIconProps) {
  switch (platform) {
    case "x":
      return (
        <BrandSvg className={className} size={size}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </BrandSvg>
      )
    case "bluesky":
      return <MaskIcon src="/images/icons/bluesky.svg" className={className} size={size} />
    case "bear":
      return <PawPrint aria-hidden="true" className={className} size={size} style={{ minWidth: size }} />
    case "linkedin":
      return (
        <BrandSvg className={className} size={size}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM6.814 20.452H3.861V9h2.953v11.452Z" />
        </BrandSvg>
      )
    case "notes":
      return <MaskIcon src="/images/icons/obsidian.svg" className={className} size={size} scale="115%" />
    case "medium":
      return (
        <BrandSvg className={className} size={size}>
          <path d="M2.01 6.55a.65.65 0 0 0-.24-.55L0 4.67V4.5h5.5l4.25 9.32L13.48 4.5h5.24v.17L17.2 5.83a.45.45 0 0 0-.17.43v11.48a.45.45 0 0 0 .17.43l1.49 1.16v.17h-7.5v-.17l1.55-1.2c.15-.15.15-.2.15-.43V8.42L8.58 19.47h-.31L3.25 8.42v7.8c-.04.3.06.6.27.82l2.01 2.45v.17H0v-.17l2.01-2.45c.21-.22.3-.52.26-.82V6.55h-.26Zm17.84 11.54c0 .12.04.23.13.31l1.24 1.2v.17h-6.2v-.17l1.29-1.23c.13-.13.13-.17.13-.37V6.01c0-.2 0-.24-.13-.37l-1.29-1.23v-.17h6.2v.17l-1.24 1.2a.43.43 0 0 0-.13.31v12.17Z" />
        </BrandSvg>
      )
    case "blogger":
      return (
        <BrandSvg className={className} size={size}>
          <path d="M20.46 10.42h-1.27c-.7 0-1.31-.58-1.31-1.29A6.88 6.88 0 0 0 11 2.25H7.13A5.13 5.13 0 0 0 2 7.38v9.24a5.13 5.13 0 0 0 5.13 5.13h9.74A5.13 5.13 0 0 0 22 16.62v-4.74c0-.81-.68-1.46-1.54-1.46ZM7.2 6.75h4.1a1.25 1.25 0 1 1 0 2.5H7.2a1.25 1.25 0 0 1 0-2.5Zm9.65 10.5H7.2a1.25 1.25 0 1 1 0-2.5h9.65a1.25 1.25 0 1 1 0 2.5Z" />
        </BrandSvg>
      )
    case "stackoverflow":
      return (
        <BrandSvg className={className} size={size}>
          <path d="m17.47 20.47-12.97-.01v-5.57H2.65v7.42h16.67v-7.42h-1.85v5.58ZM6.54 14.38l9.08 1.9.39-1.8-9.08-1.9-.39 1.8Zm1.2-4.31 8.41 3.93.78-1.68-8.42-3.93-.77 1.68Zm2.33-4.09 7.13 5.95 1.19-1.42-7.13-5.96-1.19 1.43Zm4.6-4.29-1.49 1.1 5.51 7.47 1.49-1.1-5.51-7.47ZM6.35 18.61h9.28v-1.85H6.35v1.85Z" />
        </BrandSvg>
      )
    case "gist":
    case "github":
      return <Github aria-hidden="true" className={className} size={size} style={{ minWidth: size }} />
    default:
      return <LinkIcon aria-hidden="true" className={className} size={size} style={{ minWidth: size }} />
  }
}
