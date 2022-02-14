module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Mitr', 'sans-serif'],
      },
      animation:{
        "menu-open": "growDown 200ms ease-in-out forwards",
        "menu-close": "growUp 200ms normal ease-in-out forwards",
        "menuopen": "max-height 1s ease-in-out"
      }
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce', 'hover']
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
