/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'tangerine': ['tangerine']
    },
    extend: {
      spacing: {
        '15vw': '15vw',
        '3vw': '3vw'
      },
    },
  },
  plugins: [],
}