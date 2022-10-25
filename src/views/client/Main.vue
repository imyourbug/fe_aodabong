<template>
  <Header />
  <MegaMenu />
  <router-view />
  <Footer />
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import MegaMenu from "@/components/menus/MegaMenu.vue";
import Header from "@/views/client/Header.vue";
import Footer from "@/views/client/Footer.vue";
</script>

<style scoped></style>
