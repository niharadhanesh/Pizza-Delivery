/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        espresso:  '#1C1410',
        cream:     '#F5E6C8',
        amber:     '#E8A020',
        'amber-lt':'#F5C060',
        'amber-dk':'#B87818',
        rust:      '#C4501A',
        sage:      '#5A7A5A',
        'warm-gray':'#2E2820',
        muted:     '#8A7A68',
      },
    },
  },
  plugins: [],
};