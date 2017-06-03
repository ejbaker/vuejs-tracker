<script>
// dependencies
import Vue from "vue";
import { date, lowercase } from "@/utils/filters";
// component
export default {
	// inherited bindings
	props: [
		"doc",
		"user-template",
		"user-template-id",
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
			// loading.setAttribute("id", this.userTemplateId);
			// return loading
			return loading;
		}
		// otherwise, return template!
		return this.template();
	},
	// update template
	methods: {
		updateTemplate() {
			console.log("Updating...");
			// grab value of user template
			let formattedTemplate = this.userTemplate;
			// perform some mutations on it
			formattedTemplate = formattedTemplate
				.replace(/<raw-code>/ig, '<span class="raw-code-open"/>')
				.replace(/<\/raw-code>/ig, '<span class="raw-code-open"/>');
			// wrap it with a div with our desired ID
			const wrappedTemplate = `
				<div id="${this.userTemplateId}">
				${formattedTemplate}
				</div>
			`;
			// compile it and update our template
			this.template = Vue.compile(wrappedTemplate).render;
		},
	},
	// filters
	filters: {
		date,
		lowercase,
	},
};
</script>

<style scoped lang="sass">
div, td
	white-space: pre-line
</style>
