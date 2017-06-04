(function () {
	// third-party libraries
	const { extend } = require("lodash");
	// import the global settings
	const main = require("@/config/global");


	/*
	* Main module.
	* This is just an object in this case.
	*/
	const Main = extend({}, main);


	/*
	* PRIVATE PROPERTIES
	* const _privateBar;
	*/

	// GLOBAL
	// =============================================================================

	// SETTINGS -------------------------------
	Main.env = "development";
	/*
	Main.api = {
		domain: "http://localhost",
		server: "/static/fake-server/",
		port: "8080",
	};
	*/

	// export the finished module
	module.exports = Main;
}());
