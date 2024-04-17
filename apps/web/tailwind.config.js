/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.tsx',
    '../../packages/ui/**/*.tsx',
    '../../node_modules/flowbite-react/lib/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
