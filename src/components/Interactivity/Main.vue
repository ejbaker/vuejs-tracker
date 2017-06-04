<template>
	<nav class="interactivity form-inline">
		<template v-if="user.loggedIn">
			<list-pages v-if="user.preferences.bySheet"/>
			<reload/>
			<preview/>
			<export :template-id="templateId"/>
			<logout/>
		</template>
		<template v-else>
			<login/>
		</template>
	</nav>
</template>

<script>
// dependencies
// import { isEmpty } from "lodash";
// child components
import Export from "./Export/Main";
import ListPages from "./ListPages";
import Login from "./Login";
import Logout from "./Logout";
import Preview from "./Preview";
import Reload from "./Reload";
// component
export default {
	// child components
	components: {
		Export,
		ListPages,
		Login,
		Logout,
		Preview,
		Reload,
	},
	// inherited bindings
	props: [
		"template-id",
	],
	// computed bindings
	computed: {
		// current user
		user() {
			return this.$store.getters.user;
		},
	},
};
</script>

<style lang="sass">
@import "~STYLES/components/interactivity.scss";
</style>
