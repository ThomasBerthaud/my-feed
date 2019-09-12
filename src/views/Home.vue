<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <Feed class="column is-one-third" v-for="url in feeds" :key="url" :feed-url="url" />
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Feed from "@/components/Feed";

export default {
  name: "home",
  components: {
    Feed
  },
  data() {
    return {
      feeds: []
    };
  },
  created() {
    this.feeds = this.$store.state.feeds;
  }
};
</script>
