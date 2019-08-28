<template>
  <div class="home">
    <h1>Welcome to your feed, What's new today ?</h1>
    <XkcdFeed />
  </div>
</template>

<script>
// @ is an alias to /src
import components from "@/components/feeds";

export default {
  name: "home",
  components
};
</script>
