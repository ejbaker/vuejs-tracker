<template>
	<div v-if="error" class="error">
		Error!
	</div>
</template>

<script>
// component name
const componentName = "errors";
// component
export default {
	// name
	name: componentName,
	// inherited bindings
	props: ["error"],
};
</script>
