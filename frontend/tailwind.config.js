/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "lemon-100": "#fce4cb",
        "lemon-200": "#f9c897",
        "lemon-300": "#f6ad62",
        "lemon-400": "#f3912e",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
  },
};
