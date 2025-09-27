import type { Config } from "tailwindcss";
// @ts-ignore
const tailwindcssAnimate = require("tailwindcss-animate");

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // Brand colors
        brand: {
          950: "hsl(var(--brand-950))",
          900: "hsl(var(--brand-900))",
          800: "hsl(var(--brand-800))",
          700: "hsl(var(--brand-700))",
          600: "hsl(var(--brand-600))",
          500: "hsl(var(--brand-500))",
          400: "hsl(var(--brand-400))",
          300: "hsl(var(--brand-300))",
          200: "hsl(var(--brand-200))",
          100: "hsl(var(--brand-100))",
        },
        // App structure
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        "elev-1": "hsl(var(--elev-1))",
        "elev-2": "hsl(var(--elev-2))",
        // Text hierarchy
        "text-strong": "hsl(var(--text-strong))",
        text: "hsl(var(--text))",
        "text-muted": "hsl(var(--text-muted))",
        // UI elements
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Semantic colors
        accent: "hsl(var(--accent))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))",
        // shadcn compatibility
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
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        "fade-in": "fadeIn 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "slide-up": "slideUp 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        shimmer: "shimmer 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "calc(200px + 100%) 0" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
