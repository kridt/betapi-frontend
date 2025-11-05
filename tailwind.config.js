/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#071B26',
        surface: '#0D2430',
        surface2: '#102A37',
        text: '#E6F1F5',
        muted: '#9BB7C4',
        positive: '#00BCD4',
        negative: '#E57373',
      },
    },
  },
  plugins: [],
}
