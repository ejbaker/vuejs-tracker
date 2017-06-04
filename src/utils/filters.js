// dependencies
import { lowerCase, toLower, toUpper, startCase } from "lodash";
import moment from "moment";


/*
* PUBLIC METHODS
* function publicBar(){ var self = this; return self.foo; }
*/

// lists

/**
 * Filter a list by a string.
 *
 * @method filterBy
 * @param {object} list
 * @param {string} value
 * @return {object}
 */
function filterBy(list, value) {
	return list.filter(item => item.indexOf(value) > -1);
}

/**
 * Find an item in a list by a string.
 *
 * @method findBy
 * @param {object} list
 * @param {string} value
 * @return {object}
 */
function findBy(list, value) {
	return list.filter(item => item === value);
}

// strings

/**
 * Lowercase a string.
 *
 * @method lowercase
 * @param {string} value
 * @return {object}
 */
function lowercase(value) {
	return toLower(value);
}

/**
 * Lowercase a string, replacing spaces with a specified character.
 *
 * @method lowercaseShrink
 * @param {string} value
 * @param {string} replace (optional)
 * @return {object}
 */
function lowercaseShrink(value, replace = "-") {
	return toLower(value).replace(" ", replace);
}

/**
 * Lowercase a string (and separate into words, replacing _/- with spaces).
 *
 * @method lowercaseWords
 * @param {string} value
 * @return {object}
 */
function lowercaseWords(value) {
	return lowerCase(value);
}

/**
 * UPPERCASE a string.
 *
 * @method uppercase
 * @param {string} value
 * @return {object}
 */
function uppercase(value) {
	return toUpper(value);
}
/**
 * Capitalize a string (and separate into words, replacing _/- with spaces).
 *
 * @method capitalizeWords
 * @param {string} value
 * @return {object}
 */
function capitalizeWords(value) {
	return startCase(value);
}

/**
 * Reverse a string.
 *
 * @method reverse
 * @param {string} value
 * @return {object}
 */
function reverse(value) {
	return reverse(value.split("")).join("");
}

/**
 * Simple date format.
 *
 * @method date
 * @param {string} value
 * @return {object}
 */
function date(value, format) {
	return moment(value).format(format);
}

// export
export {
	// lists
	filterBy,
	findBy,
	// strings
	lowercase,
	lowercaseWords,
	lowercaseShrink,
	uppercase,
	capitalizeWords,
	reverse,
	// date
	date,
};
