import { spawn } from "node:child_process";
import process from "node:process";

const majorNodeVersion = Number(process.versions.node.split(".")[0]);

if (majorNodeVersion < 22) {
  console.error(
    `Quartz requires Node 22+. Current Node version is ${process.versions.node}.`
  );
  console.error("Please switch Node version (e.g. via asdf/nvm) and rerun.");
  process.exit(1);
}

if (majorNodeVersion >= 24) {
  console.error(
    `Quartz v4.5.2 is currently not compatible with Node ${process.versions.node}.`
  );
  console.error(
    "Use Node 22.x for the notes app (e.g. `asdf shell nodejs 22.17.1`) and rerun."
  );
  process.exit(1);
}

const child = spawn(
  "node",
  ["./quartz/bootstrap-cli.mjs", ...process.argv.slice(2)],
  { stdio: "inherit", shell: true }
);

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
