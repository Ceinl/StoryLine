import { spawn } from "node:child_process";
import { existsSync, watch } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const watchedDirs = ["client", "server", "shared"];
const debounceMs = 900;

let timer;
let deploying = false;
let pending = false;

function deploy(reason) {
  if (deploying) {
    pending = true;
    return;
  }

  deploying = true;
  pending = false;
  console.log(`[auto-deploy] deploying (${reason})`);

  const child = spawn("npx", ["lakebed", "deploy"], {
    cwd: root,
    stdio: "inherit"
  });

  child.on("exit", (code) => {
    deploying = false;
    if (code !== 0) {
      console.error(`[auto-deploy] deploy failed with exit code ${code}`);
    }
    if (pending) {
      deploy("queued changes");
    }
  });
}

function schedule(reason) {
  clearTimeout(timer);
  timer = setTimeout(() => deploy(reason), debounceMs);
}

for (const dir of watchedDirs) {
  const fullPath = join(root, dir);
  if (!existsSync(fullPath)) {
    continue;
  }

  watch(fullPath, { recursive: true }, (_eventType, filename) => {
    if (!filename || filename.includes(".DS_Store")) {
      return;
    }
    schedule(`${dir}/${filename}`);
  });
}

console.log(`[auto-deploy] watching ${watchedDirs.join(", ")}`);
deploy("startup");
