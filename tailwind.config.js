
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: {
          lightest: "#FF66000D",
          lighter: "#ff660052",
          light: "#FF9933",
          DEFAULT: "#FF6600",
          dark: "#CC5200",
        },
        text: {
          DEFAULT: "#7a7a7a",
        },
        bg: {
          DEFAULT: "#F2F2F2",
        },
        darkBlue: {
          DEFAULT: "#003366",
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    daisyui,
    require("tailwindcss-motion"),
    require("tailwindcss-intersect"),
  ],
  daisyui: {
    themes: [
      {
        // mytheme: {
        //   "primary": "#a991f7",
        //   "secondary": "#f6d860",
        //   "accent": "#37cdbe",
        //   "neutral": "#3d4451",
        //   "base-100": "#ffffff",
        // },
      },
    ] 
  },
};
