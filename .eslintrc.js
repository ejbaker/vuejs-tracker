// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: "babel-eslint",
	parserOptions: {
		sourceType: "module",
	},
	env: {
		browser: true,
	},
	extends: "airbnb-base",
	// required to lint *.vue files
	plugins: [
		"html"
	],
	// check if imports actually resolve
	"settings": {
		"import/resolver": {
			"webpack": {
			"config": "build/webpack.base.conf.js"
			}
		}
	},
	// add your custom rules here
	"rules": {
		// wtf
		"import/no-dynamic-require": "off",
		// brace style
		"brace-style": ["error", "stroustrup"],
		// let functions be hoisted
		"no-use-before-define": ["error", "nofunc"],
		// allow unnamed functions
		"func-names": "off",
		// allow requires
		"global-require": "off",
		// linebreak style
		"linebreak-style": ["error", "unix"],
		// no console (turn back on in production)
		// "no-console": ["error", { allow: ["warn", "error"] }],
		"no-console": "off",
		// turn off inability to modify parameters :P
		"no-param-reassign": "off",
		// allow -- and ++ operators
		"no-plusplus": "off",
		// tab style
		"no-tabs": "off",
		"indent": ["error", "tab"],
		// semi-colons
		"semi": ["error", "always"],
		// double quotes only
		"quotes": ["error", "double", {
			"avoidEscape": true,
		}],
		// don"t require .vue extension when importing
		"import/extensions": ["error", "always", {
			"js": "never",
			"vue": "never"
		}],
		"import/newline-after-import": "off",
		// allow optionalDependencies
		"import/no-extraneous-dependencies": ["error", {
			"optionalDependencies": ["test/unit/index.js"]
		}],
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
	}
}
