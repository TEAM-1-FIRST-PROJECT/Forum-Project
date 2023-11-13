/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('././src/assets/backgroundimg.jpg')",
      }),
      keyframes: {
        colorchange: {
          '0%': { backgroundColor: '#000002' },  // LightPink
          '25%': { backgroundColor: '#1A374D' }, // LightBlue
          '50%': { backgroundColor: '#406882' }, // LightGreen
          '75%': { backgroundColor: '#6998AB' }, // LightGray
          '100%': { backgroundColor: '#B1D0E0' }, // LightPink
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
      animation: {
        ping: 'ping 2s ease-in-out ',
        colorchange: 'colorchange 20s ease-in-out infinite',
       
        

      },
    },
  },
  variants: {},
  plugins: [
    '@tailwindcss/forms',
  ],
  
}

