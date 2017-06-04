<template>
    <form @submit.prevent="login" class="user-save form-inline">
		<label>
	        <input v-model="newApiKey" class="form-control" placeholder="Your API Key" required>
		</label>
		<label>
	        <input v-model="newSheetId" class="form-control" placeholder="Your Google Sheet ID" required>
		</label>
		<preferences :new-preferences="newPreferences" class="form-group" />
        <input class="btn btn-primary" value="Log In" type="submit">
    </form>
</template>

<script>
// child components
import Preferences from "./Preferences";
// component
export default {
	// child components
	components: {
		Preferences,
	},
	// component name
	name: "login",
	// initial data
	data() {
		return {
			newApiKey: "",
			newSheetId: "",
			newPreferences: {
				bySheet: false,
				nestedData: false,
				useLabels: true,
			},
		};
	},
	// methods
	methods: {
		login() {
			// grab our user
			const apiKey = this.newApiKey && this.newApiKey.trim();
			const sheetId = this.newSheetId && this.newSheetId.trim();
			// doubly ensure value
			if (!apiKey || !sheetId) {
				return;
			}
			// otherwise...
			const preferences = this.newPreferences;
			// clear out user
			this.newApiKey = "";
			this.newSheetId = "";
			this.newpreferences = {
				bySheet: false,
				nestedData: false,
				useLabels: true,
			};
			// log in
			this.$store.dispatch("login", { apiKey, sheetId, preferences });
			// reload the data
			this.$store.dispatch("reloadDoc", { apiKey, sheetId, preferences });
		},
	},
};
</script>
