module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          accent: "#00adb5",
          warning: "#B73E3E",
          neutral: "#1b2128",
          "base-100": "#222831",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
