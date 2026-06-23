import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F2EDE4',
        parchment: '#EDE5D8',
        sand: '#DDD0BC',
        bark: '#8C6E4B',
        clay: '#B8724A',
        earth: '#2E1F12',
        river: '#3D6060',
        gold: '#C9A96E',
        ink: '#1A0F06',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
