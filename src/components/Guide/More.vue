<template>
	<input type="button" class="btn btn-sm btn-info" @click="toggle()" :value="!less ? 'More' : 'Less'"/>
</template>

<script>
// component
export default {
	// inherited bindings
	props: [
		"less",
	],
	// methods
	methods: {
		// show
		toggle() {
			this.$emit("toggle");
		},
	},
};
</script>
