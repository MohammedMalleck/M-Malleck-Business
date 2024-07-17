const path = require('path');

module.exports = {
  mode: 'development',
  entry: './script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',  // Injects styles into DOM
          'css-loader',    // Translates CSS into CommonJS
          'sass-loader' // Compiles Sass to CSS  
        ],
      },
    ],
  },
};
