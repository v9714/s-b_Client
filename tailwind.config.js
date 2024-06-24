/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      ...colors,
      primary: "#79E179",
      secondary: "#00924c",
      textcolor: "#42B844",
      boldTextColor: "#212121",
      Description: "#6B6B6B",
      footerbg: "#D9D9D9",
      backGround2: "#F1F2F",
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
