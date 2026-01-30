/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#f3e8ff',
          500: '#a855f7',
          600: '#9333ea',
        }
      }
    },
  },
  plugins: [],
}
