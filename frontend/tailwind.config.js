/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1152d4",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2230",
        "border-light": "#dbdfe6",
        "border-dark": "#2d3748",
        "text-primary-light": "#111318",
        "text-primary-dark": "#f0f2f4",
        "text-secondary-light": "#616f89",
        "text-secondary-dark": "#9ca3af"
      },
      fontFamily: {
        display: ["Inter", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px"
      }
    }
  },
  plugins: []
};

