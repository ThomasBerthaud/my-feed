<template>
  <section class="section columns">
    <form @submit.prevent="addFeed" class="column is-three-fifths is-offset-one-fifth">
      <div class="field">
        <label class="label" for="feed-url">Url du feed</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            :class="{ 'is-success': validated, 'is-danger': error }"
            type="text"
            id="feed-url"
            placeholder="Url du feed"
            v-model="feedUrl"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-link"></i>
          </span>
          <span class="icon is-small is-right" v-if="validated">
            <i class="fas fa-check"></i>
          </span>
          <span class="icon is-small is-right has-text-success" v-if="checking">
            <i class="fas fa-circle-notch fa-spin"></i>
          </span>
          <span class="icon is-small is-right has-text-danger" v-if="error">
            <i class="fas fa-times"></i>
          </span>
          <p class="help is-danger" v-if="error">
            Erreur: impossible de parser ce feed. Vérifiez que l'url est la bonne.
          </p>
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" :disabled="!validated" type="submit">Ajouter</button>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash";
export default {
  name: "AddFeed",
  data() {
    return { feedUrl: null, validated: false, checking: false, error: false };
  },
  watch: {
    feedUrl: debounce(function() {
      this.validated = false;
      this.error = false;
      if (!this.feedUrl) return;
      axios.get(`/feed/check?url=${this.feedUrl}`).then(
        () => {
          this.validated = true;
          this.error = false;
        },
        () => {
          this.validated = false;
          this.error = true;
        }
      );
    }, 300)
  },
  methods: {
    addFeed() {
      if (!this.validated || this.error) return;
      this.$store.commit("addFeed", { feedUrl: this.feedUrl });
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
