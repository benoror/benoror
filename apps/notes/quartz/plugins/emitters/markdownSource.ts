import fs from "fs"
import path from "path"
import { QuartzEmitterPlugin } from "../types"
import { FullSlug, joinSegments } from "../../util/path"
import { write } from "./helpers"

export const MarkdownSource: QuartzEmitterPlugin = () => ({
  name: "MarkdownSource",
  async *emit(ctx, content) {
    for (const [_tree, file] of content) {
      const slug = file.data.slug
      const relativePath = file.data.relativePath
      if (!slug || !relativePath) {
        continue
      }

      const src = path.join(ctx.argv.directory, relativePath)
      const markdown = await fs.promises.readFile(src, "utf8")
      yield write({
        ctx,
        content: markdown,
        slug: joinSegments("md", slug) as FullSlug,
        ext: ".md",
      })
    }
  },
  async *partialEmit(ctx, content) {
    for (const [_tree, file] of content) {
      const slug = file.data.slug
      const relativePath = file.data.relativePath
      if (!slug || !relativePath) {
        continue
      }

      const src = path.join(ctx.argv.directory, relativePath)
      const markdown = await fs.promises.readFile(src, "utf8")
      yield write({
        ctx,
        content: markdown,
        slug: joinSegments("md", slug) as FullSlug,
        ext: ".md",
      })
    }
  },
})
