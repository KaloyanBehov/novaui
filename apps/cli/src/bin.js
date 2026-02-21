#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import pc from 'picocolors';

// ─── Module imports ──────────────────────────────────────────────────────────

import { getThemeCssContent } from './themes/index.js';
import { add, pickComponentsInteractively } from './commands/add.js';
import { ASCII_BANNER, askTheme, init } from './commands/init.js';
import { CONFIG_FILENAME, DEFAULT_CONFIG, DEFAULT_THEME_CSS, UTILS_CONTENT } from './constants.js';
import { loadConfig, writeConfig } from './utils/config.js';
import { detectPackageManager, getInstallHint, getMissingDeps } from './utils/deps.js';
import { fetchWithTimeout, formatError } from './utils/fetch.js';
import { ensureDir, writeIfNotExists } from './utils/fs-helpers.js';
import { getTailwindConfigContent } from './utils/tailwind.js';
import { assertValidComponentConfig } from './utils/validate.js';
import { getCliVersion } from './utils/version.js';
import { checkForUpdates } from './utils/version-check.js';

// ─── Derived constants ───────────────────────────────────────────────────────

// Export default theme CSS for backward compatibility (tests)
export const GLOBAL_CSS_CONTENT = DEFAULT_THEME_CSS;

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
  getMissingDeps,
  getTailwindConfigContent,
  getThemeCssContent,
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
    return process.argv[1].endsWith('/bin.js');
  }
})();

if (isDirectRun) {
  const program = new Command();

  program
    .name('novaui')
    .description('NovaUI – React Native + NativeWind UI component library')
    .version(getCliVersion(), '-v, --version', 'Show CLI version')
    .addHelpText('beforeAll', ASCII_BANNER)
    .hook('preAction', async () => {
      await checkForUpdates().catch(() => {});
    });

  // ─── init ─────────────────────────────────────────────────────────────────

  program
    .command('init')
    .description('Set up NovaUI (config, Tailwind, global.css, utils)')
    .option('-y, --yes', 'Skip prompts and use default configuration')
    .action(async (options) => {
      try {
        await init({ yes: options.yes });
      } catch (error) {
        console.error('');
        console.error(pc.red(`  ✗  Error: ${formatError(error)}`));
        process.exit(1);
      }
    });

  // ─── add ──────────────────────────────────────────────────────────────────

  program
    .command('add [components...]')
    .description('Add one or more components (e.g. button card input)')
    .option('--force', 'Overwrite existing component files')
    .action(async (components, options) => {
      const force = options.force || false;
      try {
        if (components.length === 0) {
          if (process.stdin.isTTY !== true) {
            throw new Error('Missing component name. Usage: novaui add <component-name>');
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
        console.error('');
        console.error(pc.red(`  ✗  Error: ${formatError(error)}`));
        process.exit(1);
      }
    });

  // ─── Default: show help when no command given ─────────────────────────────

  program.action(() => {
    program.help();
  });

  program.parseAsync(process.argv).catch((error) => {
    console.error('');
    console.error(pc.red(`  ✗  Error: ${formatError(error)}`));
    process.exit(1);
  });
}
