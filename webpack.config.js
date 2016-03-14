'use strict';

let path = require('path');
let webpackConfigCommon = require('./webpack.config.common');

module.exports = {
	entry: './src/app/App.js',
	output: {
		path: path.join(__dirname, 'public/js'),
		filename: 'bundle.js'
	},
	module: webpackConfigCommon.module
};
