// DEPENDENCIES
// =============================================================================
// third-party
import {
	map,
	forEach,
	forEachRight,
	includes,
	isString,
} from "lodash";
// filters
import { lowercaseShrink } from "@/utils/filters";


// METHODS
// =============================================================================
// PRIVATE ---------------------------------

/**
 * Format each row in a page.
 *
 * @param {array} row
 * @param {number} index
 * @param {object} labels
 */
function formatRow(row, index, labels) {
	// defined formatted row
	const formattedRow = {};
	// format!
	labels.forEach((label, key) => {
		// check cell
		if (isString(row[key])) {
			// make matches simple
			const lowercaseStr = row[key].toLowerCase();
			// boolean
			if (lowercaseStr === "true" || lowercaseStr === "yes") {
				row[key] = true;
			}
			else if (lowercaseStr === "false" || lowercaseStr === "no") {
				row[key] = false;
			}
		}
		// add the cell
		formattedRow[label] = row[key];
	});
	// add to array
	return formattedRow;
}

/**
 * Ensure the labels from user input are correctly formatted.
 *
 * @method formatLabels
 * @param {array} labels
 * @return {array}
 */
function formatLabels(labels) {
	// loop through labels, making them lowercase and label-safe
	return map(labels, label => lowercaseShrink(label, "_")
			.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>{}[\]\\/]/gi, ""));
}

/**
 * Create labels, either from first row of the page or just
 * zero-indexed from the length of the row.
 *
 * @method createLabels
 * @param {array} page
 * @param {boolean} useLabels
 */
function createLabels(page, useLabels) {
	// the first row is made up of labels
	if (useLabels) {
		return formatLabels(page.shift());
	}
	// otherwise...
	const labelCount = page[0].length;
	return [...Array(labelCount).keys()];
}

/**
 * Does a row need nesting?
 * @method needsNesting
 *
 * @param {object} row
 * @param {array} keys
 * @return {boolean}
 */
function needsNesting(row, keys) {
	return !(row[keys[0]] && row[keys[1]]);
}


// PUBLIC ----------------------------------

/**
 * Format a page from a document.
 *
 * @method formatPage
 * @param {array} doc
 * @param {object} preferences (optional)
 * @return {array} formatted document
 */
function formatPage(page, preferences) {
	// create our labels
	const labels = createLabels(page, preferences.useLabels);
	// map data
	const mappedPage = map(page, (datum, index) => formatRow(datum, index, labels));
	// no nested data?
	if (!preferences.nestedData) {
		// map the page
		return mappedPage;
	}
	// otherwise...
	const nestedRows = [];
	// nest
	forEach(mappedPage, (datum, index) => {
		// check preferences
		if (needsNesting(datum, labels)) {
			// find the correct parent
			for (let i = index; i > -1; --i) {
				if (!needsNesting(mappedPage[i], labels)) {
					// create a nested property on the parent
					if (!mappedPage[i].nested) {
						mappedPage[i].nested = [];
					}
					// add to the correct parent
					mappedPage[i].nested.push(datum);
					// stop looping
					break;
				}
			}
			// add to nestedRows array for later removal
			nestedRows.push(index);
		}
	});
	// reverse list of indexes to remove
	nestedRows.reverse();
	// remove redundant rows
	forEachRight(mappedPage, (value, index) => {
		if (includes(nestedRows, index)) {
			mappedPage.splice(index, 1);
		}
	});
	// return data
	return mappedPage;
}

/**
 * Format the pages in a document.
 *
 * @method formatPages
 * @param {object} data
 */
function formatPages(data) {
	return data.sheets.map(page => page.properties.title);
}

/**
 * Format a document all at once.
 *
 * @method formatDoc
 * @param {array} responses
 * @param {object} params
 * @return {array}
 */
function formatDoc(responses, params) {
	// return an array of pages
	return responses.map((response, index) => ({
		name: params.pages[index],
		content: formatPage(response.data.values, params.preferences),
	}));
}

/**
 * Format a document, by pages.
 *
 * @method formatPages
 * @param {object} data
 */
function formatDocPaged(data, params) {
	// get the page
	if (!params.selectedPage) {
		params.selectedPage = params.pages[0];
	}
	// format
	return {
		name: params.selectedPage,
		content: formatPage(data, params.preferences),
	};
}


// EXPORT
// =============================================================================

export {
    formatDoc,
	formatDocPaged,
	formatPage,
    formatPages,
};
