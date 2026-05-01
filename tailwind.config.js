/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1E8',
        'cream-deep': '#ECE5D5',
        ivory: '#FAF7F1',
        ink: '#1A2D2A',
        forest: '#2D4A3E',
        'forest-light': '#3E6354',
        moss: '#6B8E7F',
        gold: '#B8935A',
        'gold-deep': '#97703F',
        'gold-light': '#D4B280',
        rust: '#A85432',
        paper: '#FBF8F2',
        line: '#D9D2BF',
        'line-soft': '#E8E1CD',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out infinite 1s',
        'float-fast': 'float 5s ease-in-out infinite 0.5s',
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
