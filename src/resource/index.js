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
	uri += `${params.sheetId}?includeGridData=false&fields=sheets(properties(sheetId%2Ctitle))&key=${params.apiKey}`;
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
	uri += `${conf.api.server}${params.sheetId}/values/`;
	// selected page?
	if (params.preferences.bySheet) {
		let selectedPage = params.selectedPage;
		if (!selectedPage) {
			selectedPage = params.pages[0];
		}
		// production
		if (selectedPage) {
			// append the !
			selectedPage += "!";
		}
		// grab the page
		return Vue.prototype.$http.get(`${uri}${selectedPage}${uriEnd}`);
	}
	// otherwise...
	const promises = params.pages.map(selectedPage => Vue.prototype.$http.get(`${uri}${selectedPage}!${uriEnd}`));
	// after all the promises have resolved...
	return Promise.all(promises);
}


// EXPORT
// =============================================================================
export {
	getPages,
	getDoc,
};
