// DEPENDENCIES
// =============================================================================
// APP ----------------------------------
// local
import local from "@/store/local";
// default template
import demoTemplate from "@/components/UserTemplate/demo";
// const demoTemplate = JSON.stringify(demo);

// PROPERTIES
// =============================================================================
// PRIVATE ----------------------------------
const STORAGE_KEY = "vuejs-threadtracker-template";


// METHODS
// =============================================================================
// PUBLIC ----------------------------------

/**
 * Set the current template.
 *
 * @method setTemplate
 * @param {object} state
 * @param {string} template
 */
function setTemplate(state, template) {
	// save to local storage with 'simple' flag set
	local.save(STORAGE_KEY, template, true);
	// set template
	state.template = template;
}

/**
 * Return the current template.
 *
 * @method currentTemplate
 * @param {object} state
 */
function currentTemplate(state) {
	return state.template;
}


/**
 * Change the current template.
 *
 * @method updateTemplate
 * @param {object} commit
 * @param {string} template
 */
function updateTemplate({ commit }, template) {
	// otherwise...
	commit("setTemplate", template);
}

/**
 * Pull the current template from storage.
 *
 * @method pullTemplate
 * @param {object} commit
 * @param {string} template
 */
function pullTemplate({ commit }) {
	// check local storage
	if (local.exists(STORAGE_KEY)) {
		// get data with 'simple' flag set
		const data = local.get(STORAGE_KEY, true);
		// commit to the store
		commit("setTemplate", data);
		// done
		return Promise.resolve(data);
	}
	// otherwise...
	commit("setTemplate", demoTemplate);
	// done
	return Promise.resolve(demoTemplate);
}


// EXPORT
// =============================================================================

export {
	currentTemplate,
	setTemplate,
	updateTemplate,
	pullTemplate,
};
