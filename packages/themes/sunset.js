export const SUNSET_THEME_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* ─────────────────────────────────────────────────────────────
   * SUNSET LIGHT — "Golden Hour"
   * ─────────────────────────────────────────────────────────── */
  :root,
  .light,
  [data-theme='sunset'] {
    color-scheme: light;

    /* ─── Surfaces ──────────────────────────────────────────── */
    /* Warm parchment whites */
    --background: 32 40% 99%;
    --foreground: 20 30% 12%;

    --surface: 32 30% 96%;
    --surface-2: 32 25% 92%;
    --surface-3: 32 20% 88%;

    --card: 0 0% 100%;
    --card-foreground: 20 30% 12%;

    --popover: 0 0% 100%;
    --popover-foreground: 20 30% 12%;

    /* ─── Interactive ───────────────────────────────────────── */
    /* Vibrant Terracotta */
    --primary: 18 85% 52%;
    --primary-foreground: 32 40% 99%;

    --secondary: 35 90% 94%;
    --secondary-foreground: 18 70% 30%;

    --accent: 42 100% 94%;
    --accent-foreground: 18 85% 45%;

    /* ─── Muted ─────────────────────────────────────────────── */
    --muted: 32 20% 94%;
    --muted-foreground: 20 15% 45%;

    /* ─── Feedback ──────────────────────────────────────────── */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --destructive-subtle: 0 100% 97%;

    --success: 142 70% 35%;
    --success-foreground: 0 0% 98%;
    --success-subtle: 142 60% 94%;

    --warning: 35 100% 50%;
    --warning-foreground: 0 0% 98%;
    --warning-subtle: 45 100% 94%;

    --info: 210 90% 50%;
    --info-foreground: 0 0% 98%;
    --info-subtle: 210 90% 95%;

    /* ─── Overlay ───────────────────────────────────────────── */
    --overlay: 20 30% 12%;
    --overlay-opacity: 0.4;
    --overlay-strong-opacity: 0.75;

    /* ─── Borders & Inputs ──────────────────────────────────── */
    --border: 32 20% 88%;
    --border-strong: 32 25% 80%;
    --input: 32 20% 88%;
    --ring: 18 85% 52%;

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
   * SUNSET DARK — "Deep Twilight"
   * ─────────────────────────────────────────────────────────── */
  .dark,
  [data-theme='sunset-dark'],
  [data-theme='dark'][data-theme='sunset'] {
    color-scheme: dark;

    /* ─── Surfaces ──────────────────────────────────────────── */
    /* Deep Dusk Purples */
    --background: 265 30% 7%;
    --foreground: 35 40% 98%;

    --surface: 265 30% 10%;
    --surface-2: 265 25% 13%;
    --surface-3: 265 20% 18%;

    --card: 265 30% 7%;
    --card-foreground: 35 40% 98%;

    --popover: 265 30% 7%;
    --popover-foreground: 35 40% 98%;

    /* ─── Interactive ───────────────────────────────────────── */
    /* Neon Sunset Glow */
    --primary: 22 95% 66%;
    --primary-foreground: 265 30% 7%;

    --secondary: 265 20% 16%;
    --secondary-foreground: 22 90% 85%;

    --accent: 280 40% 18%;
    --accent-foreground: 22 95% 75%;

    /* ─── Muted ─────────────────────────────────────────────── */
    --muted: 265 20% 16%;
    --muted-foreground: 265 10% 65%;

    /* ─── Feedback ──────────────────────────────────────────── */
    --destructive: 0 75% 55%;
    --destructive-foreground: 0 0% 98%;
    --destructive-subtle: 0 70% 15%;

    --success: 145 60% 45%;
    --success-foreground: 0 0% 98%;
    --success-subtle: 145 60% 12%;

    --warning: 35 90% 55%;
    --warning-foreground: 265 30% 7%;
    --warning-subtle: 35 90% 15%;

    --info: 210 85% 65%;
    --info-foreground: 265 30% 7%;
    --info-subtle: 210 85% 15%;

    /* ─── Overlay ───────────────────────────────────────────── */
    --overlay: 265 40% 4%;
    --overlay-opacity: 0.7;
    --overlay-strong-opacity: 0.9;

    /* ─── Borders & Inputs ──────────────────────────────────── */
    --border: 265 20% 18%;
    --border-strong: 265 20% 28%;
    --input: 265 20% 18%;
    --ring: 22 95% 66%;
  }
}
`;
