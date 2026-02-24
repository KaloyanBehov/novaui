export const DEFAULT_THEME_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root,
  .light,
  [data-theme='light'] {
    color-scheme: light;

    /* ─── Surfaces ──────────────────────────────────────────── */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    --surface: 0 0% 98%;
    --surface-2: 240 4.8% 95.9%;
    --surface-3: 240 5.9% 90%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    /* ─── Interactive ───────────────────────────────────────── */
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;

    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    /* ─── Muted ─────────────────────────────────────────────── */
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;

    /* ─── Feedback ──────────────────────────────────────────── */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --destructive-subtle: 0 84% 95%;

    --success: 142 76% 36%;
    --success-foreground: 0 0% 98%;
    --success-subtle: 142 52% 93%;

    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 98%;
    --warning-subtle: 38 92% 93%;

    --info: 221 83% 53%;
    --info-foreground: 0 0% 98%;
    --info-subtle: 221 83% 94%;

    /* ─── Overlay ───────────────────────────────────────────── */
    --overlay: 240 10% 3.9%;
    --overlay-opacity: 0.5;
    --overlay-strong-opacity: 0.8;

    /* ─── Borders & Inputs ──────────────────────────────────── */
    --border: 240 5.9% 90%;
    --border-strong: 240 5.9% 78%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;

    /* ─── Radius ────────────────────────────────────────────── */
    /* Reference only — actual values in tailwind.config.js     */
    --radius-xs: 0.25rem;
    --radius-sm: 0.375rem;
    --radius: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.25rem;
    --radius-full: 9999px;
  }

  /* ─────────────────────────────────────────────────────────────
   * DARK THEME — shadcn-style zinc dark
   * ─────────────────────────────────────────────────────────── */
  .dark,
  [data-theme='dark'] {
    color-scheme: dark;

    /* ─── Surfaces ──────────────────────────────────────────── */
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --surface: 240 10% 6%;
    --surface-2: 240 8% 9%;
    --surface-3: 240 6% 14%;

    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    /* ─── Interactive ───────────────────────────────────────── */
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    /* ─── Muted ─────────────────────────────────────────────── */
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    /* ─── Feedback ──────────────────────────────────────────── */
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 98%;
    --destructive-subtle: 0 72% 16%;

    --success: 142 70% 45%;
    --success-foreground: 0 0% 98%;
    --success-subtle: 142 52% 14%;

    --warning: 38 90% 56%;
    --warning-foreground: 0 0% 98%;
    --warning-subtle: 38 80% 15%;

    --info: 221 83% 63%;
    --info-foreground: 0 0% 98%;
    --info-subtle: 221 72% 17%;

    /* ─── Overlay ───────────────────────────────────────────── */
    --overlay: 240 10% 3.9%;
    --overlay-opacity: 0.65;
    --overlay-strong-opacity: 0.88;

    /* ─── Borders & Inputs ──────────────────────────────────── */
    --border: 240 3.7% 15.9%;
    --border-strong: 240 3.7% 26%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

`;
