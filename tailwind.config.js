/** @type {import('tailwindcss').Config} */
    export default {
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {
          colors: {
            rastaRed: '#E03A3E',
            rastaYellow: '#F7D046',
            rastaGreen: { // Define rastaGreen as a palette
              500: '#34B44A', // Existing rastaGreen as 500 shade
              700: '#2a8a3d', // Slightly darker shade for 700 - adjust if needed
              900: '#1a4d22', // Even darker shade for 900 - adjust as needed
            },
            rastaDark: '#222', // Dark background
            rastaLight: '#eee', // Light text color
            rastaCardBg: '#2a372e', // Dark desaturated rasta green for cards
          },
          fontFamily: {
            'rasta-banner-heading': ['Bangers', 'cursive'],
            'rasta-nav-links': ['Roboto Condensed', 'sans-serif'],
            'rasta-body': ['Roboto', 'sans-serif'],
            'rasta-heading': ['Bangers', 'cursive'],
            'product-card-font': ['Inter', 'sans-serif'],
          },
          animation: {
            'blur-pulse': 'blur-pulse 5s linear infinite',
            'spotlight-move': 'spotlight-move 15s linear infinite',
            'gradient-shift': 'gradient-shift 5s linear infinite',
            'gradient-move': 'gradient-move 15s ease infinite', // Increased duration to 15s
      },
      keyframes: {
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'blur-pulse': {
          '0%, 100%': { backdropFilter: 'blur(10px)' },
          '50%': { backdropFilter: 'blur(15px)' },
        },
        'rasta-radial': {
          '0%, 100%': { backgroundPosition: '0% 50%', backgroundSize: '250% 250%' },
          '50%': { backgroundPosition: '200% 50%', backgroundSize: '400% 400%' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '200% 0%' },
          '50%': { backgroundPosition: '0% 200%' },
        },
      },
      backgroundImage: {
        'dynamic-gradient': 'linear-gradient(270deg, #F7D046, #34B44A, #2a8a3d, #1a4d22, #E03A3E)', // Yellow and green at start
      },
    },
  },
  plugins: [],
};
