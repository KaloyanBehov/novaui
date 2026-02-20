export const BASE_URL = 'https://raw.githubusercontent.com/KaloyanBehov/novaui/main';

export const CONFIG_FILENAME = 'components.json';

export const FETCH_TIMEOUT_MS = 15000;

export const DEFAULT_CONFIG = {
  globalCss: 'global.css',
  componentsUi: 'components/ui',
  lib: 'lib',
  theme: 'default',
};

export const UTILS_CONTENT = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

export const BABEL_CONFIG_CONTENT = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
`;

export const METRO_CONFIG_CONTENT = (globalCssPath) => `const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: './${globalCssPath}' })
`;
