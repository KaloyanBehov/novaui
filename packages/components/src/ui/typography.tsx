import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../../lib/utils';

/**
 * Typography component — mobile-first best practices:
 *
 * SCALE
 *   Mobile viewports are narrow. A tighter type scale prevents headings from
 *   dominating the screen and forces awkward line breaks. We use a compressed
 *   scale (h1 = 2xl → 3xl) rather than a web-centric one (h1 = 4xl → 5xl).
 *
 * LINE HEIGHT
 *   - Headings: `leading-tight` (1.25). Short line length + large size means
 *     tighter leading looks intentional, not cramped.
 *   - Subheadings (h4/h5): `leading-snug` (1.375). Transitional zone.
 *   - Body: `leading-relaxed` (1.625). Longer passages need breathing room.
 *   - Lead/intro: `leading-loose` (2.0). Draws the eye, signals importance.
 *
 * WEIGHT
 *   `font-extrabold` (800) at large sizes on mobile can appear clunky and
 *   reduces legibility on lower-DPI screens. Bold (700) is the practical
 *   ceiling for headings; semibold (600) works well for sub-levels.
 *
 * TRACKING
 *   Large text already has wide absolute letter spacing — `tracking-tight`
 *   compensates and improves visual cohesion. Small text (`h5`, `p`, `muted`)
 *   benefits from `tracking-normal` or even a slight `tracking-wide` to
 *   aid legibility at small sizes on mobile.
 *
 * ADDITIONAL VARIANTS
 *   `lead`  — intro/summary paragraph. Slightly larger, looser, medium weight.
 *   `muted` — secondary/helper text. Smaller, muted color, normal weight.
 *   `label` — form labels / metadata. Uppercase, wide tracking, xs size.
 *   `mono`  — inline code or data values. Monospace, slightly smaller.
 */

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      // ── Headings ────────────────────────────────────────────────────────────
      // h1: Primary screen title. Dominates without overwhelming.
      //     2xl on small phones, 3xl on larger devices.
      h1: 'text-2xl leading-tight font-bold tracking-tight',

      // h2: Section header. Clear hierarchy below h1.
      h2: 'text-xl leading-tight font-bold tracking-tight',

      // h3: Subsection / card title. Semibold keeps weight visible at this size.
      h3: 'text-lg leading-snug font-semibold tracking-tight',

      // h4: Minor heading / list group label. Medium weight; tracking-normal
      //     prevents letters from crowding at this transitional size.
      h4: 'text-base leading-snug font-semibold tracking-normal',

      // h5: Smallest heading. Differentiated by weight only — avoid going
      //     below base size for headings or they lose their heading identity.
      h5: 'text-sm leading-normal font-medium tracking-normal',

      // ── Body copy ───────────────────────────────────────────────────────────
      // p: Standard paragraph. Relaxed leading is essential for readability
      //    in multi-line content on mobile.
      p: 'text-base leading-relaxed font-normal tracking-normal',

      // ── Extended variants ───────────────────────────────────────────────────
      // lead: Intro / summary paragraph. Slightly larger than body, looser
      //       leading. Draws the eye before the main text begins.
      lead: 'text-lg leading-loose font-normal tracking-normal',

      // muted: Secondary / helper / caption text. Reduced opacity via
      //        text-muted-foreground keeps it readable without competing.
      muted: 'text-muted-foreground text-sm leading-normal font-normal tracking-wide',

      // label: Form labels, metadata chips, category tags. All-caps with
      //        wide tracking is a classic mobile pattern for small UI labels.
      label: 'text-muted-foreground text-xs leading-normal font-medium tracking-widest uppercase',

      // mono: Inline code snippets, numeric data, IDs. Monospace family
      //       enforces alignment; slightly smaller to optically match body.
      mono: 'font-mono text-sm leading-normal font-normal tracking-normal',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type TypographyProps = React.ComponentPropsWithoutRef<typeof RNText> &
  VariantProps<typeof typographyVariants> & {
    className?: string;
  };

// ── Heading components ──────────────────────────────────────────────────────
// `select-none` is applied to headings: they are structural UI labels on
// mobile and accidental long-press selection creates a jarring UX.

const H1 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h1' }), 'select-none', className)}
      {...props}
    />
  )
);
H1.displayName = 'H1';

const H2 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h2' }), 'select-none', className)}
      {...props}
    />
  )
);
H2.displayName = 'H2';

const H3 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h3' }), 'select-none', className)}
      {...props}
    />
  )
);
H3.displayName = 'H3';

const H4 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h4' }), 'select-none', className)}
      {...props}
    />
  )
);
H4.displayName = 'H4';

const H5 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h5' }), 'select-none', className)}
      {...props}
    />
  )
);
H5.displayName = 'H5';

// ── Body & utility components ───────────────────────────────────────────────

const P = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, ...props }, ref) => (
    <RNText ref={ref} className={cn(typographyVariants({ variant: 'p' }), className)} {...props} />
  )
);
P.displayName = 'P';

/**
 * Lead — intro/summary paragraph
 * Use at the top of a screen or section to orient the user before body text.
 * The larger size and loose leading signal importance without using bold.
 */
const Lead = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, ...props }, ref) => (
    <RNText
      ref={ref}
      className={cn(typographyVariants({ variant: 'lead' }), className)}
      {...props}
    />
  )
);
Lead.displayName = 'Lead';

/**
 * Muted — secondary / helper / caption text
 * Use for timestamps, descriptions, hints, and supporting copy.
 * Slightly wider tracking compensates for reduced size.
 */
const Muted = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, ...props }, ref) => (
    <RNText
      ref={ref}
      className={cn(typographyVariants({ variant: 'muted' }), className)}
      {...props}
    />
  )
);
Muted.displayName = 'Muted';

/**
 * Label — form labels, metadata chips, category tags
 * All-caps + wide tracking at xs creates clear visual differentiation
 * without needing size or weight changes.
 */
const Label = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, ...props }, ref) => (
    <RNText
      ref={ref}
      className={cn(typographyVariants({ variant: 'label' }), className)}
      {...props}
    />
  )
);
Label.displayName = 'Label';

/**
 * Mono — inline code, numeric data, IDs, tokens
 * Monospace enforces character-level alignment.
 * Slightly smaller (sm) to optically match adjacent body text.
 */
const Mono = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, ...props }, ref) => (
    <RNText
      ref={ref}
      className={cn(typographyVariants({ variant: 'mono' }), className)}
      {...props}
    />
  )
);
Mono.displayName = 'Mono';

export { H1, H2, H3, H4, H5, Label, Lead, Mono, Muted, P, typographyVariants };
export type { TypographyProps };
