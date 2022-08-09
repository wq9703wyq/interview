/*
 * @Descripttion: 
 * @version: 
 * @Author: 鹿角兔子
 * @Date: 2022-03-18 21:00:26
 * @LastEditors: 鹿角兔子
 * @LastEditTime: 2022-03-18 21:00:26
 */
/* eslint-disable no-undef */
const webpack = require('webpack');
process.env.VUE_APP_VERSION = `v${require('./package.json').version}`; // 获取版本号
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}
const { name: appName } = require('./package');
module.exports = {
	publicPath: './',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	chainWebpack(config) {
		// set svg-sprite-loader
		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/plugins/libs/assets/icons'))
			.end();
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/plugins/libs/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end();
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@mock': resolve('mock'),
				'@libs': resolve('src/plugins/libs')
			}
		},
		output: {
			library: `${appName}-[name]`,
			// 把子应用打包成 umd 库格式 jsonpFunction: `webpackJsonp_${appName}`
			libraryTarget: 'umd'
		},
		plugins: [
			new webpack.optimize.MinChunkSizePlugin({
				minChunkSize: process.env.NODE_ENV === 'production' ? 1024 * 200 : 0
			})
		]
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: '@import "~@/style/variables.scss"; @import "~@/style/mixin.scss";'
			},
			sass: {
				implementation: require('sass') // This line must in sass option
			}
		}
	},
	devServer: {
		port: 8081,
		// 配置开发环境跨域
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		proxy: {
			'^/portal': {
				// target: 'https://portal-gateway-uat.spaceplat.com/portal/v1',
				// target: 'http://portal-gateway-sit.space.com/prtal/v1',
				target: 'http://portal-gateway-idev.space.com',
				// target: 'http://portal-gateway-idev.space.com/portal/v1/',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'/portal': '/'
				}
			},
			'^/userCenter': {
				target: 'http://backend.sit.svc.portal.local:8070/portal/v1/userCenter',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'/userCenter': '/'
				}
			},
			'^/space': {
				target: 'http://space.sit.svc.portal.local:8071/space/v1',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'/space': '/'
				}
			},
			'^/ability/message': {
				target: 'http://message-gateway.sit.svc.public.local:8550', // 这里根据需要改为本地开发地址
				ws: true,
				changeOrigin: true
			},
			'^/ability': {
				target: 'http://gateway-web.sit.svc.spaceiot.local:8000', // 这里根据需要改为本地开发地址
				// target: 'http://gateway-web.fat.svc.spaceiot.local:8000', // 这里根据需要改为本地开发地址
				ws: true,
				changeOrigin: true
			},
			'^/iot': {
				target: 'http://gateway-web.sit.svc.spaceiot.local:8000', // 这里根据需要改为本地开发地址
				// target: 'http://gateway-web.fat.svc.spaceiot.local:8000', // 这里根据需要改为本地开发地址

				ws: true,
				changeOrigin: true
			},
			'^/estate': {
				target: 'http://gateway-web.sit.svc.spaceiot.local:8000', // 这里根据需要改为本地开发地址
				// target: 'http://gateway-web.fat.svc.spaceiot.local:8000', // 这里根据需要改为本地开发地址

				ws: true,
				changeOrigin: true
			},
			'^/api/api-workorder': {
				target: 'http://172.16.163.68', // 这里根据需要改为本地开发地址
				ws: true,
				changeOrigin: true
			},
			'^/api-workorder': {
				target: 'http://spaas-sit.space.com', // 这里根据需要改为本地开发地址
				ws: true,
				changeOrigin: true
			},
			'^/solution': {
				target: 'http://gateway-web.sit.svc.spaceiot.local:8000', // 这里根据需要改为本地开发地址
				// target: 'http://gateway-web.fat.svc.spaceiot.local:8000', // 这里根据需要改为本地开发地址
				ws: true,
				changeOrigin: true
			}
		},
		headers: {
			'Access-Control-Allow-Origin': '*' // 配置开发环境跨域
		},
		before(app, server, compiler) {
			console.log(app, server, compiler);
		}
		// before: require('./mock/mock-server.js')
	}
};
