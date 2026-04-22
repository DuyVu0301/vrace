/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#b3c5d8",
          300: "#8ca7c4",
          600: "#2e5090",
          700: "#1e3a5f",
          900: "#0f1b2e",
        },
      },
    },
  },
  plugins: [],
};
