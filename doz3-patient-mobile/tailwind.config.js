/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        doz3: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b7d8ff",
          300: "#84beff",
          400: "#4f9bff",
          500: "#2376ff",
          600: "#1558db",
          700: "#1146b1",
          800: "#113c92",
          900: "#143578",
        },
      },
    },
  },
  plugins: [],
};

