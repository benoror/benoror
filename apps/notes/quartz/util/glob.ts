import path from "path"
import { FilePath } from "./path"
import { globby } from "globby"

export function toPosixPath(fp: string): string {
  return fp.split(path.sep).join("/")
}

export async function glob(
  pattern: string,
  cwd: string,
  ignorePatterns: string[],
): Promise<FilePath[]> {
  const fps = (
    await globby(pattern, {
      cwd,
      ignore: ignorePatterns,
      gitignore: true,
      // Include content under dot-directories (e.g. Agents/.agents/**).
      // Still respect ignorePatterns / gitignore for .obsidian, .git, etc.
      dot: true,
    })
  ).map(toPosixPath)
  return fps as FilePath[]
}
