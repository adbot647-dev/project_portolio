/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          dark:    '#140010',   // deepest maroon-black (bg primary)
          maroon:  '#3d0028',   // rich dark maroon (bg secondary)
          pink:    '#e8005c',   // hot magenta — primary CTA
          'pink-h':'#c4004e',   // hover state for pink
          yellow:  '#ffd600',   // bold yellow — price / highlight
          'yellow-h':'#e6c200', // hover yellow
        },
        gu: {
          blue:   '#0033a0',
          yellow: '#ffd700',
        }
      }
    },
  },
  plugins: [],
}
