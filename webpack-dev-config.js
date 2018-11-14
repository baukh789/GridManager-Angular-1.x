const path = require('path');
const genRules = require('./webpack-common.loader');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const config = {
	// map
	devtool : 'source-map',  // TODO  http://www.css88.com/doc/webpack2/configuration/devtool/

	// 入口文件配置
	context: path.join(__dirname, "src/"),

	// 入口文件配置
	entry: {
		js: './demo/app.js'
	},

	// 配置模块如何解析
	resolve:{
		extensions: [".js"] //当requrie的模块找不到时,添加这些后缀
	},

	// 自动补全loader
	resolveLoader: {
		moduleExtensions: ['-loader']
	},

    // 以插件形式定制webpack构建过程
    plugins: [
        // 将样式文件 抽取至独立文件内
        new ExtractTextWebpackPlugin({
            filename: 'webpack-dev-file/css/gm-angular.css',
            disable: false,
            allChunks: true
        })
    ],

	// 文件导出的配置
	output:{
		// path: '/' ,
		filename: "webpack-dev-file/js/gm-angular.js",
		// publicPath 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
		publicPath: "/"
	},

	// 处理项目中的不同类型的模块
	module: {
		rules: genRules('src', true)
	}
};

module.exports = config;
