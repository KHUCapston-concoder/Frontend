module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    mytheme: {
      neutral: "#191D24",
      "base-100": "#2A303C",
    },
  },
  plugins: [require("daisyui")],
};
