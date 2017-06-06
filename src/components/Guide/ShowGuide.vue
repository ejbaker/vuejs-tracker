<template>
	<div class="guide" id="top">
		<div class="form-check form-check-inline">
			<label class="form-check-label">
				<input type="checkbox" v-model="showReadMe" class="form-check-input">
				Show guide?
			</label>
			<read-me v-if="showReadMe"></read-me>
		</div>
	</div>
</template>

<script>
// child components
import ReadMe from "./ReadMe";
// component
export default {
	// child components
	components: {
		ReadMe,
	},
	// bindings
	data() {
		return {
			showReadMe: false,
		};
	},
};
</script>

<style scoped lang="sass">
@import "~STYLES/components/guide/show-guide.scss";
</style>
