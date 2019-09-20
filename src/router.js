import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AddFeed from "./views/AddFeed.vue";
import FeedDetails from "./views/FeedDetails.vue";
import FeedSettings from "./views/FeedSettings.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/add",
      name: "add",
      component: AddFeed
    },
    {
      path: "/details",
      name: "details",
      component: FeedDetails,
      props: true
    },
    {
      path: "/settings",
      name: "settings",
      component: FeedSettings,
      props: true
    }
  ]
});
