<template>
	<div>
		<ul class="tabs">
			<li
				is="data-tab"
				v-for="(tab, tabIndex) in tabs.labels"
				:key="tab.id"
				:tab="tab"
				:team="team"
			/>
  		</ul>
	</div>
</template>

<script>
// dependencies
// child components
import DataTab from "@/components/DataTab";

// component name
const componentName = "data-tabs";
// component
export default {
	// name
	name: componentName,
	// inherited bindings
	props: [
		"tabs",
		"team",
	],
	// components
	components: {
		DataTab,
	},
};
</script>
