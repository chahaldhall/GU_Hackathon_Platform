/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gu: {
          red: '#C8102E',
          black: '#000000',
          white: '#FFFFFF',
          gold: '#C9A227'
        }
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
}








