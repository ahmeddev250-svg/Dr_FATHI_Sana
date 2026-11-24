/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          espresso: '#3B312B',
          'espresso-deep': '#2C241F',
          gold: '#C49A45',
          'gold-light': '#E6CE94',
          'gold-soft': '#F5EAD2',
          champagne: '#F7F3EE',
          ivory: '#FCFBF9',
          taupe: '#76675D',
          sand: '#E8DFD3',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', '"IBM Plex Sans Arabic"', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(59, 49, 43, 0.08)',
        'glass-lg': '0 16px 48px rgba(59, 49, 43, 0.12)',
      },
    },
  },
  plugins: [],
};
