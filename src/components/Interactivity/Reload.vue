<template>
	<button @click="reloadDoc" class="btn reload-doc">Reload Document</button>
</template>

<script>
// component
export default {
	// computed properties
	computed: {
		// user
		user() {
			return this.$store.getters.user;
		},
		// pages
		pages() {
			return this.$store.getters.pages;
		},
		// page
		selectedPage() {
			return this.$store.getters.page;
		},
		// document
		doc() {
			return this.$store.getters.doc;
		},
	},
	// methods
	methods: {
		reloadDoc() {
			this.$store.dispatch("reloadDoc", {
				apiKey: this.user.apiKey,
				sheetId: this.user.sheetId,
				preferences: this.user.preferences,
				pages: this.pages,
				selectedPage: this.selectedPage,
			});
		},
	},
};
</script>
