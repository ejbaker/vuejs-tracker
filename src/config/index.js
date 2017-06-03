(function () {
	/**
	* PHILLY NOTIFICATIONS APP
	* configure settings
	* Sets up the Node server with Express.
	**/

	// grab environment variables
	const env = process.env.NODE_ENV || process.env.npm_config_environment || process.env.npm_package_config_environment || "production";
	// nab from command line
	const debug = (process.env.npm_config_debugmode === "true");
	// import config based on environment
	const Main = require(`@/config/${env}`);
	// add debug from command line
	Main.debug = debug;
	// print information about environment.
	if (Main.debug) {
		console.log("Running app in", env, "mode. Debug is on.");
	}
	// export completed config file
	module.exports = Main;
}());
