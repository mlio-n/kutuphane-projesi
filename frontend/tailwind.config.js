/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Otomatik bulma yerine, dosyaların yerini elle gösteriyoruz:
    "node_modules/flowbite-react/dist/esm/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin
  ],
}