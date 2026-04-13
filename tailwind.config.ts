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
      fontFamily: {
        heading: ["var(--font-instrument-serif)", "serif"],
        body: ["var(--font-kaisei-decol)", "serif"],
      },
      colors: {
        brand: {
          bg: "#E1D9CB",
          primary: "#2F4F46",
          text: "#000000",
          "footer-text": "#F0ECE5",
          "quote-bg": "#D9D1C3",
          card: "#EDE8DF",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
