<template>
	<main v-once>
		<table-of-contents/>
		<h1>about this app</h1>
		<p>Blah blah explaining the purpose</p>
		<h2>how to use this app</h2>
	</main>
</template>

<script>
// child components
import TableOfContents from "./TableOfContents";
// component
export default {
	// child components
	components: {
		TableOfContents,
	},
};
</script>

<style scoped lang="sass">
@import "~STYLES/components/guide/read-me.scss";
</style>
