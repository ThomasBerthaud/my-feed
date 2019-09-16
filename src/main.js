import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import(/* webpackChunkName: "bulma" */ "bulma/css/bulma.css");
import(/* webpackChunkName: "fontawesome" */ "@fortawesome/fontawesome-free/css/all.css");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
