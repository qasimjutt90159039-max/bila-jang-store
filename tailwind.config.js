/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#06090e',
          900: '#0B0F17',
          800: '#111827',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
          400: '#64748B',
          300: '#94A3B8',
          200: '#CBD5E1',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        racing: {
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
          light: '#EF4444',
          glow: 'rgba(220, 38, 38, 0.35)',
        },
        electric: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#3B82F6',
          glow: 'rgba(37, 99, 235, 0.35)',
        },
        kabli: {
          DEFAULT: '#0284C7',
          dark: '#0369A1',
          light: '#38BDF8',
          badge: '#0C4A6E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(220, 38, 38, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'card-dark': '0 8px 30px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
