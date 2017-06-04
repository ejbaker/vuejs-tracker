import Vue from "vue";
import App from "@/App";

describe("Interactivity.vue", () => {
	it("should render correct contents", () => {
		const Constructor = Vue.extend(App);
		const vm = new Constructor().$mount();
		expect(vm.$el.querySelector("#content header h1").textContent)
			.to.equal("Welcome to the Activity Tracker");
	});
});
