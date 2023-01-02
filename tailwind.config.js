/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        dark: "#292929",
        "coffee-dark": "#483434",
        "coffee-light": "#6B4F4F",
        "coffee-cream": "#EED6C4",
        "coffee-cream-light": "#FFF3E4",
      },
      animation: {
        "anim-dropdown": "drop 150ms ease-out",
      },
      keyframes: {
        drop: {
          from: { transform: "translateY(-12px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
