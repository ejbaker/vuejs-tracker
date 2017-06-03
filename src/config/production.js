(function () {
	/**
	* PHILLY NOTIFICATIONS APP
	* configure settings
	* Global settings, imported by other configs.
	**/

	// third-party libraries
	const _ = require("lodash");
	// import the global settings
	const main = require("@/config/global");


	/*
	* Main module.
	* This is just an object in this case.
	*/
	const Main = _.extend({}, main);


	/*
	* PRIVATE PROPERTIES
	* const _privateBar;
	*/

	// GLOBAL
	// =============================================================================

	// SETTINGS -------------------------------
	Main.env = "production";
	Main.api = {
		domain: "https://sheets.googleapis.com",
		server: "/v4/spreadsheets/",
	};

	// export the finished module
	module.exports = Main;
}());
