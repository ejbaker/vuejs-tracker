// DEPENDENCIES
// =============================================================================
// THIRD-PARTY ----------------------------------
import axios from "axios";
// VUE ----------------------------------
import Vue from "vue";

// APP ----------------------------------
import conf from "@/config";
// import router from "@/router";
// import format from "@/resource/format";

// use resource
Vue.prototype.$http = axios;


// METHODS
// =============================================================================
// PUBLIC ---------------------------------

/**
 * Get pages.
 *
 * @method getPages
 * @param {object} params
 * @return {promise}
 */
function getPages(params) {
	// uri, to change when in dev
	let uri = conf.api.domain;
	// optionally add port
	if (conf.api.port) {
		uri += `:${conf.api.port}`;
	}
	// add the server
	uri += conf.api.server;
	// environment check
	if (conf.env === "development") {
		// complete the string
		uri += `${params.apiKey}/sheets.json`;
	}
	// otherwise...
	else {
		uri += `${params.sheetId}?includeGridData=false&fields=sheets(properties(sheetId%2Ctitle))&key=${params.apiKey}`;
	}
	// get resource
	return Vue.prototype.$http.get(uri);
}

/**
 * Get doc.
 *
 * @method getDoc
 * @param {object} params
 * @return {promise}
 */
function getDoc(params) {
	// domain
	let uri = conf.api.domain;
	// end of uri, used in production only
	const uriEnd = `A1%3AZ100?majorDimension=ROWS&key=${params.apiKey}`;
	// optionally add port
	if (conf.api.port) {
		uri += `:${conf.api.port}`;
	}
	// add the server
	uri += conf.api.server;
	// environment check
	if (conf.env === "development") {
		// complete the string
		uri += `${params.apiKey}/`;
	}
	// otherwise...
	else {
		uri += `${params.sheetId}/values/`;
	}
	// selected page?
	if (params.preferences.bySheet) {
		let selectedPage = params.selectedPage;
		// handle development
		if (conf.env === "development") {
			if (!selectedPage) {
				selectedPage = "May, 2017";
			}
			// grab the page
			return Vue.prototype.$http.get(`${uri}${selectedPage}.json`);
		}
		// production
		if (selectedPage) {
			// append the !
			selectedPage += "!";
		}
		// grab the page
		return Vue.prototype.$http.get(`${uri}${selectedPage}${uriEnd}`);
	}
	// set promises
	let promises;
	// in development, grab from fake-storage
	if (conf.env === "development") {
		promises = params.pages.map(selectedPage => Vue.prototype.$http.get(`${uri}${selectedPage}.json`));
	}
	// otherwise...
	else {
		promises = params.pages.map(selectedPage => Vue.prototype.$http.get(`${uri}${selectedPage}!${uriEnd}`));
	}
	// after all the promises have resolved...
	return Promise.all(promises);
}


// EXPORT
// =============================================================================
export {
	getPages,
	getDoc,
};
