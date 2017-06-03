<template>
	<div>
		<label>
			<input type="checkbox" v-model="showReadMe" class="form-control">
			Show guide?
		</label>
		<read-me v-if="showReadMe"></read-me>
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
