const withMT = require("@material-tailwind/html/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{html,ts}",
  ],  theme: {
    extend: {},
  },
  plugins: [],
});