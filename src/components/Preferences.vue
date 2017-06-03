<template>
	<div class="preferences">
		<input class="btn show-preferences btn-info" :value="showPreferences ? 'Hide Options' : 'Advanced Options'" type="button" @click="showPreferences = !showPreferences"/>
		<div class="advanced-preferences" v-if="showPreferences">
			<label>
				<input class="form-control" v-model="newPreferences.bySheet" type="checkbox">
				One Sheet At a Time
			</label>
			<label>
				<input class="form-control" v-model="newPreferences.nestedData" type="checkbox">
				Detect Nested Data
			</label>
			<label>
				<input class="form-control" v-model="newPreferences.useLabels" type="checkbox">
				Use Label Row
			</label>
		</div>
	</div>
</template>

<script>
// component
export default {
	// component name
	name: "preferences",
	// inheritied bindings
	props: [
		"newPreferences",
	],
	// bindings
	data() {
		return {
			showPreferences: false,
		};
	},
};
</script>


<style scoped lang="sass">
@import "~STYLES/components/preferences.scss";
</style>
