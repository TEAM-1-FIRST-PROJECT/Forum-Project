/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      keyframes: {
        colorchange: {
          '0%': { backgroundColor: '#FFB6C1' },  // LightPink
          '25%': { backgroundColor: '#ADD8E6' }, // LightBlue
          '50%': { backgroundColor: '#90EE90' }, // LightGreen
          '75%': { backgroundColor: '#D3D3D3' }, // LightGray
          '100%': { backgroundColor: '#FFB6C1' }, // LightPink
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
      animation: {
        ping: 'ping 2s ease-in-out ',
        colorchange: 'colorchange 4s ease-in-out infinite',
       
        

      },
    },
  },
  variants: {},
  plugins: [],
}

