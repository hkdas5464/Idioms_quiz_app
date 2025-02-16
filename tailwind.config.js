const {heroui} = require('@heroui/theme');
// tailwind.config.js
module.exports = {
  darkMode: 'class', // enable dark mode using a CSS class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|card|table|ripple|spinner|checkbox|form|spacer).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
