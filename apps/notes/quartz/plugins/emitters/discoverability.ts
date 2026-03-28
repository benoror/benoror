import { QuartzEmitterPlugin } from "../types"
import { FullSlug } from "../../util/path"
import { write } from "./helpers"

function buildRobotsTxt(baseUrl: string): string {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: https://${baseUrl}/sitemap.xml`,
    `Host: ${baseUrl}`,
    "",
  ].join("\n")
}

function buildLlmsTxt(baseUrl: string, pageTitle: string): string {
  return [
    `# ${pageTitle}`,
    "",
    "This site publishes notes and markdown originals intended for both people and AI systems.",
    "",
    "## Canonical entry points",
    `- Site: https://${baseUrl}/`,
    `- Sitemap: https://${baseUrl}/sitemap.xml`,
    `- RSS: https://${baseUrl}/index.xml`,
    `- Markdown mirror root: https://${baseUrl}/md/`,
    "",
    "## Access policy",
    "- Respect robots.txt rules and crawl politely.",
    "",
  ].join("\n")
}

function buildAgentsTxt(baseUrl: string): string {
  return [
    "# agents.txt",
    "",
    "preferred-format: markdown",
    `index: https://${baseUrl}/sitemap.xml`,
    `rss: https://${baseUrl}/index.xml`,
    `markdown-root: https://${baseUrl}/md/`,
    "",
  ].join("\n")
}

export const Discoverability: QuartzEmitterPlugin = () => ({
  name: "Discoverability",
  async *emit(ctx) {
    const baseUrl = ctx.cfg.configuration.baseUrl ?? "example.com"
    const pageTitle = ctx.cfg.configuration.pageTitle

    yield write({
      ctx,
      content: buildRobotsTxt(baseUrl),
      slug: "robots" as FullSlug,
      ext: ".txt",
    })

    yield write({
      ctx,
      content: buildLlmsTxt(baseUrl, pageTitle),
      slug: "llms" as FullSlug,
      ext: ".txt",
    })

    yield write({
      ctx,
      content: buildAgentsTxt(baseUrl),
      slug: "agents" as FullSlug,
      ext: ".txt",
    })
  },
  async *partialEmit(ctx) {
    const baseUrl = ctx.cfg.configuration.baseUrl ?? "example.com"
    const pageTitle = ctx.cfg.configuration.pageTitle

    yield write({
      ctx,
      content: buildRobotsTxt(baseUrl),
      slug: "robots" as FullSlug,
      ext: ".txt",
    })

    yield write({
      ctx,
      content: buildLlmsTxt(baseUrl, pageTitle),
      slug: "llms" as FullSlug,
      ext: ".txt",
    })

    yield write({
      ctx,
      content: buildAgentsTxt(baseUrl),
      slug: "agents" as FullSlug,
      ext: ".txt",
    })
  },
})
