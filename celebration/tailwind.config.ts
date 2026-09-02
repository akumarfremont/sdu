import type { Config } from "tailwindcss";

/**
 * The whole colour story of the site lives here.
 * Change a hex value and every card, badge and button follows.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm paper grounds
        ivory: "#FDFAF4",
        cream: "#F6EEE1",
        sand: "#EADFCC",
        // Ink
        ink: "#2E2620",
        "ink-soft": "#6B5F55",
        "ink-faint": "#A2958A",
        // Marigold — the festive accent
        marigold: {
          50: "#FEF6E8",
          100: "#FBE8C6",
          200: "#F6D293",
          300: "#EFB65B",
          400: "#E49A2B",
          500: "#C97F16",
          600: "#A26311",
        },
        // Peacock — spiritual + wellness
        peacock: {
          50: "#EAF4F3",
          100: "#CBE5E2",
          200: "#94CBC6",
          300: "#4FA8A2",
          400: "#1F8079",
          500: "#12625E",
          600: "#0C4844",
        },
        // Lotus rose — celebration + dance
        rose: {
          50: "#FCEFF0",
          100: "#F7D9DC",
          200: "#EDAFB6",
          300: "#DC7C88",
          400: "#C4596A",
          500: "#A03F51",
          600: "#7B2C3C",
        },
        // Plum — headings, deep chrome
        plum: {
          50: "#F5EFF4",
          100: "#E5D7E2",
          200: "#C6A9C0",
          300: "#9D739A",
          400: "#744C74",
          500: "#53325A",
          600: "#3B2141",
          700: "#2A1730",
        },
        // Henna leaf — nature / outdoors
        leaf: {
          100: "#E3EBD4",
          300: "#A8BE84",
          500: "#6E8A4A",
          600: "#516635",
        },
        gold: "#B8912F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(46,38,32,0.04), 0 8px 24px -12px rgba(46,38,32,0.16)",
        lift: "0 2px 4px rgba(46,38,32,0.05), 0 18px 40px -18px rgba(46,38,32,0.28)",
        sheet: "0 -8px 40px -12px rgba(46,38,32,0.25)",
      },
      maxWidth: {
        content: "72rem",
        prose: "44rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        sheetUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 600ms cubic-bezier(0.22,1,0.36,1) forwards",
        fadeIn: "fadeIn 500ms ease-out forwards",
        sheetUp: "sheetUp 320ms cubic-bezier(0.22,1,0.36,1) forwards",
        floatSlow: "floatSlow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
