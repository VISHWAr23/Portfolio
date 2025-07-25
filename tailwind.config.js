export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: "#00ffcc",
          500: "#00f7a5",
          600: "#00e99c",
        },
        gray: {
          800: "#1a1d24",
          900: "#0e1013",
        },
        black: "#0a0a0a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 255, 204, 0.5)",
      },
    },
  },
  plugins: [],
};
