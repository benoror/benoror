import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const quartzBaseUrl =
  process.env.QUARTZ_BASE_URL ??
  (process.env.VERCEL === "1" || process.env.VERCEL_ENV === "production"
    ? "notes.benoror.com"
    : "localhost:3002")

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ben Orozco Vaults",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: quartzBaseUrl,
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      // Align with Obsidian appearance settings (local installed font families).
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "JetBrainsMono Nerd Font Mono",
        body: "JetBrainsMono Nerd Font Mono",
        code: "JetBrainsMono Nerd Font Mono",
      },
      colors: {
        lightMode: {
          // Obsidian Nord (light variation) palette
          light: "#eceff4",
          lightgray: "#e5e9f0",
          gray: "#d8dee9",
          darkgray: "#4c566a",
          dark: "#2e3440",
          secondary: "#5e81ac",
          tertiary: "#88c0d0",
          highlight: "rgba(136, 192, 208, 0.16)",
          textHighlight: "rgba(191, 97, 106, 0.30)",
        },
        darkMode: {
          // Obsidian Nord (dark variation) palette
          light: "#2e3440",
          lightgray: "#3b4252",
          gray: "#4c566a",
          darkgray: "#d8dee9",
          dark: "#eceff4",
          secondary: "#81a1c1",
          tertiary: "#88c0d0",
          highlight: "rgba(136, 192, 208, 0.16)",
          textHighlight: "rgba(191, 97, 106, 0.35)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.MarkdownSource(),
      Plugin.Discoverability(),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
