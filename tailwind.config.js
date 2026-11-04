/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#202B26',
          deep: '#161E1A',
          surface: '#26332E',
          light: '#2E3D36',
          border: '#37473F',
        },
        gold: {
          DEFAULT: '#B69A70',
          light: '#D4C1A3',
          dark: '#967D55',
          muted: 'rgba(182, 154, 112, 0.15)',
          glow: 'rgba(182, 154, 112, 0.3)',
        },
        ivory: {
          DEFAULT: '#E9E2D5',
          light: '#F8F6F1',
          cream: '#F2EDE4',
          dark: '#D8CEBE',
        },
        stone: {
          DEFAULT: '#5C6258',
          light: '#858B81',
          dark: '#3F443B',
          border: '#454C42',
        },
        luxury: {
          charcoal: '#121614',
          sand: '#ECE6DB',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.2em',
        'luxury-wide': '0.3em',
        'subtle': '0.05em',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(32, 43, 38, 0.08)',
        'luxury': '0 12px 35px -5px rgba(22, 30, 26, 0.25)',
        'gold-glow': '0 0 25px rgba(182, 154, 112, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
