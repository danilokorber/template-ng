module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'top-xs': '0 0 0 1px rgba(0, 0, 0, 0.05)',
        'top-sm': '0 1px -2px 0 rgba(0, 0, 0, 0.05)',
        'top-default': '0 1px -3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'top-md': '0 4px -6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'top-lg': '0 10px -15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'top-xl': '0 20px -25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'top-2xl': '0 25px -50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
    fontFamily: {
      sans: ['Titillium Web'],
    },
    // future: {
    //   removeDeprecatedGapUtilities: true,
    //   purgeLayersByDefault: true,
    //   defaultLineHeights: true,
    //   standardFontWeights: true,
    // },
  },

  variants: {},
  plugins: [],
};
