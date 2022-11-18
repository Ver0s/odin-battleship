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
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader',
				// use: {
				// 	loader: 'babel-loader',
				// 	options: {
				// 		presets: ['@babel/preset-env'],
				// 	},
				// },
			},
		],
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		open: true,
	},
};
