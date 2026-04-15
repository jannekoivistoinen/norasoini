import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "var(--font-instrument-sans), system-ui, sans-serif",
            maxWidth: "none",
          },
        },
      },
      fontFamily: {
        heading: ["var(--font-instrument-serif)", "serif"],
        body: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        link: ["var(--font-kaisei-decol)", "serif"],
      },
      colors: {
        brand: {
          bg: "#E1D9CB",
          primary: "#2F4F46",
          text: "#000000",
          "footer-text": "#F0ECE5",
          "quote-bg": "#D9D1C3",
          card: "#D8CDBB",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
