// DEPENDENCIES
// =============================================================================
// APP ----------------------------------
// local
import local from "@/store/local";


// PROPERTIES
// =============================================================================
// PRIVATE ----------------------------------
const STORAGE_KEY = "vuejs-threadtracker-user";


// METHODS
// =============================================================================
// PUBLIC ----------------------------------

/**
 * Set the current user.
 *
 * @method setUser
 * @param {object} state
 * @param {string} user
 */
function setUser(state, user) {
	// logged in?
	user.loggedIn = (user.apiKey !== "" && user.sheetId !== "");
	// save to local storage
	local.save(STORAGE_KEY, user);
	// set user
	state.user = user;
}

/**
 * Return the current selected user.
 *
 * @method currentUser
 * @param {object} state
 */
function currentUser(state) {
	return state.user;
}

/**
 * Update user.
 *
 * @method login
 * @param {object} commit
 * @param {object} user
 */
function login({ commit }, user) {
	// otherwise...
	commit("setUser", user);
}

/**
 * Get user from local storage, if they exist.
 *
 * @method pullUser
 * @param {object} commit
 */
function pullUser({ commit }) {
	let data;
	// check local storage
	if (local.exists(STORAGE_KEY)) {
		// get data
		data = local.get(STORAGE_KEY);
		// commit to the store
		commit("setUser", data);
		// return the promise
		return Promise.resolve(data);
	}
	// otherwise...
	data = {
		apiKey: "",
		sheetId: "",
		loggedIn: false,
		preferences: {
			bySheet: false,
			nestedData: false,
			useLabels: true,
		},
	};
	// commit new, empty user
	commit("setUser", data);
	// return the promise
	return Promise.resolve(data);
}


// EXPORT
// =============================================================================

export {
	currentUser,
	setUser,
	login,
	pullUser,
};
