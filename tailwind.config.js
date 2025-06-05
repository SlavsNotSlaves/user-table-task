/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        plex: ['"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}