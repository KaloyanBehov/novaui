export const SUNSET_THEME_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 24 100% 98%;
    --foreground: 12 30% 18%;
    --card: 0 0% 100%;
    --card-foreground: 12 30% 18%;
    --popover: 0 0% 100%;
    --popover-foreground: 12 30% 18%;
    --primary: 18 95% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 22 78% 92%;
    --secondary-foreground: 16 32% 26%;
    --muted: 22 78% 92%;
    --muted-foreground: 18 20% 46%;
    --accent: 340 84% 93%;
    --accent-foreground: 336 32% 28%;
    --destructive: 0 73% 54%;
    --destructive-foreground: 0 0% 100%;
    --border: 20 58% 84%;
    --input: 20 58% 84%;
    --ring: 18 95% 53%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 16 46% 12%;
    --foreground: 24 60% 95%;
    --card: 15 42% 16%;
    --card-foreground: 24 60% 95%;
    --popover: 15 42% 16%;
    --popover-foreground: 24 60% 95%;
    --primary: 24 100% 64%;
    --primary-foreground: 16 46% 12%;
    --secondary: 11 28% 24%;
    --secondary-foreground: 24 60% 95%;
    --muted: 11 28% 24%;
    --muted-foreground: 20 24% 72%;
    --accent: 332 42% 30%;
    --accent-foreground: 24 60% 95%;
    --destructive: 0 62% 45%;
    --destructive-foreground: 0 0% 100%;
    --border: 14 24% 28%;
    --input: 14 24% 28%;
    --ring: 24 100% 64%;
  }
}
`
