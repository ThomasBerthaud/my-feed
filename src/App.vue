<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-body">
        <nav class="level">
          <div class="level-left">
            <router-link to="/">
              <div class="container">
                <h1 class="title">MY-FEED</h1>
                <h1 class="subtitle">Bienvenue sur votre feed</h1>
              </div>
            </router-link>
          </div>
          <div class="level-right">
            <router-link to="/add">
              <button class="button is-outlined is-inverted is-primary is-medium">
                <span>Ajouter un feed</span>
                <span class="icon is-small"><i class="fas fa-plus-circle"></i></span>
              </button>
            </router-link>
          </div>
        </nav>
      </div>
    </section>
    <router-view />
  </div>
</template>

<style></style>
