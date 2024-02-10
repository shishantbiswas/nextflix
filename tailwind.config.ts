import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '10px 10px 0px 0px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
