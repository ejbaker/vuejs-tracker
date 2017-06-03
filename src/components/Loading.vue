<template>
	<div v-if="isLoading" class="loading">
		Loading...
	</div>
</template>

<script>
// component
export default {
	// inherited bindings
	props: ["isLoading"],
};
</script>
