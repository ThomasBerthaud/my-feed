import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const DEFAULT_FEEDS = [
  "https://xkcd.com/atom.xml",
  "https://www.swordscomic.com/swords/feed",
  "http://feeds.feedburner.com/thedoghousediaries/feed",
  "https://lolnein.com/feed/"
];

export default new Vuex.Store({
  state: {
    feeds: localStorage.getItem("feeds") || DEFAULT_FEEDS
  },
  mutations: {
    addFeed(state, payload) {
      console.log(state, payload);
    },
    updateFeedParams(state, payload) {
      console.log(state, payload);
    }
  },
  actions: {}
});
