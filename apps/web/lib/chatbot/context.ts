import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

interface ContextFileMeta {
  id: string
  file: string
  title: string
}

interface PublicProfile {
  general_summary_file: string
  context_files_list: ContextFileMeta[]
}

interface ContextCache {
  signature: string
  content: string
}

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../")
const CHATBOT_DATA_PATH = path.join(REPO_ROOT, "packages", "data", "chatbot")
const PUBLIC_PROFILE_FILE = "public_profile.json"

let contextCache: ContextCache | null = null

function isContextFileMeta(value: unknown): value is ContextFileMeta {
  if (!value || typeof value !== "object") return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === "string" &&
    typeof candidate.file === "string" &&
    typeof candidate.title === "string"
  )
}

function isPublicProfile(value: unknown): value is PublicProfile {
  if (!value || typeof value !== "object") return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.general_summary_file === "string" &&
    Array.isArray(candidate.context_files_list) &&
    candidate.context_files_list.every(isContextFileMeta)
  )
}

async function readPublicProfile() {
  const profilePath = path.join(CHATBOT_DATA_PATH, PUBLIC_PROFILE_FILE)
  const profileRaw = await fs.readFile(profilePath, "utf-8")
  const parsed: unknown = JSON.parse(profileRaw)

  if (!isPublicProfile(parsed)) {
    throw new Error("Invalid chatbot public profile format")
  }

  return {
    profile: parsed,
    profilePath,
  }
}

async function readMarkdownFile(filename: string) {
  try {
    return await fs.readFile(path.join(CHATBOT_DATA_PATH, filename), "utf-8")
  } catch (error) {
    console.error(`Failed to load markdown file ${filename}:`, error)
    return ""
  }
}

export async function getChatbotContext() {
  const { profile, profilePath } = await readPublicProfile()
  const files = [
    profile.general_summary_file,
    ...profile.context_files_list.map((item) => item.file),
  ]
  const uniqueFiles = Array.from(new Set(files))

  const stats = await Promise.all([
    fs.stat(profilePath),
    ...uniqueFiles.map((file) => fs.stat(path.join(CHATBOT_DATA_PATH, file))),
  ])

  const signature = JSON.stringify(
    stats.map((stat, index) => ({
      file: index === 0 ? PUBLIC_PROFILE_FILE : uniqueFiles[index - 1],
      mtimeMs: stat.mtimeMs,
    })),
  )

  if (contextCache && contextCache.signature === signature) {
    return contextCache.content
  }

  let contextContent = ""
  contextContent += `${await readMarkdownFile(profile.general_summary_file)}\n\n`

  for (const fileMeta of profile.context_files_list) {
    if (fileMeta.file === profile.general_summary_file) continue
    contextContent += `## ${fileMeta.title}\n`
    contextContent += `${await readMarkdownFile(fileMeta.file)}\n\n`
  }

  contextCache = {
    signature,
    content: contextContent,
  }

  return contextContent
}
