<template>
	<aside>
		<form @submit.prevent="update">
			<div class="form-group">
				<label for="updatedTemplate">Your Template</label>
				<textarea id="updatedTemplate" class="form-control" v-model="updatedTemplate.template"></textarea>
			</div>
			<button type="submit" class="btn btn-primary">Save</button>
		</form>
	</aside>
</template>

<script>
// component
export default {
	// computed bindings
	computed: {
		// template
		oldTemplate() {
			return this.$store.getters.template;
		},
		// copy the old user for initial value
		updatedTemplate() {
			return {
				template: this.oldTemplate,
			};
		},
	},
	// methods
	methods: {
		// save changes
		update() {
			// grab our template
			const template = this.updatedTemplate.template && this.updatedTemplate.template.trim();
			// doubly ensure value
			if (!template) {
				return;
			}
			console.log("Saving...");
			// update
			this.$store.dispatch("updateTemplate", template);
		},
	},
};
</script>

<style scoped lang="sass">
@import "~STYLES/main.scss";
</style>
