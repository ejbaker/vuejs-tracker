<script>
// dependencies
import Vue from "vue";
import * as filters from "@/utils/filters";
// component
export default {
	// inherited bindings
	props: [
		"doc",
		"user-template-id",
		"whiteSpaced",
	],
	// data
	data() {
		return {
			// template
			template: null,
		};
	},
	// computed bindings
	computed: {
		// template
		userTemplate() {
			return this.$store.getters.template;
		},
	},
	// on view creation
	created() {
		// fetch data
		this.updateTemplate();
	},
	// computed value?
	watch: {
		// value of user template
		userTemplate: {
			handler() {
				this.updateTemplate();
			},
		},
	},
	// render stuff
	render(createElement) {
		// no template set yet?
		if (!this.template) {
			// create div
			const loading = createElement("div", "Loading...");
			// return loading
			return loading;
		}
		// otherwise, return template!
		return this.template();
	},
	// update template
	methods: {
		updateTemplate() {
			// grab value of user template
			let formattedTemplate = this.userTemplate;
			// perform some mutations on it
			formattedTemplate = formattedTemplate
				.replace(/<raw-code>/ig, '<span class="raw-code-open"/>')
				.replace(/<\/raw-code>/ig, '<span class="raw-code-close"/>');
			// wrap it with a div with our desired ID
			const wrappedTemplate = `
				<div id="${this.userTemplateId}" :class="{ 'white-spaced': whiteSpaced }">${formattedTemplate}</div>
			`;
			// compile it and update our template
			this.template = Vue.compile(wrappedTemplate).render;
			// log out value of template...
			console.log("Compiled?", this.template());
		},
	},
	// filters
	filters,
};
</script>

<style>
#myTemplate.white-spaced div, #userTemplate.white-spaced td {
	white-space: pre-line;
}
</style>
