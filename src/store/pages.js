// DEPENDENCIES
// =============================================================================
// APP ----------------------------------
import { isEmpty } from "lodash";
// local
import local from "@/store/local";
// resource
import { getPages as get } from "@/resource";
// format
import { formatPages } from "@/resource/format";


// PROPERTIES
// =============================================================================
// PRIVATE ----------------------------------
const STORAGE_KEY = "vuejs-threadtracker-pages";


// METHODS
// =============================================================================
// PUBLIC ----------------------------------

/**
 * Set the pages.
 *
 * @method setPages
 * @param {object} state
 * @param {object} pages
 */
function setPages(state, pages) {
	// save to local storage
	local.save(STORAGE_KEY, pages);
	// set pages
	state.pages = pages;
}

/**
 * Return the current pages.
 *
 * @method currentPages
 * @param {object} state
 */
function currentPages(state) {
	return state.pages;
}

/**
 * Get the pages from a document.
 *
 * @method pullPages
 * @param {object} commit
 * @param {object} params
 */
function pullPages({ commit }, params) {
	// check local storage
	if (local.exists(STORAGE_KEY)) {
		// get data
		const data = local.get(STORAGE_KEY);
		// don't update nonexistent data
		if (!isEmpty(data)) {
			// commit to the store
			commit("setPages", data);
			// done
			return Promise.resolve(data);
		}
	}
	// otherwise...
	return new Promise((resolve, reject) => {
		// make the request
		get(params).then(
			(response) => {
				// get body data
				const pages = formatPages(response.data);
				// commit to the store
				commit("setPages", pages);
				// resolve the promise
				resolve(pages);
			},
			// reject the promise
			reject,
		);
	});
}


// EXPORT
// =============================================================================

export {
	currentPages,
	pullPages,
	setPages,
};
