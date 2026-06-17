/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8ec1ff',
          400: '#599dff',
          500: '#3478f6',
          600: '#205aeb',
          700: '#1a47d4',
          800: '#1c3cab',
          900: '#1d3886',
        },
        accent: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        ink: {
          900: '#0b1020',
          800: '#0f1629',
          700: '#151d35',
          600: '#1c2742',
          500: '#28344f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'flip-in': {
          '0%': { opacity: '0', transform: 'rotateY(-90deg)' },
          '100%': { opacity: '1', transform: 'rotateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'flip-in': 'flip-in 0.35s ease-out',
      },
    },
  },
  plugins: [],
}
