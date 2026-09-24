/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f2ff",
          100: "#ede7ff",
          200: "#ddd0ff",
          300: "#c2a9ff",
          400: "#a37eff",
          500: "#8057f2",
          600: "#6d3ae6",
          700: "#5b2bcf",
          800: "#4c27a8",
          900: "#402485"
        },
        sidebar: "#f7f5ff",
        ink: {
          900: "#18122b",
          700: "#3c3654",
          500: "#6b6584",
          400: "#8b86a0"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 2px rgba(24,18,43,0.05), 0 4px 16px rgba(109,58,230,0.06)",
        composer: "0 8px 32px rgba(109,58,230,0.10), 0 1px 3px rgba(24,18,43,0.08)",
        pop: "0 12px 40px rgba(24,18,43,0.14)"
      },
      borderRadius: {
        xl2: "14px"
      }
    }
  },
  plugins: []
};
