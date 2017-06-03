// DEPENDENCIES
// =============================================================================
// APP ----------------------------------
// local
import local from "@/store/local";


// PROPERTIES
// =============================================================================
// PRIVATE ----------------------------------
const STORAGE_KEY = "vuejs-threadtracker-show-preview";


// METHODS
// =============================================================================
// PUBLIC ----------------------------------

/**
 * Set the current selected showPreview.
 *
 * @method setShowPreview
 * @param {object} state
 * @param {boolean} showPreview
 */
function setShowPreview(state, showPreview) {
	// save to local storage
	local.save(STORAGE_KEY, showPreview);
	// set showPreview
	state.showPreview = showPreview;
}

/**
 * Return the current selected showPreview.
 *
 * @method selectedShowPreview
 * @param {object} state
 */
function currentShowPreview(state) {
	return state.showPreview;
}

/**
 * Update showPreview.
 *
 * @method updateShowPreview
 * @param {object} commit
 * @param {boolean} showPreview
 */
function updateShowPreview({ commit }, showPreview) {
	// otherwise...
	commit("setShowPreview", showPreview);
}

/**
 * Change the current selected showPreview.
 *
 * @method selectShowPreview
 * @param {object} commit
 * @param {boolean} showPreview
 */
function pullShowPreview({ commit }, showPreview) {
	// check local storage
	if (local.exists(STORAGE_KEY)) {
		// get data
		const data = local.get(STORAGE_KEY);
		// commit to the store
		commit("setShowPreview", data);
		// done
		return Promise.resolve(data);
	}
	// otherwise...
	commit("setShowPreview", showPreview);
	// return the promise
	return Promise.resolve(showPreview);
}


// EXPORT
// =============================================================================

export {
	currentShowPreview,
	setShowPreview,
	pullShowPreview,
	updateShowPreview,
};
