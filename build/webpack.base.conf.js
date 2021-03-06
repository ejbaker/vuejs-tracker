// Hack for Ubuntu on Windows: interface enumeration fails with EINVAL, so return empty.
try {
	require("os").networkInterfaces();
} catch (e) {
	require('os').networkInterfaces = () => ({});
}

const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");

function resolve(dir) {
	return path.join(__dirname, "..", dir)
};

module.exports = {
	entry: {
		app: "./src/main.js"
	},
	output: {
		path: config.build.assetsRoot,
		filename: "[name].js",
		publicPath: process.env.NODE_ENV === "production"
		? config.build.assetsPublicPath
		: config.dev.assetsPublicPath
	},
	resolve: {
		extensions: [".js", ".vue", ".json"],
		alias: {
			"vue$": "vue/dist/vue.esm.js",
			"@": resolve("src"),
			"COMP": resolve("src/components"),
			"STYLES": resolve("src/assets/styles"), 
		}
	},
	module: {
		rules: [
			// vue and js
			{
				test: /\.(js|vue)$/,
				loader: "eslint-loader",
				enforce: "pre",
				include: [resolve("src"), resolve("test")],
				options: {
					formatter: require("eslint-friendly-formatter")
				}
			},
			// vue
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: vueLoaderConfig
			},
			// js
			{
				test: /\.js$/,
				loader: "babel-loader",
				include: [resolve("src"), resolve("test")]
			},
			// images
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: "url-loader",
				query: {
					limit: 10000,
					name: utils.assetsPath("img/[name].[hash:7].[ext]")
				}
			},
			// fonts
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: "url-loader",
				query: {
					limit: 10000,
					name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
				}
			},
		],
	},
};
