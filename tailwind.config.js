/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#9333EA"
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "sans-serif"]
      }
    }
  },
  plugins: []
};
