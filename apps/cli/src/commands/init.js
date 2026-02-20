import path from "node:path";
import {
  text,
  select,
  confirm,
  isCancel,
  cancel,
  intro,
  outro,
} from "@clack/prompts";
import pc from "picocolors";

import { THEME_KEYS, getThemeCssContent } from "@novaui/themes";
import { DEFAULT_CONFIG, UTILS_CONTENT } from "../constants.js";
import { loadConfig, writeConfig } from "../utils/config.js";
import { ensureDir, writeIfNotExists } from "../utils/fs-helpers.js";
import {
  getMissingDeps,
  installPackages,
  getInstallHint,
} from "../utils/deps.js";
import { getTailwindConfigContent } from "../utils/tailwind.js";

// ─── ASCII Banner ────────────────────────────────────────────────────────────

export const ASCII_BANNER = `
${pc.cyan(" ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗     ██╗   ██╗██╗")}
${pc.cyan(" ████╗  ██║██╔═══██╗██║   ██║██╔══██╗    ██║   ██║██║")}
${pc.cyan(" ██╔██╗ ██║██║   ██║██║   ██║███████║    ██║   ██║██║")}
${pc.cyan(" ██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║    ██║   ██║██║")}
${pc.cyan(" ██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║    ╚██████╔╝██║")}
${pc.cyan(" ╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝     ╚═════╝ ╚═╝")}
${pc.dim("           React Native + NativeWind UI")}
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeTheme(themeName) {
  if (typeof themeName !== "string" || themeName.trim() === "")
    return DEFAULT_CONFIG.theme;
  const normalized = themeName.trim().toLowerCase();
  if (!THEME_KEYS.includes(normalized)) return DEFAULT_CONFIG.theme;
  return normalized;
}

/** Prompt for a theme selection; returns default immediately in non-TTY mode. */
export async function askTheme(defaultTheme = DEFAULT_CONFIG.theme) {
  const normalizedDefault = normalizeTheme(defaultTheme);
  if (process.stdin.isTTY !== true) return normalizedDefault;

  const theme = await select({
    message: "Select a theme",
    options: THEME_KEYS.map((k) => ({ value: k, label: k })),
    initialValue: normalizedDefault,
  });

  if (isCancel(theme)) {
    cancel("Setup cancelled.");
    process.exit(0);
  }

  return theme;
}

// ─── init command ─────────────────────────────────────────────────────────────

/**
 * @param {object} [options]
 * @param {boolean} [options.yes]  Skip all prompts and use defaults (--yes flag)
 */
export async function init(options = {}) {
  const { yes = false } = options;
  const cwd = process.cwd();
  const existingConfig = loadConfig(cwd);
  const isInteractive = process.stdin.isTTY === true && !yes;

  console.log(ASCII_BANNER);

  if (isInteractive) {
    intro(pc.bold("Welcome to NovaUI"));
    console.log(pc.dim("   Let's set up your project in a few steps."));
    console.log("");
  } else {
    console.log(pc.bold("   Welcome to NovaUI"));
    console.log(pc.dim("   Let's set up your project in a few steps."));
    console.log("");
  }

  let config;

  if (existingConfig) {
    console.log(pc.blue("   ⚙  Config"));
    console.log(pc.dim("   components.json found in this directory."));
    console.log("");

    let reconfigure = false;

    if (isInteractive) {
      const answer = await confirm({ message: "Re-configure paths?" });
      if (isCancel(answer)) {
        cancel("Setup cancelled.");
        process.exit(0);
      }
      reconfigure = answer === true;
    }

    if (reconfigure) {
      const globalCss = await text({
        message: "Where should global.css be placed?",
        placeholder: DEFAULT_CONFIG.globalCss,
        defaultValue: existingConfig.globalCss || DEFAULT_CONFIG.globalCss,
      });
      if (isCancel(globalCss)) {
        cancel("Setup cancelled.");
        process.exit(0);
      }

      const componentsUi = await text({
        message: "Where should UI components be placed?",
        placeholder: DEFAULT_CONFIG.componentsUi,
        defaultValue:
          existingConfig.componentsUi || DEFAULT_CONFIG.componentsUi,
      });
      if (isCancel(componentsUi)) {
        cancel("Setup cancelled.");
        process.exit(0);
      }

      const lib = await text({
        message: "Where should lib (e.g. utils) be placed?",
        placeholder: DEFAULT_CONFIG.lib,
        defaultValue: existingConfig.lib || DEFAULT_CONFIG.lib,
      });
      if (isCancel(lib)) {
        cancel("Setup cancelled.");
        process.exit(0);
      }

      const theme = await askTheme(existingConfig.theme);

      config = {
        globalCss: globalCss.replace(/\\/g, "/"),
        componentsUi: componentsUi.replace(/\\/g, "/"),
        lib: lib.replace(/\\/g, "/"),
        theme,
      };
      writeConfig(cwd, config);
      console.log("");
      console.log(pc.green("   ✓  Updated components.json"));
    } else {
      config = existingConfig;
    }
  } else {
    console.log(pc.blue("   ⚙  Configure paths"));
    console.log(
      pc.dim("   Where should NovaUI put its files? Press Enter for defaults."),
    );
    console.log("");

    if (isInteractive) {
      const globalCss = await text({
        message: "Path for global.css?",
        placeholder: DEFAULT_CONFIG.globalCss,
        defaultValue: DEFAULT_CONFIG.globalCss,
      });
      if (isCancel(globalCss)) {
        cancel("Setup cancelled.");
        process.exit(0);
      }

      const componentsUi = await text({
        message: "Path for UI components?",
        placeholder: DEFAULT_CONFIG.componentsUi,
        defaultValue: DEFAULT_CONFIG.componentsUi,
      });
      if (isCancel(componentsUi)) {
        cancel("Setup cancelled.");
        process.exit(0);
      }

      const lib = await text({
        message: "Path for lib (utils)?",
        placeholder: DEFAULT_CONFIG.lib,
        defaultValue: DEFAULT_CONFIG.lib,
      });
      if (isCancel(lib)) {
        cancel("Setup cancelled.");
        process.exit(0);
      }

      const theme = await askTheme();

      config = {
        globalCss: globalCss.replace(/\\/g, "/"),
        componentsUi: componentsUi.replace(/\\/g, "/"),
        lib: lib.replace(/\\/g, "/"),
        theme,
      };
    } else {
      config = { ...DEFAULT_CONFIG };
    }

    writeConfig(cwd, config);
    console.log(pc.green("   ✓  Created components.json"));
  }

  // ─── Setup files ────────────────────────────────────────────────────────────

  console.log("");
  console.log(pc.blue("   📁 Setting up project"));
  console.log("");

  const utilsDir = path.join(cwd, config.lib);
  ensureDir(utilsDir);
  const utilsPath = path.join(utilsDir, "utils.ts");
  writeIfNotExists(utilsPath, UTILS_CONTENT, `${config.lib}/utils.ts`);

  const globalCssDir = path.dirname(path.join(cwd, config.globalCss));
  ensureDir(globalCssDir);
  const themeCssContent = getThemeCssContent(normalizeTheme(config.theme));
  writeIfNotExists(
    path.join(cwd, config.globalCss),
    themeCssContent,
    config.globalCss,
  );

  const tailwindContent = getTailwindConfigContent(config);
  writeIfNotExists(
    path.join(cwd, "tailwind.config.js"),
    tailwindContent,
    "tailwind.config.js",
  );

  // ─── Dependencies ──────────────────────────────────────────────────────────

  const deps = [
    "nativewind",
    "tailwindcss",
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
  ];
  const missingDeps = getMissingDeps(cwd, deps);

  console.log("");
  console.log(pc.blue("   📦 Dependencies"));
  console.log("");

  if (missingDeps.length === 0) {
    console.log(
      pc.dim(
        "   ✓  All required packages already in package.json, skipping install.",
      ),
    );
  } else {
    console.log(pc.dim(`   Installing: ${missingDeps.join(", ")}`));
    console.log("");
    try {
      installPackages(missingDeps);
    } catch {
      console.error("");
      console.error(pc.yellow("   ✗  Install failed. Run manually:"));
      console.error(pc.dim(`     ${getInstallHint(missingDeps)}`));
    }
  }

  // ─── Success ────────────────────────────────────────────────────────────────

  console.log("");
  console.log(pc.green("   ┌─────────────────────────────────────────┐"));
  console.log(pc.green("   │  ✓  NovaUI is ready!                     │"));
  console.log(pc.green("   └─────────────────────────────────────────┘"));
  console.log("");
  console.log(pc.bold("   Next steps:"));
  console.log("");
  console.log(
    pc.dim("   1. Import global CSS in your root entry (e.g. App.tsx):"),
  );
  console.log(pc.cyan(`      import "${config.globalCss}"`));
  console.log("");
  console.log(pc.dim("   2. Add components:"));
  console.log(pc.cyan("      npx novaui-cli@latest add button"));
  console.log(pc.cyan("      npx novaui-cli@latest add card"));
  console.log("");

  if (isInteractive) {
    outro(pc.green("Setup complete!"));
  }
}
