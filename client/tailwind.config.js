/* global require */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      libre: ['Libre Franklin', 'sans-serif'],
      sahitya: ['Sahitya', 'serif'],
      nanum: ['Nanum Pen Script', 'cursive'],
      simonetta: ['Simonetta', 'serif']
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: []
  }
};
