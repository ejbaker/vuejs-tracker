<template>
	<textarea @focus="selectAll" class="exported form-control">{{ exported }}</textarea>
</template>

<script>
// component
export default {
	// inherited bindings
	props: [
		"exported",
	],
	// methods
	methods: {
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
textarea
	max-width: 95%
	height: 200px !important
</style>
