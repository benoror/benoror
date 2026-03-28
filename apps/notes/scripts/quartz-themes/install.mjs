import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const ACTION_URL = "https://raw.githubusercontent.com/saberzero1/quartz-themes/master/action.sh";
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..", "..");
const cacheDir = path.join(scriptDir, ".cache");
const actionScriptPath = path.join(cacheDir, "action.sh");

async function downloadActionScript() {
  await fs.mkdir(cacheDir, { recursive: true });

  const response = await fetch(ACTION_URL);
  if (!response.ok) {
    throw new Error(`Failed to download quartz-themes action.sh (${response.status})`);
  }

  const scriptContents = await response.text();
  await fs.writeFile(actionScriptPath, scriptContents, "utf8");
  await fs.chmod(actionScriptPath, 0o755);
}

function runActionScript(themeArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn("bash", [actionScriptPath, ...themeArgs], {
      cwd: appRoot,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`quartz-themes installer exited with code ${code ?? "unknown"}`));
    });
  });
}

async function main() {
  const themeArgs = process.argv.slice(2).filter((arg) => arg !== "--");
  if (themeArgs.length === 0) {
    console.error('Usage: pnpm --filter notes theme:install -- "<theme-name>"');
    process.exit(1);
  }

  await downloadActionScript();
  await runActionScript(themeArgs);

  const installedThemePath = path.join(appRoot, "quartz", "styles", "themes", "_index.scss");
  const installedThemeExists = await fs
    .access(installedThemePath)
    .then(() => true)
    .catch(() => false);

  if (!installedThemeExists) {
    throw new Error(
      `Theme install did not produce ${installedThemePath}. Check installer output for failures.`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
