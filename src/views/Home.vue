<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <Feed v-for="feed in feeds" :key="feed.key" :feed-params="feed" />
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
      feeds: [{ url: "https://xkcd.com/atom.xml" }, { url: "https://www.swordscomic.com/swords/feed" }]
    };
  },
  created() {
    // TODO retrieve feeds from localStorage
  }
};
</script>
