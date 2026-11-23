/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: '#4A2C40',
          plumLight: '#6B425D',
          plumDark: '#331D2C',
          gold: '#C99A45',
          goldLight: '#E6C682',
          cream: '#F9F6F2',
          sand: '#EFE9E1',
          ink: '#2A1F26',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', '"Inter"', '"Cairo"', 'sans-serif'],
        display: ['"Montserrat"', '"Cairo"', 'sans-serif'],
        arabic: ['"Cairo"', '"IBM Plex Sans Arabic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
