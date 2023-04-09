/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        kaushan: "Kaushan Script",
        Montserrat: "Montserrat",
      },
      colors:{
        background: "#f6f2fa"

      },
      animation:{
        'my-pulse': 'my-pulse 3s ease-in-out infinite',
      },
      keyframes:{
        'my-pulse': {
          '0%, 100%': { opacity: '2' },
          '50%': { opacity: '0.6' },
        },
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
