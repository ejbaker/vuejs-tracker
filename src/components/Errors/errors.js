export default {
	// forbidden
	403: {
		message: "We don't have permission to use that spreadsheet!",
		solutions: [
			`Double-check your API key and Google Spreadsheet ID.
			In your share URL, the spreadsheet ID is the part between
			<strong>https://docs.google.com/spreadsheets/d/</strong> and <strong>/edit#gid=0</strong>.`,
			"If you're sure you're using the correct credentials, contact the developer.",
			`Making sure you <em>have</em> a share URL. If your spreadsheet isn't publicly
			visible to "anyone who has the link", then we might not be able to access it.`,
		],
	},
	// resource doesn't exist
	404: {
		message: "We can't find that spreadsheet!",
		solutions: [
			`Double-check your API key and Google Spreadsheet ID.
			In your share URL, the spreadsheet ID is the part between
			<strong>https://docs.google.com/spreadsheets/d/</strong> and <strong>/edit#gid=0</strong>.`,
			"If you're sure you're using the correct credentials, contact the developer.",
		],
	},
	// miscellaneous server failure?
	500: {
		message: "The server done goofed.",
		solutions: [
			"Refresh the page.",
			"If the problem persists, contact the developer.",
		],
	},
};
