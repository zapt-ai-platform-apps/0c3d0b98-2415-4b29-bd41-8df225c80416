/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3498db',
          50: '#eaf6fd',
          100: '#d0eafb',
          200: '#a1d6f7',
          300: '#72c1f3',
          400: '#43acef',
          500: '#3498db',
          600: '#2980b9',
          700: '#1f689b',
          800: '#154f7d',
          900: '#0b375f',
        },
        secondary: {
          DEFAULT: '#2c3e50',
          50: '#e8ecf0',
          100: '#d1d9e1',
          200: '#a3b3c3',
          300: '#758ca5',
          400: '#476687',
          500: '#2c3e50',
          600: '#253443',
          700: '#1e2a36',
          800: '#182029',
          900: '#11161c',
        },
        accent: {
          DEFAULT: '#e74c3c',
          50: '#fdeeed',
          100: '#fadddb',
          200: '#f5bbb7',
          300: '#f09992',
          400: '#ec776e',
          500: '#e74c3c',
          600: '#c0392b',
          700: '#9e2f23',
          800: '#7d251c',
          900: '#5b1b14',
        },
      },
    },
  },
  plugins: [],
};