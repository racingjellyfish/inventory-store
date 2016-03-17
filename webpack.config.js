'use strict';

let path = require('path');
let webpack = require("webpack");
let webpackConfigCommon = require('./webpack.config.common');

var IN_PROD = (process.env.NODE_ENV === 'production');

module.exports = {
	devtool: 'source-map',
	entry: './src/app/App.js',
	module: webpackConfigCommon.module,
	output: {
		path: path.join(__dirname, 'public/js'),
		filename: IN_PROD ? 'bundle.min.js' : 'bundle.js'
	},
	plugins: IN_PROD ? [
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	] : []
};
