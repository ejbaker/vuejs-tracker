// DEPENDENCIES
// =============================================================================
// APP ----------------------------------
// local
import local from "@/store/local";


// PROPERTIES
// =============================================================================
// PRIVATE ----------------------------------
const STORAGE_KEY = "vuejs-threadtracker-page";


// METHODS
// =============================================================================
// PUBLIC ----------------------------------

/**
 * Set the current selected page.
 *
 * @method setPage
 * @param {object} state
 * @param {string} page
 */
function setPage(state, page) {
	// save to local storage with 'simple' flag set
	local.save(STORAGE_KEY, page, true);
	// set page
	state.selectedPage = page;
}

/**
 * Return the current selected page.
 *
 * @method selectedPage
 * @param {object} state
 */
function selectedPage(state) {
	return state.selectedPage;
}


/**
 * Change the current page.
 *
 * @method login
 * @param {object} commit
 * @param {string} page
 */
function selectPage({ commit }, page) {
	// otherwise...
	commit("setPage", page);
}

/**
 * Pull the current page from storage.
 *
 * @method pullPage
 * @param {object} commit
 * @param {string} page
 */
function pullPage({ commit }) {
	// check local storage
	if (local.exists(STORAGE_KEY)) {
		// get data with 'simple' flag set
		const data = local.get(STORAGE_KEY, true);
		// commit to the store
		commit("setPage", data);
		// done
		return Promise.resolve(data);
	}
	// otherwise...
	commit("setPage", "");
	// done
	return Promise.resolve("");
}


// EXPORT
// =============================================================================

export {
	selectedPage,
	setPage,
	selectPage,
	pullPage,
};
