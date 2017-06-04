<template>
	<div class="preferences">
		<input class="btn show-preferences form-control btn-info" :value="showPreferences ? 'Hide Options' : 'Advanced Options'" type="button" @click="showPreferences = !showPreferences"/>
		<transition name="slide">
			<div class="advanced-preferences form-inline" v-if="showPreferences">
				<div class="form-check form-check-inline">
					<label class="form-check-label" title="To load only a selected sheet from your spreadsheet instead of the whole thing.">
						<input type="checkbox" v-model="newPreferences.bySheet" class="form-check-input">
						One Sheet At a Time
					</label>
				</div>
				<div class="form-check form-check-inline">
					<label class="form-check-label" title="If you're using nested data.">
						<input type="checkbox" v-model="newPreferences.nestedData" class="form-check-input">
						Detect Nested Data
					</label>
				</div>
				<div class="form-check form-check-inline">
					<label class="form-check-label" title="If your first row on every sheet is a row of labels.">
						<input type="checkbox" v-model="newPreferences.useLabels" class="form-check-input">
						Use Label Row
					</label>
				</div>
			</div>
		</transition>
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
