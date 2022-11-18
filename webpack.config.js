const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		// clean: true,
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		open: true,
	},
};
