import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/index.ts",
    tailwind: "tailwind.ts",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: [
    "react",
    "react-native",
    "nativewind",
    "tailwindcss",
    "expo-linear-gradient",
    "expo-system-ui",
    "react-native-gesture-handler",
    "react-native-reanimated",
    "react-native-worklets",
    "react-native-gifted-charts",
  ],
  dts: true,
  ...options,
}))
