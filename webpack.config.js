var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.resolve('app'),
	entry: {
		'app': [
			'./app'
			, './css/styles.less'
		]
		// , 'detail': './detail.js'
	},
	watch: true,
	output: {
		path: path.resolve('app/js/'),
		publicPath: path.resolve('app/'),
		filename: '[name].bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.(es6|js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader?indentedSyntax=true&sourceMap=true')
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
				loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
			},
			{
				test: /\.ejs$/,
				loader: 'ejs-html'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Backbone : 'backbone',
			_ : 'underscore'
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.es6', '.ejs']
	}
}
