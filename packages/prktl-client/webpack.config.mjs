import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';
import webpack from 'webpack';
import fs from 'fs';

const packageConfig = JSON.parse(fs.readFileSync('./package.json'));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../.env')});

export default (env, args) => {
	args.mode = args.mode || 'development';
	const dev = args.mode  == 'development';
	return {
		entry: {
			'app': {import: './src/index.ts', filename: 'bundle.js'},
		},
		mode: args.mode,
		devtool: dev ? 'eval-source-map' : false,
		externals: {
			// 'monaco-editor': 'monaco-editor',
			// highcharts: 'Highcharts',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			// publicPath: (dev ? '' : process.env.RP_APP_ROOT),
		},
		module: {
			rules: [{
				test: /\.tsx?$/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: false, // Set to true if you are using fork-ts-checker-webpack-plugin
						projectReferences: true
					}
				}
			}, {
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, {
				test: /\.ttf$/,
				type: 'asset/resource'
			}],
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx']
		},
		devServer: {
			// static: [
			// 	{directory: '../rp-static/libs', publicPath: '/libs'},
			// 	{directory: '../rp-static', publicPath: '/'},
			// ],
			proxy: [{
				context: ['/_prktl'],
				target: `${process.env.PRKTL_SERVER_URL}`,
				secure: false,
				changeOrigin: true
			}],
			hot: true,
			compress: true,
			port: process.env.PRKTL_CLIENT_PORT || 3001,
			client: {
				overlay: false,
				logging: 'info'
			},
			historyApiFallback: {
				index: "/"
			},
		},
		watchOptions: {
			poll: process.env.DOCKER_RUNNING == 'true',
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				title: 'PRKTL',
				template: './static/index.html',
				//inject: 'body',
				hash: true,
				// publicPath: dev ? 'auto' : (process.env.RP_APP_ROOT + '/js'),
			}),
			new webpack.DefinePlugin({
				'process.env.PACKAGE_NAME': JSON.stringify(packageConfig.name),
				'process.env.PACKAGE_VERSION': JSON.stringify(packageConfig.version),
				'process.env.MODE': JSON.stringify(dev ? 'development' : 'production'),
				'process.env.PRKTL_SERVER_URL': JSON.stringify(process.env.PRKTL_SERVER_URL)
			})
		]
	};
};
