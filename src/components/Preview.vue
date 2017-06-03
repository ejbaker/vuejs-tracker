<template>
	<button @click="togglePreview" class="btn preview">{{ showPreview ? "Hide Preview" : "Show Preview" }}</button>
</template>

<script>
// component
export default {
	// component name
	name: "preview",
	// computed properties
	computed: {
		// show preview?
		showPreview() {
			return this.$store.getters.showPreview;
		},
	},
	// methods
	methods: {
		// toggle showPreview
		togglePreview() {
			this.$store.dispatch("updateShowPreview", !this.showPreview);
		},
	},
};
</script>
