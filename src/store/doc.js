// DEPENDENCIES
// =============================================================================
// THIRD-PARTY ----------------------------------
// lodash
import { isEmpty, isArray } from "lodash";

// APP ----------------------------------
// local
import local from "@/store/local";
// resource
import { getDoc as get } from "@/resource";
// format
import { formatDoc, formatPage } from "@/resource/format";


// PROPERTIES
// =============================================================================
// PRIVATE ----------------------------------
const STORAGE_KEY = "vuejs-threadtracker-doc";


// METHODS
// =============================================================================
// PUBLIC ----------------------------------

/**
 * Set the document.
 *
 * @method setDoc
 * @param {object} state
 * @param {object} doc
 */
function setDoc(state, doc) {
	// save to local storage
	local.save(STORAGE_KEY, doc);
	// set doc
	state.doc = doc;
}

/**
 * Return the current document.
 *
 * @method currentDoc
 * @param {object} state
 */
function currentDoc(state) {
	return state.doc;
}

/**
 * Get the document.
 *
 * @method pullDoc
 * @param {object} commit
 * @param {object} params
 */
function pullDoc({ commit }, params) {
	// check local storage
	if (local.exists(STORAGE_KEY)) {
		// get data
		const data = local.get(STORAGE_KEY);
		// does data exist?
		if (!isEmpty(data)) {
			// commit to the store
			commit("setDoc", data);
			// done
			return Promise.resolve(data);
		}
	}
	// otherwise...
	return new Promise((resolve, reject) => {
		// otherwise, make the request
		get(params).then(
			(response) => {
				// set data
				let doc;
				// array of responses vs singular response
				if (isArray(response)) {
					doc = formatDoc(response, params);
				}
				// otherwise...
				else {
					doc = formatPage(response.data.values, params.preferences);
				}
				// commit to the store
				commit("setDoc", doc);
				// resolve the promise
				resolve(doc);
			},
			// reject the promise
			reject,
		);
	});
}


// EXPORT
// =============================================================================

export {
	currentDoc,
	pullDoc,
	setDoc,
};
