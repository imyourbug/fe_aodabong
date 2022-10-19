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
import Header from "@/views/clients/Header.vue";
import Footer from "@/views/clients/Footer.vue";
</script>

<style scoped></style>
