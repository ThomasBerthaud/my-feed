<template>
  <div class="xkcd feed-box">
    <h1>XKCD Feed</h1>
    <div class="latest">{{ latest.title }}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "XkcdFeed",
  data() {
    return {
      latest: {}
    };
  },
  created() {
    axios.get("/xkcd/latest").then(res => {
      this.latest = res.data;
    });
  }
};
</script>

<style scoped></style>
