/**
 * NovaUI Tailwind CSS preset
 *
 * Usage in your tailwind.config.js:
 *
 *   const novaui = require("@novaui/components/tailwind")
 *
 *   module.exports = {
 *     presets: [require("nativewind/preset"), novaui],
 *     content: [
 *       "./App.{js,jsx,ts,tsx}",
 *       "./src/**\/*.{js,jsx,ts,tsx}",
 *       "./node_modules/@novaui/components/src/**\/*.{js,jsx,ts,tsx}",
 *     ],
 *     // ...
 *   }
 */

import type { Config } from "tailwindcss"

const novaUIPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}

export default novaUIPreset
