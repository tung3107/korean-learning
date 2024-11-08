/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        silver: "#F5F7FA",
        greyblue: "#ABBED1",
        tint5: "#E8F5E9",
        shade5: "#103E13",
        L_Grey: "#89939E",
        tint4: "#C8E6C9",
        shade4: "#1B5E1F",
        secondary: "#263238",
        grey: "#717171",
        success: "#2E7D31",
        tint3: "#A5D6A7",
        shade3: "#237d31",
        dgrey: "#4D4D4D",
        error: "#E53835",
        tint2: "#81C784",
        shade2: "#388E3B",
        black: "#263238",
        warning: "#FBC02D",
        tint1: "#66BB69",
        shade1: "#43A046",
        primary: "#28CB8B",
        lightwhite: "#f1f1f1",
        tint6: "#4CAF4F",
      },
      lineHeight: {
        12: "140%",
      },
      padding: {
        "px-28": "80px 80px 30px",
      },
      width: {
        "w-35%": "35%",
      },
    },
  },
  plugins: [],
};
