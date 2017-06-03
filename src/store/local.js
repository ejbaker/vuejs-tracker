// DEPENDENCIES
// =============================================================================
import { isString } from "lodash";

// METHODS
// =============================================================================

/**
 * Returns true if data exists.
 *
 * @method exists
 * @param {string} key
 * @return {boolean}
 */
function exists(key) {
	return (window.localStorage.getItem(key) !== null);
}

/**
 * Get from local storage.
 *
 * @method get
 * @param {string} key
 * @param {boolean} simple (optional)
 * @return {object} data
 */
function get(key, simple) {
	// get data
	const data = window.localStorage.getItem(key);
	// no need to parse data
	if (simple || !isString(data)) {
		return data;
	}
	// otherwise, parse it
	return JSON.parse(data);
}

/**
 * Save to local storage.
 *
 * @method save
 * @param {string} key
 * @param {object} data
 * @param {boolean} simple (optional)
 */
function save(key, data, simple) {
	// stringify it
	if (!simple && !isString(data)) {
		data = JSON.stringify(data);
	}
	// save it
	window.localStorage.setItem(key, data);
}


// EXPORT
// =============================================================================

export default {
	exists,
	get,
	save,
};
