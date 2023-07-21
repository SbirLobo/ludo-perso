/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ["Audiowide"],
      },
    },
    colors: {
      dark: "#202020",
      white: "#FFFFFF",
      yellow: "#EEB71B",
      blue: "#4268FF",
      pink: "#FF4A96",
    },
  },
  plugins: [],
};
