<template>
	<div>
		<button @click="exportDoc" class="btn btn-info export">Export!</button>
		<!-- use the modal component, pass in the prop -->
		<modal v-if="showModal" @close="showModal = false">
			<h3 slot="header">Export</h3>
			<template slot="body">
				<p>
					Copy-paste into your journal entry!
				</p>
				<exported v-if="exportedContent" :exported="exportedContent"/>
				<template v-else>No content to export!</template>
			</template>
		</modal>
	</div>
</template>

<script>
// child components
import Modal from "../Modal";
import Exported from "./Exported";
// component
export default {
	// child components
	components: {
		Modal,
		Exported,
	},
	// inherited bindings
	props: [
		"templateId",
	],
	// bindings
	data() {
		return {
			exportedContent: null,
			showModal: false,
		};
	},
	// methods
	methods: {
		// export template
		exportDoc() {
			// no template ID set?
			if (!this.templateId) {
				return;
			}
			// get element by ID
			const targetedEl = document.getElementById(this.templateId);
			// element not on the page?
			if (!targetedEl) {
				return;
			}
			// export
			this.exportedContent = targetedEl.innerHTML
				// remove empty vue comments
				.replace(/<!---->\n/g, "")
				// replace raw-code placeholders with real tags
				.replace(/<span class="raw-code-open"><\/span>/g, "<raw-code>")
				.replace(/<span class="raw-code-close"><\/span>/g, "</raw-code>")
				// replace <br> with <br/> - DREAMWIDTH BUG
				.replace(/<br>/g, "<br/>")
				// trim whitespace
				.trim()
				;
			// show
			this.showModal = true;
		},
		// select all
		selectAll(event) {
			// Workaround for Safari bug
			// http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
			setTimeout(() => {
				event.target.select();
			}, 0);
		},
	},
};
</script>

<style scoped lang="sass">
@import "~STYLES/components/export.scss";
</style>
