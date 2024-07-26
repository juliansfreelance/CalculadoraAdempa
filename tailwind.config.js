/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'albert': ['FSAlbert'],
      'helvet': ['Helvet'],
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
          'bg0': '#B7BAC7',
          'bg1': '#DFE0E4',
          'bg2': '#FFCF01',
          'bg3': '#F8971D',
          'bg4': '#FFF11C'
        },
        pop: {
          'background': '#DDD7D1'
        }
      },
      dropShadow: {
        'button': '1.6px 1.5px 0px rgba(255, 255, 255, 0.9)',
        'button-text': '2px 2px 0px rgba(0, 0, 0, 0.4)',
        'button-text-links': '1px 1px 0px rgba(0, 0, 0, 0.4)',
        'th-text': '1px 1px 1px rgba(0, 0, 0, 0.15)',
        'folder-buttton-text': '1.6px 1.6px 0px rgba(255, 255, 255, 0.7)',
        'links': '-5px 0px 5px rgba(0, 0, 0, 0.4)'
      },
      boxShadow: {
        'pop': '1px 2px 2px rgba(0, 0, 0, 0.2)',
        'enlaces': '-5px 0px 5px rgba(0, 0, 0, 0.8)'
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

