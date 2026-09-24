/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#eef3ff",
          100: "#dfe9ff",
          200: "#c4d6ff",
          300: "#9db9ff",
          400: "#7590ff",
          500: "#5568f5",
          600: "#3f4de6",
          700: "#323bcf"
        }
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,64,0.06), 0 3px 10px rgba(63,77,230,0.06)",
        composer: "0 6px 24px rgba(63,77,230,0.12)"
      }
    }
  },
  plugins: []
};
