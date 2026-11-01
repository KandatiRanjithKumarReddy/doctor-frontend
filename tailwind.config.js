/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', 'html.dark'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '460px',
      },
      colors: {
        'primary': "#5f6FFF",
        'brand-red': "#DC2626"
      },
      gridTemplateColumns: {
        'auto': "repeat(auto-fill,minmax(210px,1fr))"
      }
    },
  },
  plugins: [],
}
