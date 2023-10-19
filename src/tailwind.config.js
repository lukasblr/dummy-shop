module.exports = {
  daisyui: {
    themes: [
      "light",
      "dark",
      "lofi",
    ],
    plugins: [require('flowbite/plugin')],
    plugins: [require("daisyui")],
    content: ["./node_modules/flowbite/*.js"],
  },
};
