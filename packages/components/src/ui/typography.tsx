import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../../lib/utils';

/**
 * Typography component following best practices:
 * - Clear visual hierarchy with appropriate font sizes
 * - Optimal line heights for readability
 * - Proper font weights for emphasis
 * - Appropriate letter spacing
 * - Semantic HTML structure
 * - Accessibility considerations
 */

// Base typography styles
// Following typography best practices:
// - Headings: tighter line heights (leading-tight) for visual cohesion
// - Paragraphs: relaxed line heights (leading-relaxed) for readability
// - Appropriate font weights for hierarchy
// - Letter spacing optimized for each size
const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'text-4xl leading-tight font-extrabold tracking-tight lg:text-5xl',
      h2: 'text-3xl leading-tight font-bold tracking-tight',
      h3: 'text-2xl leading-snug font-semibold tracking-tight',
      h4: 'text-xl leading-snug font-semibold tracking-tight',
      h5: 'text-lg leading-normal font-medium tracking-normal',
      p: 'text-base leading-relaxed font-normal tracking-normal',
    },
  },
});

type TypographyProps = React.ComponentPropsWithoutRef<typeof RNText> &
  VariantProps<typeof typographyVariants> & {
    className?: string;
  };

/**
 * H1 - Main page title
 * Use for the primary heading of a page or section
 * - Largest font size (4xl/5xl)
 * - Extra bold weight for maximum emphasis
 * - Tight tracking and line height
 */
const H1 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h1' }), className)}
      {...props}
    />
  )
);
H1.displayName = 'H1';

/**
 * H2 - Section heading
 * Use for major section divisions
 * - Large font size (3xl)
 * - Bold weight
 * - Tight tracking and line height
 */
const H2 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h2' }), className)}
      {...props}
    />
  )
);
H2.displayName = 'H2';

/**
 * H3 - Subsection heading
 * Use for subsections within a section
 * - Medium-large font size (2xl)
 * - Semibold weight
 * - Tight tracking and line height
 */
const H3 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h3' }), className)}
      {...props}
    />
  )
);
H3.displayName = 'H3';

/**
 * H4 - Minor heading
 * Use for minor divisions or card titles
 * - Medium font size (xl)
 * - Semibold weight
 * - Tight tracking and line height
 */
const H4 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h4' }), className)}
      {...props}
    />
  )
);
H4.displayName = 'H4';

/**
 * H5 - Small heading
 * Use for small headings or emphasized text
 * - Small-medium font size (lg)
 * - Medium weight
 * - Normal tracking and line height
 */
const H5 = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, accessibilityRole, ...props }, ref) => (
    <RNText
      ref={ref}
      accessibilityRole={accessibilityRole ?? 'header'}
      className={cn(typographyVariants({ variant: 'h5' }), className)}
      {...props}
    />
  )
);
H5.displayName = 'H5';

/**
 * P - Paragraph text
 * Use for body text and descriptions
 * - Base font size (base)
 * - Normal weight for readability
 * - Relaxed line height for comfortable reading
 * - Normal tracking
 */
const P = React.forwardRef<React.ElementRef<typeof RNText>, TypographyProps>(
  ({ className, ...props }, ref) => (
    <RNText ref={ref} className={cn(typographyVariants({ variant: 'p' }), className)} {...props} />
  )
);
P.displayName = 'P';

export { H1, H2, H3, H4, H5, P, typographyVariants };
export type { TypographyProps };
