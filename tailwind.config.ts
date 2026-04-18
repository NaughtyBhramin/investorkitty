import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ec',
          100: '#e7f0d4',
          200: '#d3e3a0',
          300: '#abcb5e',
          400: '#8fc629',
          500: '#97C617',
          600: '#84a712',
          700: '#6f8d0a',
          800: '#5d730a',
          900: '#464f08'
        },
        secondary: '#1F2230',
        accent: '#C9568A'
      },
      boxShadow: {
        glow: '0 20px 45px rgba(14, 107, 138, 0.08)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
