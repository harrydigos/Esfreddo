/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
    colors: {
      "transparent": "transparent",
      "dark": "#292929",
      "coffee-dark": "#483434",
      "coffee-light": "#6B4F4F",
      "coffee-cream": "#EED6C4",
      "coffee-cream-light": "#FFF3E4",
    },
    extend: {},
  },
  plugins: [],
};
