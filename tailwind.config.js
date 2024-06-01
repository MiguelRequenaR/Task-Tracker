/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2e2f33',
        'secondary': '#1db954',
        'tertiary': '#ffffff',
      },
    },
  },
  plugins: [],
}

