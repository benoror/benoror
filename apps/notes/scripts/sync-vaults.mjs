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

function hasPublishFrontmatter(rawContents) {
  const frontmatterMatch = rawContents.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return false;
  }

  return /^publish:\s*true\s*$/m.test(frontmatterMatch[1]);
}

function expandHome(filePath) {
  if (filePath.startsWith("~/")) {
    return path.join(os.homedir(), filePath.slice(2));
  }

  return filePath;
}

async function copyMarkdownFiles(vaultName, sourceRoot, entryPath) {
  const absoluteEntryPath = path.resolve(sourceRoot, entryPath);
  const files = await listMarkdownFiles(absoluteEntryPath);

  await Promise.all(
    files.map(async (filePath) => {
      const fileContents = await fs.readFile(filePath, "utf-8");
      if (!hasPublishFrontmatter(fileContents)) {
        return;
      }

      const relativeToRoot = path.relative(sourceRoot, filePath);
      const destination = path.join(destinationRoot, vaultName, relativeToRoot);

      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, fileContents, "utf-8");
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
    if (!source.name || !source.path || !Array.isArray(source.entries)) {
      console.error("Each source must include `name`, `path`, and an `entries` array.");
      process.exit(1);
    }

    const sourceRoot = path.resolve(expandHome(source.path));
    for (const entryPath of source.entries) {
      await copyMarkdownFiles(source.name, sourceRoot, entryPath);
    }
  }

  console.log("Vault sync completed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
