<template>
  <div class="tile is-parent">
    <article class="tile is-child box has-text-centered">
      <p class="title">{{ feed.title }}</p>
      <div v-html="feed.summary"></div>
      <router-link :to="'/details/' + feed.id" class="button is-text">
        Voir les autres...
      </router-link>
    </article>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Feed",
  props: {
    feedParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      feed: {}
    };
  },
  created() {
    axios.get(`/feed/latest?url=${this.feedParams.url}&type=${this.feedParams.type}`).then(response => {
      this.feed = response.data;
      console.log(this.feed);
    });
  }
};
</script>

<style></style>
