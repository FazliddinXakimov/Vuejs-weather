import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import store from "./store/index.js";

library.add(faSearch, faSun);

const app = createApp(App);

app.component("fa", FontAwesomeIcon);

app.use(store);

app.mount("#app");
