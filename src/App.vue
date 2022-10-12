<template>
  <Header />
  <!-- <MegaMenu /> -->
  <router-view />
  <Footer />
</template>

<script setup>
import Header from "@/views/clients/Header.vue";
import Footer from "@/views/clients/Footer.vue";
import MegaMenu from "@/components/menus/MegaMenu.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
