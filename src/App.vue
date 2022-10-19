<template>
  <!-- <Header v-if="user.role !== 1" /> -->
  <!-- <MegaMenu v-if="user.role !== 1" /> -->
  <router-view />
  <!-- <Footer v-if="user.role !== 1" /> -->
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import MegaMenu from "@/components/menus/MegaMenu.vue";
import Header from "@/views/clients/Header.vue";
import Footer from "@/views/clients/Footer.vue";

const user = localStorage.getItem("user");
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
