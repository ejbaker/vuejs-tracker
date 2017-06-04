// DEPENDENCIES
// =============================================================================
// DEFAULT TEMPLATE
import demo from "@/components/UserTemplate/demo";

// VUE ----------------------------------
import Vue from "vue";
import Vuex from "vuex";

// SIBLINGS ----------------------------------
import { currentDoc, setDoc, pullDoc } from "@/store/doc";
import { selectedPage, setPage, selectPage, pullPage } from "@/store/page";
import { currentPages, setPages, pullPages } from "@/store/pages";
import { currentUser, setUser, login, pullUser } from "@/store/user";
import { currentShowPreview, setShowPreview, updateShowPreview, pullShowPreview } from "@/store/preview";
import { currentTemplate, setTemplate, updateTemplate, pullTemplate } from "@/store/template";
import { currentError, setError, updateError } from "@/store/error";

// SETUP
// =============================================================================
// use vuex
Vue.use(Vuex);


// ACTIONS
// =============================================================================

/**
 * Log out.
 *
 * @method logout
 * @param {object} commit
 */
function logout({ commit }) {
	// hide preview
	commit("setShowPreview", false);
	// remove page
	commit("setPage", "");
	// remove pages
	commit("setPages", []);
	// remove doc
	commit("setDoc", []);
	// remove template
	commit("setTemplate", demo);
	// remove user
	commit("setUser", {
		apiKey: "",
		sheetId: "",
		loggedIn: false,
		preferences: {},
	});
	// clear error
	commit("setError", "");
}

/**
 * Reload the document.
 *
 * @method reloadDoc
 * @param {object} commit
 * @param {object} params
 */
function reloadDoc({ commit }, params) {
	// check and empty local storage
	commit("setPages", []);
	commit("setDoc", []);
	commit("setPage", params.selectedPage);
	commit("setError", "");
	// call pullPages
	pullPages({ commit }, params)
		// success
		.then((pages) => {
			// update pages
			params.pages = pages;
			// call pullDoc
			return pullDoc({ commit }, params);
		})
		// set error (requires formatting)
		.catch(err => updateError({ commit }, err));
}


// STORE
// =============================================================================

/**
 * @property store
 */
const store = new Vuex.Store({
	state: {
		user: {
			apiKey: "",
			sheetId: "",
			loggedIn: false,
			preferences: {},
		},
		selectedPage: "",
		pages: [],
		doc: [],
		template: demo,
		showPreview: false,
		error: "",
	},
	getters: {
		user: currentUser,
		page: selectedPage,
		pages: currentPages,
		doc: currentDoc,
		showPreview: currentShowPreview,
		template: currentTemplate,
		error: currentError,
	},
	actions: {
		logout,
		login,
		selectPage,
		pullPage,
		pullUser,
		pullDoc,
		pullTemplate,
		reloadDoc,
		pullPages,
		pullShowPreview,
		updateShowPreview,
		updateTemplate,
		updateError,
	},
	mutations: {
		setUser,
		setPage,
		setDoc,
		setPages,
		setShowPreview,
		setTemplate,
		setError,
	},
});


// EXPORT
// =============================================================================

export default store;
