/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}",
            "./About.{js,jsx,ts,tsx}",
            "./components/DmDashboard.{js,jsx,ts,tsx}",
            "./components/Home.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [('nativewind/tailwind/css')],
}
