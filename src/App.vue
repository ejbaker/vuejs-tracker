<template>
	<div id="app">
		<interactivity class="bootstrap" :template-id="userTemplateId"/>
		<main id="content">
			<template v-if="!error">
				<show-guide class="bootstrap"/>
				<user-template :template-id="userTemplateId" :logged-in="user.loggedIn" />
			</template>
			<template v-else>
				<errors class="bootstrap"/>
			</template>
		</main>
	</div>
</template>

<script>
// dependencies
// child components
import Interactivity from "@/components/Interactivity/Main";
import Errors from "@/components/Errors/Main";
import ShowGuide from "@/components/Guide/ShowGuide";
import UserTemplate from "@/components/UserTemplate/Main";
// component
export default {
	// child components
	components: {
		Interactivity,
		Errors,
		ShowGuide,
		UserTemplate,
	},
	// bindings
	data() {
		return {
			// is loading?
			loading: false,
			// user template ID
			userTemplateId: "myTemplate",
		};
	},
	// computed bindings
	computed: {
		// current error
		error() {
			return this.$store.getters.error;
		},
		// current user
		user() {
			return this.$store.getters.user;
		},
	},
	// on view creation
	created() {
		// fetch data
		this.fetchData();
	},
	// methods
	methods: {
		// fetch data from the server
		fetchData() {
			// save values
			let user = {};
			let pages = [];
			// user
			this.$store.dispatch("pullUser")
			// pages
			.then((data) => {
				// save user
				user = data;
				if (!user.loggedIn) {
					return Promise.resolve();
				}
				// get pages
				return this.$store.dispatch("pullPages", user);
			})
			// page
			.then((data) => {
				if (!user.loggedIn) {
					return Promise.resolve();
				}
				// save pages
				pages = data;
				// get selected page
				return this.$store.dispatch("pullPage");
			})
			// doc
			.then((selectedPage) => {
				if (!user.loggedIn) {
					return Promise.resolve();
				}
				// get the document
				return this.$store.dispatch("pullDoc", {
					apiKey: user.apiKey,
					sheetId: user.sheetId,
					preferences: user.preferences,
					pages,
					selectedPage,
				});
			})
			// template
			.then(() => {
				if (!user.loggedIn) {
					return Promise.resolve();
				}
				// get the template
				return this.$store.dispatch("pullTemplate");
			})
			// show preview
			.then(() => {
				if (!user.loggedIn) {
					return Promise.resolve();
				}
				return this.$store.dispatch("pullShowPreview");
			})
			// no errors
			.then(() => (this.error = null))
			// handle errors
			.catch((err) => {
				this.$store.dispatch("updateError", err);
			})
			;
		},
	},
};
</script>

<style lang="sass">
@import "~STYLES/main.scss";
</style>
