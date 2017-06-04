<template>
	<div class="error">
		<h2 class="small">Error {{ error.code }}</h2>
		<error>
			<template slot="message">
				<span v-html="currentError.message"/>
			</template>
			<template slot="solutions">
				<li v-for="solution in currentError.solutions" v-html="solution"/>
			</template>
		</error>
	</div>
</template>

<script>
// dependencies
import errors from "./errors";
// child components
import Error from "./Error";
// component
export default {
	// child components
	components: {
		Error,
	},
	// bindings
	data() {
		return {
			errors,
		};
	},
	// computed bindings
	computed: {
		// current error
		error() {
			return this.$store.getters.error;
		},
		// current error
		currentError() {
			// get the matching error
			if (errors[this.error.code]) {
				return errors[this.error.code];
			}
			// or default to the default
			return errors[500];
		},
	},
};
</script>
