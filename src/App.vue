<template>
	<div id="app">
		<interactivity :template-id="userTemplateId"/>
		<main id="content">
			<edit-template/>
			<user-template
				v-if="user.loggedIn && !error"
				v-show="showPreview"
				:doc="doc"
				:user-template-id="userTemplateId" />
		</main>
		<!-- 
		<loading :is-loading="loading"/>
		<errors :error="error"/>
		-->
	</div>
</template>

<script>
// dependencies
// child components
import Interactivity from "@/components/Interactivity";
import EditTemplate from "@/components/UserTemplate/EditTemplate";
import UserTemplate from "@/components/UserTemplate/Custom";
// component
export default {
	// child components
	components: {
		Interactivity,
		UserTemplate,
		EditTemplate,
	},
	// bindings
	data() {
		return {
			// is loading?
			loading: false,
			// has error?
			error: null,
			// user template ID
			userTemplateId: "myTemplate",
		};
	},
	// computed bindings
	computed: {
		// current user
		user() {
			return this.$store.getters.user;
		},
		// current pages
		pages() {
			return this.$store.getters.pages;
		},
		// page
		selectedPage() {
			return this.$store.getters.page;
		},
		// current document
		doc() {
			return this.$store.getters.doc;
		},
		// show preview?
		showPreview() {
			return this.$store.getters.showPreview;
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
				this.error = true;
				console.log("Error :(", err);
			})
			;
		},
	},
};
</script>

<style scoped lang="sass">
@import "~STYLES/main.scss";
</style>
