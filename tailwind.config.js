import { nextui } from "@nextui-org/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        // H1 sizes - Added
        "h1-mobile": ["33px", { lineHeight: "1.2" }],
        "h1-sm": ["42px", { lineHeight: "1.2" }],
        "h1-md": ["52px", { lineHeight: "1.2" }],
        "h1-xl": ["60px", { lineHeight: "1.2" }],
        // H2 sizes
        "h2-mobile": ["32px", { lineHeight: "1.2" }],
        "h2-sm": ["33px", { lineHeight: "1.2" }],
        "h2-md": ["42px", { lineHeight: "1.2" }],
        "h2-xl": ["46px", { lineHeight: "1.2" }],
        // Quote sizes
        "quote-mobile": ["22px", { lineHeight: "1.4" }],
        "quote-sm": ["28px", { lineHeight: "1.4" }],
        "quote-md": ["30px", { lineHeight: "1.4" }],
        "quote-xl": ["32px", { lineHeight: "1.4" }],
      },
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 600,
        extrabold: 800,
      },
      lineHeight: {
        relaxed: "150%",
        1.5: "1.5",
      },
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
        daybreak: {
          light: "#A0674B",
          DEFAULT: "#CEAB97",
        },
        nightshift: "#08132D",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.03em",
        normal: "0",
      },
      backdropBlur: {
        30: "30px",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow"), require("tailwindcss-animate"), nextui],
}

