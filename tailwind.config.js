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
          '600': '#820053'
        },
        menu: {
          '100': '#f0ece9',
          '200': '#bfb6ad',
        },
        introduccion: {
          '100': '#DDD7D1'
        },
        button: {
          'text': '#F8971D',
          'bg1': '#DFE0E4',
          'bg2': '#FFCF01',
          'bg3': '#F8971D',
          'bg4': '#FFF11C'
        }
      },
      dropShadow: {
        'button': '2px 2px 0px rgba(255, 255, 255, 0.8)',
        'pop': '1px 2px 2px rgba(0, 0, 0, 0.2)',
      },
      aspectRatio: {
        'ipad': '4 / 3',
      },
      backgroundImage: {
        'fondo': "url('../images/fondo.png')",
      },
    },
  },
  plugins: [
    require('@midudev/tailwind-animations'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

