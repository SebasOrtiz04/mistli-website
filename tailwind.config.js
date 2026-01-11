/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9f8',
          100: '#d6f3f1',
          200: '#aee7e3',
          300: '#7fd6cd',
          400: '#4fc3b6',
          500: '#1fa79d',
          600: '#188975',
          700: '#12614d',
          800: '#0b3b31',
          900: '#061e1a',
        },
        primary: '#1fa79d',
        accent: '#ef4444',
        secondary: '#1fa79d',
      }
    },
  },
  plugins: [],
};
