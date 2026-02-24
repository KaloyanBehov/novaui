export const OCEAN_THEME_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* ─────────────────────────────────────────────────────────────
   * OCEAN LIGHT — "High Tide"
   * ─────────────────────────────────────────────────────────── */
  :root,
  .light,
  [data-theme='ocean'] {
    color-scheme: light;

    /* ─── Surfaces ──────────────────────────────────────────── */
    /* Cool, crisp whites with a hint of blue */
    --background: 210 40% 99%;
    --foreground: 222 47% 11%;

    --surface: 210 30% 96%;
    --surface-2: 210 25% 92%;
    --surface-3: 210 20% 88%;

    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    /* ─── Interactive ───────────────────────────────────────── */
    /* Deep Pacific Blue */
    --primary: 221 83% 45%;
    --primary-foreground: 210 40% 99%;

    /* Soft Aqua / Glassy look */
    --secondary: 199 89% 94%;
    --secondary-foreground: 221 83% 25%;

    --accent: 190 90% 92%;
    --accent-foreground: 199 89% 30%;

    /* ─── Muted ─────────────────────────────────────────────── */
    --muted: 210 20% 94%;
    --muted-foreground: 215 16% 47%;

    /* ─── Feedback ──────────────────────────────────────────── */
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --destructive-subtle: 0 100% 97%;

    --success: 160 84% 33%;
    --success-foreground: 0 0% 98%;
    --success-subtle: 160 84% 94%;

    --warning: 45 93% 47%;
    --warning-foreground: 0 0% 98%;
    --warning-subtle: 45 93% 94%;

    --info: 199 89% 48%;
    --info-foreground: 0 0% 98%;
    --info-subtle: 199 89% 94%;

    /* ─── Overlay ───────────────────────────────────────────── */
    --overlay: 222 47% 11%;
    --overlay-opacity: 0.45;
    --overlay-strong-opacity: 0.8;

    /* ─── Borders & Inputs ──────────────────────────────────── */
    --border: 214 32% 91%;
    --border-strong: 214 32% 80%;
    --input: 214 32% 91%;
    --ring: 221 83% 45%;

    /* ─── Radius ────────────────────────────────────────────── */
    --radius-xs: 0.25rem;
    --radius-sm: 0.375rem;
    --radius: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.25rem;
    --radius-full: 9999px;
  }

  /* ─────────────────────────────────────────────────────────────
   * OCEAN DARK — "Abyss"
   * ─────────────────────────────────────────────────────────── */
  .dark,
  [data-theme='ocean-dark'],
  [data-theme='dark'][data-theme='ocean'] {
    color-scheme: dark;

    /* ─── Surfaces ──────────────────────────────────────────── */
    /* Deep Midnight Navy */
    --background: 222 47% 4%;
    --foreground: 210 40% 98%;

    --surface: 222 47% 7%;
    --surface-2: 222 40% 10%;
    --surface-3: 222 35% 15%;

    --card: 222 47% 5%;
    --card-foreground: 210 40% 98%;

    --popover: 222 47% 5%;
    --popover-foreground: 210 40% 98%;

    /* ─── Interactive ───────────────────────────────────────── */
    /* Neon Cyan / Bioluminescent Blue */
    --primary: 191 91% 60%;
    --primary-foreground: 222 47% 4%;

    --secondary: 222 30% 15%;
    --secondary-foreground: 191 91% 90%;

    --accent: 210 40% 18%;
    --accent-foreground: 191 91% 80%;

    /* ─── Muted ─────────────────────────────────────────────── */
    --muted: 222 30% 15%;
    --muted-foreground: 215 20% 65%;

    /* ─── Feedback ──────────────────────────────────────────── */
    --destructive: 0 70% 55%;
    --destructive-foreground: 0 0% 98%;
    --destructive-subtle: 0 70% 15%;

    --success: 160 60% 45%;
    --success-foreground: 0 0% 98%;
    --success-subtle: 160 60% 12%;

    /* ─── Borders & Inputs ──────────────────────────────────── */
    --border: 222 30% 15%;
    --border-strong: 222 30% 25%;
    --input: 222 30% 15%;
    --ring: 191 91% 60%;
  }
}
`;
