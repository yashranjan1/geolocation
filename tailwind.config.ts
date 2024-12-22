import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        default: {
          50: { light: "#F4F4F5", dark: "#1A1A1C" },
          100: { light: "#E4E4E7", dark: "#2D2D30" },
          200: { light: "#D4D4D8", dark: "#43434B" },
          300: { light: "#A1A1AA", dark: "#6A6A75" },
          400: { light: "#71717A", dark: "#8A8A92" },
          500: { light: "#52525B", dark: "#A9A9B0" },
          600: { light: "#3F3F46", dark: "#BFBFC4" },
          700: { light: "#27272A", dark: "#D3D3D7" },
          800: { light: "#18181B", dark: "#E5E5E7" },
          900: { light: "#101112", dark: "#F5F5F7" },
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: { light: "#E0F1FF", dark: "#00133F" },
          100: { light: "#CCE4FF", dark: "#00184C" },
          200: { light: "#99CBFF", dark: "#0033CC" },
          300: { light: "#66B3FF", dark: "#004FF0" },
          400: { light: "#338EFF", dark: "#0066FF" },
          500: { light: "#000EFE", dark: "#0066FF" },
          600: { light: "#0066D4", dark: "#0044B3" },
          700: { light: "#0044B3", dark: "#002E82" },
          800: { light: "#002E82", dark: "#001731" },
          900: { light: "#001731", dark: "#00091A" },
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: { light: "#F2E4FA", dark: "#140522" },
          100: { light: "#E4D1FA", dark: "#26084C" },
          200: { light: "#C9A3E9", dark: "#3B0973" },
          300: { light: "#A36EE7", dark: "#501180" },
          400: { light: "#9533E3", dark: "#6A10A0" },
          500: { light: "#7828E8", dark: "#8B17C6" },
          600: { light: "#6202D0", dark: "#6200A0" },
          700: { light: "#48187B", dark: "#480C6D" },
          800: { light: "#301D50", dark: "#320033" },
          900: { light: "#160822", dark: "#1A0019" },
        },
        success: {
          50: { light: "#E6FAF0", dark: "#1C3A23" },
          100: { light: "#BDF4E0", dark: "#285834" },
          200: { light: "#A2ECD7", dark: "#1E8C40" },
          300: { light: "#76FAF2", dark: "#12B05F" },
          400: { light: "#54E4A3", dark: "#09A652" },
          500: { light: "#17D964", dark: "#0A693A" },
        },
        warning: {
          50: { light: "#FDF0E2", dark: "#422507" },
          100: { light: "#FAE3C5", dark: "#632E08" },
          200: { light: "#FAD1A0", dark: "#9C400C" },
          300: { light: "#FABA77", dark: "#C35A00" },
          400: { light: "#FF9F50", dark: "#DB7400" },
          500: { light: "#FF5A24", dark: "#E86300" },
        },

        danger: {
          50: { light: "#FDECF1", dark: "#340B1C" },
          100: { light: "#FCD6E1", dark: "#4C1027" },
          200: { light: "#FBA1BB", dark: "#6D1735" },
          300: { light: "#F87394", dark: "#992143" },
          400: { light: "#F4516E", dark: "#BB3250" },
          500: { light: "#DB0A7A", dark: "#CA0054" },
        },
        divider: {
          light: "#1111126",
          dark: "#17191C",
        },
        focus: {
          light: "#000EFE",
          dark: "#000EFE",
        },
        content: {
          light: "#FFFFFF",
          dark: "#27272A",
        },
        content2: {
          light: "#F4F4F5",
          dark: "#323232",
        },
        content3: {
          light: "#E4E4E7",
          dark: "#4B4B4B",
        },
        content4: {
          light: "#D4D4D8",
          dark: "#6D6D6D",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
