import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const APP_ROOT = process.cwd();
const configPath = path.join(APP_ROOT, "vaults.config.json");
const destinationRoot = path.join(APP_ROOT, "content");

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listMarkdownFiles(sourcePath) {
  const stats = await fs.stat(sourcePath);

  if (stats.isFile()) {
    return [sourcePath];
  }

  const entries = await fs.readdir(sourcePath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      if (entry.name.startsWith(".") || entry.name === "node_modules") {
        return [];
      }

      const absolute = path.join(sourcePath, entry.name);
      if (entry.isDirectory()) {
        return listMarkdownFiles(absolute);
      }

      if (!entry.name.endsWith(".md") && !entry.name.endsWith(".mdx")) {
        return [];
      }

      return [absolute];
    })
  );

  return files.flat();
}

function extractFrontmatter(rawContents) {
  const frontmatterMatch = rawContents.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
  if (!frontmatterMatch) return null;

  return {
    fullBlock: frontmatterMatch[0],
    content: frontmatterMatch[1],
  };
}

function hasBooleanFrontmatter(frontmatter, field) {
  const pattern = new RegExp(`^${field}:\\s*(?:true|"true"|'true')\\s*$`, "m");
  return pattern.test(frontmatter);
}

function hasDateFrontmatter(frontmatter) {
  return /^date:\s*["']?[^"'\n]+["']?\s*$/m.test(frontmatter);
}

function hasCreatedFrontmatter(frontmatter) {
  return /^created:\s*["']?[^"'\n]+["']?\s*$/m.test(frontmatter);
}

function getFrontmatterField(frontmatter, field) {
  const pattern = new RegExp(`^${field}:\\s*(.+)\\s*$`, "m");
  const match = frontmatter.match(pattern);
  if (!match) return null;
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function parseDateValue(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function formatDate(date) {
  return date.toISOString();
}

function ensureTemporalFrontmatter(rawContents, fileStats) {
  const parsed = extractFrontmatter(rawContents);
  if (!parsed) return rawContents;

  const normalizedFrontmatter = parsed.content.replace(/\s*$/, "");
  const frontmatterLines = [normalizedFrontmatter];

  const hasDate = hasDateFrontmatter(parsed.content);
  const hasCreated = hasCreatedFrontmatter(parsed.content);
  const createdDate =
    parseDateValue(getFrontmatterField(parsed.content, "created")) ?? fileStats.ctime;

  // Priority: date > created > original source ctime.
  if (!hasDate) {
    const preferredDate =
      parseDateValue(getFrontmatterField(parsed.content, "created")) ?? fileStats.ctime;
    frontmatterLines.push(`date: "${formatDate(preferredDate)}"`);
  }

  // Preserve original source file ctime metadata when created is missing.
  if (!hasCreated) {
    frontmatterLines.push(`created: "${formatDate(createdDate)}"`);
  }

  const updatedFrontmatter = `---\n${frontmatterLines.filter(Boolean).join("\n")}\n---\n`;
  return rawContents.replace(parsed.fullBlock, updatedFrontmatter);
}

function expandHome(filePath) {
  if (filePath.startsWith("~/")) {
    return path.join(os.homedir(), filePath.slice(2));
  }

  return filePath;
}

async function copyMarkdownFiles(vaultName, sourceRoot) {
  const files = await listMarkdownFiles(sourceRoot);

  await Promise.all(
    files.map(async (filePath) => {
      const fileContents = await fs.readFile(filePath, "utf-8");
      const parsed = extractFrontmatter(fileContents);
      if (!parsed || !hasBooleanFrontmatter(parsed.content, "publish")) {
        return;
      }

      const fileStats = await fs.stat(filePath);
      const syncedContents = ensureTemporalFrontmatter(fileContents, fileStats);
      const relativeToRoot = path.relative(sourceRoot, filePath);
      const destination = path.join(destinationRoot, vaultName, relativeToRoot);

      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, syncedContents, "utf-8");
      console.log(`copied ${vaultName}/${relativeToRoot}`);
    })
  );
}

async function main() {
  if (!(await exists(configPath))) {
    console.error("Missing vaults.config.json. Copy vaults.config.example.json and update your paths.");
    process.exit(1);
  }

  const rawConfig = await fs.readFile(configPath, "utf-8");
  const config = JSON.parse(rawConfig);

  if (!Array.isArray(config.sources)) {
    console.error("Invalid config: `sources` must be an array.");
    process.exit(1);
  }

  await fs.mkdir(destinationRoot, { recursive: true });

  for (const source of config.sources) {
    if (!source.name || !source.path) {
      console.error("Each source must include `name` and `path`.");
      process.exit(1);
    }

    const sourceRoot = path.resolve(expandHome(source.path));
    if (!(await exists(sourceRoot))) {
      console.warn(
        `warning: skipping source "${source.name}" because path does not exist: ${sourceRoot}`
      );
      continue;
    }

    const vaultDestination = path.join(destinationRoot, source.name);
    // Keep destination mirrored with current vault state by removing stale synced files first.
    await fs.rm(vaultDestination, { recursive: true, force: true });
    await copyMarkdownFiles(source.name, sourceRoot);
  }

  console.log("Vault sync completed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
