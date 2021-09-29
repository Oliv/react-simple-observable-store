const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    demo: './demo/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
	mode: 'development',
	watch: true,
	cache: true,
	devtool: 'source-map',
	stats: {
		colors: true,
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  }
};
