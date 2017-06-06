<template>
    <aside v-once>
        <h1>Table of Contents</h1>
        <ol>
            <li v-for="section in sections"><a :href="section.link">{{ section.title }}</a></li>
        </ol>
    </aside>
</template>

<script>
// dependencies
import { map } from "lodash";
import { lowercaseShrink } from "@/utils/filters";
// component
export default {
	data() {
		return {
			rawSections: [
				"Getting Started",
				"How to Use This App",
				"Template Syntax",
			],
		};
	},
	// computed bindings
	computed: {
		sections() {
			// create proper sections from raw sections
			return map(this.rawSections, section => ({
				title: section,
				link: `#${lowercaseShrink(section)}`,
			}));
		},
	},
};
</script>

<style scoped lang="sass">
@import "~STYLES/components/guide/table-of-contents.scss";
</style>
