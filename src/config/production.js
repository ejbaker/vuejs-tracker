(function () {
	// third-party libraries
	const { extend } = require("lodash");
	// import the global settings
	const main = require("@/config/global");

	const Main = extend({}, main);

	// export the finished module
	module.exports = Main;
}());
