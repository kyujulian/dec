/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semicolon: true,
  singleQuote: true,
  bracketSameLine: true,
  printWidth: 80,
};

module.exports = config;
