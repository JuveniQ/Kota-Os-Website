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
          primary: "hsl(38 92% 50%)",
          background: "hsl(30 25% 97%)",
          surface: "hsl(35 30% 92%)",
          card: "hsl(0 0% 100%)",
          foreground: "hsl(30 10% 12%)",
          muted: "hsl(30 10% 45%)",
          border: "hsl(30 20% 88%)",
          success: "hsl(145 65% 42%)",
          destructive: "hsl(0 84% 60%)",
          warning: "hsl(45 95% 55%)",
          info: "hsl(210 93% 72%)",
          accent: "hsl(38 92% 50%)",
          dark: "#1A1A1A"
        }
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.08)",
        cardHover: "0 10px 24px rgba(0, 0, 0, 0.12)",
        warm: "0 8px 24px rgba(245, 158, 11, 0.2)"
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
