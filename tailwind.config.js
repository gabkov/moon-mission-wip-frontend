module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Mitr', 'sans-serif'],
      },
      animation:{
        "menu-open": "growDown 400ms normal ease-in-out forwards",
        "menu-close": "growUp 400ms normal ease-in-out forwards"
      },
      keyframes: {
        growDown: {
          'from': { transform: 'scaleY(0)' },
          'to': { transform: 'scaleY(1)' },
        },
        growUp: {
          'from': { transform: 'scaleY(1)' },
          'to': { transform: 'scaleY(0)' },
        }
      }
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce', 'hover'],
  },
  plugins: [
  ],
}

