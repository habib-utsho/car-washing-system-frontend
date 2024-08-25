/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#FFC000", //#f78f25
        primary: {
          DEFAULT: "#FFC000",
          50: "#FFF2CC",
          100: "#FFE699",
          200: "#FFDB66",
          300: "#FFD033",
          400: "#FFC500",
          500: "#E6B200",
          600: "#CC9F00",
          700: "#B28C00",
          800: "#997A00",
          900: "#806600",
        },

        secondary: "#33E7D2",
        "gray": "#CCCCCC",
        dark: "#28282B",
        white: "#FFFFFF",
        success: "#32CD32",
        "normal-desc": "#8A90A2",
        charming: "#fe6601",
        danger: "#FF0000",
      },
    },
  },
  plugins: [],
};
