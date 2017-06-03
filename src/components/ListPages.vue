<template>
	<form @submit.prevent="selectPage">
		<select v-model="updatedPage">
			<option value="" disabled>Select Page</option>
			<option v-for="page in pages" :value="page">{{ page }}</option>
		</select>
		<input class="btn change-page" type="submit" value="Change Page">
	</form>
</template>

<script>
// component
export default {
	// bindings
	data() {
		return {
			updatedPage: "",
		};
	},
	// computed bindings
	computed: {
		// current user
		user() {
			return this.$store.getters.user;
		},
		// page
		pages() {
			return this.$store.getters.pages;
		},
		// old page
		oldPage() {
			return this.$store.getters.page;
		},
	},
	// watch
	watch: {
		oldPage: {
			handler(oldPage) {
				if (oldPage) {
					this.updatedPage = oldPage;
				}
			},
		},
	},
	// update selected page
	methods: {
		selectPage() {
			// grab our property
			const selectedPage = this.updatedPage && this.updatedPage.trim();
			// doubly ensure value
			if (!selectedPage) {
				return;
			}
			// reload document
			this.$store.dispatch("reloadDoc", {
				apiKey: this.user.apiKey,
				sheetId: this.user.sheetId,
				preferences: this.user.preferences,
				selectedPage,
			});
		},
	},
};
</script>
