module.exports = {
  prefix: 'tw-',
  style: {
    postcss: {
      plugins: [
        require('tailwindcss')("./tailwind.config.js"),
        require('autoprefixer'),
      ],
    },
  },

}