/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        fsk: {
          sky: '#CBE7F7',
          ocean: '#86C5E6',
          dusk: '#FDBA74',
          sunrise: '#FFE8D1',
          pine: '#2E6F5E'
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 6px 20px rgba(0,0,0,0.06)'
      },
      backgroundImage: {
        himalayan: 'radial-gradient(1200px 400px at 70% 0%, #FFE8D1 0%, #CBE7F7 60%, #ffffff 100%)'
      }
    }
  },
  plugins: []
}