/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class"],
  theme: {
    screens: {
      xs: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    extend: {
      fontFamily: {
        heading: ["Sora", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          primary: "#D4A574",
          background: "#F8F6F3",
          surface: "#E8E4DF",
          card: "#FEFDFB",
          foreground: "#1F1814",
          muted: "#726860",
          border: "#E0D8D0",
          success: "#229857",
          destructive: "#E74C3C",
          warning: "#FFD966",
          info: "#5DADE2",
          accent: "#F59E0B",
          dark: "#1A1A1A"
        }
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.08)",
        cardHover: "0 10px 24px rgba(0, 0, 0, 0.12)",
        warm: "0 8px 24px rgba(212, 165, 116, 0.15)"
      },
      borderRadius: {
        "3xl": "1.75rem"
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
        600: "600ms"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 600ms ease-out both",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
