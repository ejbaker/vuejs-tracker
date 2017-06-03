<template>
	<div>
		<form v-if="editing" @submit.prevent="update" class="user-update">
			<input v-model="updatedUser.apiKey" class="form-control" placeholder="Your API Key" required>
			<input v-model="updatedUser.sheetId" class="form-control" placeholder="Your Google Sheet ID" required>
			<preferences :new-preferences="updatedUser.preferences" />
			<input class="btn btn-primary" value="Update" type="submit">
		</form>
		<form @submit.prevent="logout" class="user-delete">
			<input class="btn btn-warning" :value="editing ? 'Cancel' : 'Edit User'" type="button" @click="editing = !editing">
			<input class="btn btn-danger" value="Log Out" type="submit">
		</form>
	</div>
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
	// data
	data() {
		return {
			editing: false,
		};
	},
	// computed
	computed: {
		// get the old user
		oldUser() {
			return this.$store.getters.user;
		},
		// copy the old user for initial value
		updatedUser() {
			return {
				apiKey: this.oldUser.apiKey,
				sheetId: this.oldUser.sheetId,
				preferences: this.oldUser.preferences,
			};
		},
	},
	// methods
	methods: {
		// update user
		update() {
			// grab our user
			const apiKey = this.updatedUser.apiKey && this.updatedUser.apiKey.trim();
			const sheetId = this.updatedUser.sheetId && this.updatedUser.sheetId.trim();
			// doubly ensure value
			if (!apiKey || !sheetId) {
				return;
			}
			// otherwise...
			const preferences = this.updatedUser.preferences;
			this.updatedUser = {};
			// hide editing pane
			this.editing = false;
			// log in
			this.$store.dispatch("login", { apiKey, sheetId, preferences });
			// reload the data
			this.$store.dispatch("reloadDoc", { apiKey, sheetId, preferences });
		},
		// delete user
		logout() {
			this.$store.dispatch("logout");
		},
	},
};
</script>

<style scoped lang="sass">
@import "~STYLES/components/interactivity.scss";
</style>
