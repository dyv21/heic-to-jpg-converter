/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
       'bg--primary': '#F7FAFC',
        'btn--primary': '#1A80E5',
        'btn--secondary': '#E8EDF2',
      }
    },
  },
  plugins: [],
}

