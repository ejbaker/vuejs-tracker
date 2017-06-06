<template>
	<input type="button" class="btn btn-sm btn-info" @click="toggle()" :value="hidden ? 'Less' : 'More'"/>
</template>

<script>
// component
export default {
	// inherited bindings
	props: [
		"hidden",
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
