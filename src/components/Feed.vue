<template>
  <div class>
    <div v-if="feed" class="card">
      <header class="card-header">
        <p class="card-header-title">{{ feed.title }}</p>
        <router-link :to="'/settings/' + feed.id" class="card-header-icon" aria-label="feed settings">
          <span class="icon">
            <i class="fas fa-cog"></i>
          </span>
        </router-link>
      </header>
      <div class="card-content limit-size">
        <div class="content">
          <div v-html="feed.entries[0].summary"></div>
          <time :datetime="feed.updated">{{ readableUpdated }}</time>
        </div>
      </div>
      <div class="card-footer">
        <router-link :to="'/details/' + feed.id" class="card-footer-item">Voir les autres...</router-link>
        <a :href="feed.entries[0].link" class="card-footer-item" aria-label="external link">
          <span>Acceder au site</span>
          <span class="icon">
            <i class="fas fa-external-link-alt"></i>
          </span>
        </a>
      </div>
    </div>
    <div v-if="!feed" class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ feedUrl }}
          <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <span v-if="!loading">Problème avec ce feed</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Feed",
  props: {
    feedUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      feed: null
    };
  },
  computed: {
    readableUpdated() {
      const formatted = new Date(this.feed.updated);
      return isNaN(formatted) ? this.feed.updated : formatted.toDateString();
    }
  },
  created() {
    this.loading = true;
    axios.get(`/feed/latest?url=${this.feedUrl}`).then(
      response => {
        this.feed = response.data;
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }
};
</script>

<style scoped>
.card-header-title {
  word-break: break-all;
}
.limit-size {
  max-height: 50vh;
  overflow-y: scroll;
}
</style>
