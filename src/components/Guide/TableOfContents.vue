<template>
    <aside v-once>
        <h1>Table of Contents</h1>
        <ul>
            <li v-for="section in sections">{{ section.ordinal }} <a :href="section.link">{{ section.title }}</a></li>
        </ul>
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
				"About This App",
				"How to Use This App",
				"Before You Start",
				"Set Up",
				"User Preferences",
				"FAQ",
			],
		};
	},
	// computed bindings
	computed: {
		sections() {
			// create proper sections from raw sections
			return map(this.rawSections, (section, index) => ({
				ordinal: `${index + 1}.`,
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
