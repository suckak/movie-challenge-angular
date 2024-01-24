/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
    '../src/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
