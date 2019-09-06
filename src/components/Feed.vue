<template>
  <div class="">
    <div v-if="feed" class="card">
      <header class="card-header">
        <p class="card-header-title">{{ feed.title }}</p>
        <router-link :to="'/settings/' + feed.id" class="card-header-icon" aria-label="feed settings">
          <span class="icon">
            <i class="fas fa-cog"></i>
          </span>
        </router-link>
      </header>
      <div class="card-content">
        <div class="content">
          <div v-html="feed.entries[0].summary"></div>
          <time :datetime="feed.updated">{{ readableUpdated }}</time>
        </div>
      </div>
      <div class="card-footer">
        <router-link :to="'/details/' + feed.id" class="card-footer-item">
          Voir les autres...
        </router-link>
        <a :href="feed.link" class="card-footer-item" aria-label="external link">
          <span>Acceder au site</span>
          <span class="icon"><i class="fas fa-external-link-alt"></i></span>
        </a>
      </div>
    </div>
    <div v-if="!feed" class="card">
      <header class="card-header">
        <p class="card-header-title">{{ feedParams.url }}</p>
      </header>
      <div class="card-content">
        <div class="content">
          Problème avec ce feed
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
    feedParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      feed: null
    };
  },
  computed: {
    readableUpdated() {
      return new Date(this.feed.updated).toDateString();
    }
  },
  created() {
    axios.get(`/feed/latest?url=${this.feedParams.url}`).then(response => {
      this.feed = response.data;
    });
  }
};
</script>

<style></style>
