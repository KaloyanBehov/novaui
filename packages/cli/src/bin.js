#!/usr/bin/env node

import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import pc from "picocolors";

// ─── Module imports ──────────────────────────────────────────────────────────

import { DEFAULT_CONFIG, UTILS_CONTENT, CONFIG_FILENAME } from "./constants.js";
import { ensureDir, writeIfNotExists } from "./utils/fs-helpers.js";
import { loadConfig, writeConfig } from "./utils/config.js";
import {
  detectPackageManager,
  installPackages,
  getInstallHint,
  getMissingDeps,
} from "./utils/deps.js";
import { fetchWithTimeout, formatError } from "./utils/fetch.js";
import { getCliVersion } from "./utils/version.js";
import { getTailwindConfigContent } from "./utils/tailwind.js";
import { assertValidComponentConfig } from "./utils/validate.js";
import { init, askTheme, ASCII_BANNER } from "./commands/init.js";
import { add, pickComponentsInteractively } from "./commands/add.js";
import { getThemeCssContent } from "../../themes/index.js";

// ─── Derived constants ───────────────────────────────────────────────────────

export const GLOBAL_CSS_CONTENT = getThemeCssContent(DEFAULT_CONFIG.theme);

// ─── Re-exports (backward compatibility for tests) ───────────────────────────

export {
  add,
  askTheme,
  assertValidComponentConfig,
  CONFIG_FILENAME,
  DEFAULT_CONFIG,
  detectPackageManager,
  ensureDir,
  fetchWithTimeout,
  formatError,
  getCliVersion,
  getInstallHint,
  getThemeCssContent,
  getMissingDeps,
  getTailwindConfigContent,
  init,
  loadConfig,
  UTILS_CONTENT,
  writeConfig,
  writeIfNotExists,
};

// ─── CLI entry point ─────────────────────────────────────────────────────────

const isDirectRun = (() => {
  if (!process.argv[1]) return false;
  try {
    return fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
  } catch {
    return process.argv[1].endsWith("/bin.js");
  }
})();

if (isDirectRun) {
  const program = new Command();

  program
    .name("novaui")
    .description("NovaUI – React Native + NativeWind UI component library")
    .version(getCliVersion(), "-v, --version", "Show CLI version")
    .addHelpText("beforeAll", ASCII_BANNER);

  // ─── init ─────────────────────────────────────────────────────────────────

  program
    .command("init")
    .description("Set up NovaUI (config, Tailwind, global.css, utils)")
    .option("-y, --yes", "Skip prompts and use default configuration")
    .action(async (options) => {
      try {
        await init({ yes: options.yes });
      } catch (error) {
        console.error("");
        console.error(pc.red(`  ✗  Error: ${formatError(error)}`));
        process.exit(1);
      }
    });

  // ─── add ──────────────────────────────────────────────────────────────────

  program
    .command("add [components...]")
    .description("Add one or more components (e.g. button card input)")
    .option("--force", "Overwrite existing component files")
    .action(async (components, options) => {
      const force = options.force || false;
      try {
        if (components.length === 0) {
          if (process.stdin.isTTY !== true) {
            throw new Error(
              "Missing component name. Usage: novaui add <component-name>",
            );
          }
          // Interactive multi-select when no component names given
          const selected = await pickComponentsInteractively();
          for (const name of selected) {
            await add(name, { force });
          }
        } else {
          // Support batch: novaui add button card input
          for (const name of components) {
            await add(name, { force });
          }
        }
      } catch (error) {
        console.error("");
        console.error(pc.red(`  ✗  Error: ${formatError(error)}`));
        process.exit(1);
      }
    });

  // ─── Default: show help when no command given ─────────────────────────────

  program.action(() => {
    program.help();
  });

  program.parseAsync(process.argv).catch((error) => {
    console.error("");
    console.error(pc.red(`  ✗  Error: ${formatError(error)}`));
    process.exit(1);
  });
}
