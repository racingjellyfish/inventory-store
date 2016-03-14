'use strict';

let webpack = require('webpack');
let webpackConfigCommon = require('./webpack.config.common');

module.exports = function (config) {
	config.set({
		browsers: [
			'Chrome'
		],
		singleRun: true,
		frameworks: [
			'mocha'
		],
		files: [
			'tests.webpack.js'
		],
		preprocessors: {
			'tests.webpack.js': [
				'webpack',
				'sourcemap'
			]
		},
		reporters: [ 'dots' ],
		webpack: {
			devtool: 'inline-source-map',
			module: webpackConfigCommon.module
		},
		webpackServer: {
			noInfo: true
		}
	});
};
