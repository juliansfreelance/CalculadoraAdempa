/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'albert': ['FSAlbert'],
      'helvet': ['Helvetica'],
    },
    extend: {
      colors: {
        text: {
          '500': '#6d6d6d',
        },
        menu: {
          '100': '#f0ece9',
          '200': '#bfb6ad',
        },
      },
      aspectRatio: {
        'ipad': '4 / 3',
      },
      backgroundImage: {
        'fondo': "url('../images/fondo.jpg')",
      },
    },
  },
  plugins: [
    require('@midudev/tailwind-animations'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

