/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '../../packages/components/src/**/*.{ts,tsx}',
    '../../packages/components/lib/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        'border-strong': 'hsl(var(--border-strong))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        'surface-2': 'hsl(var(--surface-2))',
        'surface-3': 'hsl(var(--surface-3))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          subtle: 'hsl(var(--destructive-subtle))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
          subtle: 'hsl(var(--muted-subtle))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          subtle: 'hsl(var(--success-subtle))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          subtle: 'hsl(var(--warning-subtle))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
          subtle: 'hsl(var(--info-subtle))',
        },
        // Overlay uses rgb() channels — hsl() doesn't support alpha shorthand
        overlay: {
          DEFAULT: 'rgb(var(--overlay) / var(--overlay-opacity))',
          strong: 'rgb(var(--overlay) / var(--overlay-strong-opacity))',
        },
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'var(--radius-lg)',
        '2xl': 'var(--radius-xl)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        card: 'var(--shadow-sm)',
        popover: 'var(--shadow-md)',
        dialog: 'var(--shadow-lg)',
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'var(--ease-out)',
        'ease-in-out-expo': 'var(--ease-in-out)',
      },
    },
  },
  plugins: [],
};
