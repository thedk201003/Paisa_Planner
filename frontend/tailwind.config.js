/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your file structure
    "./public/index.html", // Ensure this is included if you have an HTML file in the public directory
  ],
  theme: {
    extend: {},
  },
  darkMode: 'media', // Change this to 'media' or remove it
  plugins: [],
}
