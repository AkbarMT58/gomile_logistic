module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ocistok_nav: { blue: 'rgba(0, 11, 38, 0.95)' },
        orange: {
          50: '#ff10610e',
          100: '#fff8f0',
          200: '#ffddb3',
          300: '#ffc37a',
          400: '#ffa83d',
          500: '#ff8c00',
          600: '#cc7000',
          700: '#995400',
          800: '#663800',
          900: '#331c00',
        },
        marron: {
          50: '#10010e112',
          100: '#fef4f0',
          200: '#fbbfac',
          300: '#f88d6d',
          400: '#f55829',
          500: '#d1380a',
          600: '#aa2e08',
          700: '#7f2206',
          800: '#581804',
          900: '#310d02',
        },
        sky: {
          50: '#10010e112',
          100: '#fef4f0',
          200: '#68d7ff',
          300: '#68b6dD',
          400: '#2896bD',
          500: '#0886AD',
          600: '#06669D',
          700: '#06427C',
          800: '#04205A',
          900: '#021048',
        },
      },
      outline: {
        blue: '1px solid #A2D2FF',
      },
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
};
