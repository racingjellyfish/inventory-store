'use strict';

module.exports = {
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			}
		]
	}
};
