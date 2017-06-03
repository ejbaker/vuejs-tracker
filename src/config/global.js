(function () {
	/**
	* PHILLY NOTIFICATIONS APP
	* configure settings
	* Global settings, imported by other configs.
	**/

	// third-party libraries
	// const _ = require("lodash");

	/*
	* Main module.
	* This is just an object in this case.
	*/
	const Main = {};


	/*
	* PRIVATE PROPERTIES
	* const _privateBar;
	*/

	// GLOBAL
	// =============================================================================

	// SETTINGS -------------------------------
	// team IDs
	Main.teamIds = {
		eagles: 354,
		flyers: 4968,
		phillies: 246,
		sixers: 20,
	};


	/*
	* EXPORT THE FINISHED CLASS
	* module.exports = className;
	*/

	module.exports = Main;
}());
