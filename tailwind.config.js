/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './icons/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'slow-ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        heartRed: 'rgb(235, 77, 61)',
        t2kGray: '#EDEDED',
        t2kTeal: '#0E7271',
      },
      screens: {
        pwa: { raw: '(display-mode: standalone)' },
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
