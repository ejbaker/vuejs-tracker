(function () {
	/*
	* Main module.
	* This is just an object in this case.
	*/
	const Main = {};

	// GLOBAL
	// =============================================================================

	// SETTINGS -------------------------------
	Main.env = "production";
	Main.api = {
		domain: "https://sheets.googleapis.com",
		server: "/v4/spreadsheets/",
	};

	module.exports = Main;
}());
