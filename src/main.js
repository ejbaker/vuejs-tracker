/* eslint-disable no-new */

// DEPENDENCIES
// =============================================================================
// VUE ----------------------------------
import Vue from "vue";

// THIRD-PARTY ----------------------------------
import axios from "axios";

// COMPONENTS ----------------------------------
import App from "@/App";
/*
import Interactivity from "@/components/Interactivity";
import ExportHandlers from "@/components/ExportHandlers";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import Preview from "@/components/Preview";
import ReloadHandlers from "@/components/ReloadHandlers";
import UserTemplate from "@/components/UserTemplate";
*/

// STORE ----------------------------------
import store from "@/store";

// CONFIG
// =============================================================================
// VUE ----------------------------------
Vue.config.productionTip = false;
// use axios
Vue.prototype.$http = axios;

// INSTANTIATE
// =============================================================================
new Vue({
	el: "#app",
	// filters,
	store,
	template: "<App/>",
	components: { App },
});


// COMPONENTS
// =============================================================================
// global components go here!

/*
Vue.component("export-handlers", ExportHandlers);
Vue.component("interactivity", Interactivity);
Vue.component("login", Login);
Vue.component("logout", Logout);
Vue.component("preview", Preview);
Vue.component("reload-handlers", ReloadHandlers);
Vue.component("user-template", UserTemplate);
*/
