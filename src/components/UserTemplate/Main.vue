<template>
	<div>
		<edit-template class="bootstrap" @updateWhiteSpace="toggleWhiteSpace" />
		<div class="bootstrap"><h2 v-if="showPreview">Preview</h2></div>
		<user-template
			v-if="loggedIn"
			v-show="showPreview"
			:doc="doc"
			:user-template-id="templateId"
			:white-spaced="whiteSpaced" />
	</div>
</template>

<script>
// child components
import UserTemplate from "./Custom";
import EditTemplate from "./Edit";
// component
export default {
	// child components
	components: {
		UserTemplate,
		EditTemplate,
	},
	// inherited bindings
	props: [
		"loggedIn",
		"templateId",
	],
	// bindings
	data() {
		return {
			// show white space?
			whiteSpaced: true,
		};
	},
	// computed bindings
	computed: {
		// show preview?
		showPreview() {
			return this.$store.getters.showPreview;
		},
		// current document
		doc() {
			return this.$store.getters.doc;
		},
	},
	// methods
	methods: {
		toggleWhiteSpace() {
			this.whiteSpaced = !this.whiteSpaced;
		},
	},
};
</script>
