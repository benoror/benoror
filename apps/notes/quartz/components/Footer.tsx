import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { joinSegments, pathToRoot } from "../util/path"

interface Options {
  links: Record<string, string>
}

function MarkdownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 16V8h2l3 3 3-3h2v8h-2v-5.17l-3 3-3-3V16H2zm14-8h3v4h2.5l-4 4.5-4-4.5H16V8z" />
    </svg>
  )
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const markdownHref = fileData.slug
      ? joinSegments(pathToRoot(fileData.slug), "md", `${fileData.slug}.md`)
      : null
    return (
      <footer class={`${displayClass ?? ""}`}>
        {markdownHref && (
          <div class="footer-actions">
            <a class="markdown-download-link" href={markdownHref} download>
              Download
            </a>
            <a class="markdown-download" href={markdownHref} download aria-label="Download Markdown">
              <MarkdownIcon />
            </a>
          </div>
        )}
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
