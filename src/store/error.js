// METHODS
// =============================================================================
// PUBLIC ----------------------------------

/**
 * Set the current error.
 *
 * @method setError
 * @param {object} state
 * @param {string} error
 */
function setError(state, error) {
	// set error
	state.error = error;
}

/**
 * Return the current error.
 *
 * @method currentError
 * @param {object} state
 */
function currentError(state) {
	return state.error;
}


/**
 * Change the current error.
 *
 * @method updateError
 * @param {object} commit
 * @param {string} error
 */
function updateError({ commit }, error) {
	// no errors
	if (!error) {
		commit("setError", "");
		return;
	}
	// correctly formatted error?
	if (error.code) {
		commit("setError", error);
		return;
	}
	// fix it
	error = error.response.data.error;
	// otherwise...
	commit("setError", error);
}


// EXPORT
// =============================================================================

export {
	currentError,
	setError,
	updateError,
};
