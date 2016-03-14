'use strict';

module.exports = {
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			}
		]
	}
};
