/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "content-main-bg": "#F6F7FB",
        "main-red": "#E41205",
        "text-title": "#367196",
      },
    },
    screens: {
      sm: { max: "479px" },
      // => @media (min-width: 640px) { ... }

      tab: {
        min: "480px",
        max: "767px",
      },

      tab_port: {
        min: "767px",
        max: "1024px",
      },

      md: { max: "768px" },
      // => @media (min-width: 768px) { ... }

      lg: { min: "1025px", max: "1280px" },
      // => @media (min-width: 1024px) { ... }

      xl: { max: "1280.1px" },
      // => @media (min-width: 1280px) { ... }

      "2xl": { max: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};