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
	// call pullPages
	pullPages({ commit }, params)
		// success
		.then((pages) => {
			// update pages
			params.pages = pages;
			// call pullDoc
			return pullDoc({ commit }, params);
		})
		// errors
		.catch((err) => {
			console.log(err);
		});
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
		selectedPage: null,
		pages: [],
		doc: [],
		template: demo,
		showPreview: false,
	},
	getters: {
		user: currentUser,
		page: selectedPage,
		pages: currentPages,
		doc: currentDoc,
		showPreview: currentShowPreview,
		template: currentTemplate,
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
	},
	mutations: {
		setUser,
		setPage,
		setDoc,
		setPages,
		setShowPreview,
		setTemplate,
	},
});


// EXPORT
// =============================================================================

export default store;
