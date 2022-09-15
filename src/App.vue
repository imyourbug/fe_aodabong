<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Navbar from "@/views/clients/Navbar.vue";
import About from "@/views/clients/About.vue";
import Home from "@/views/clients/Home.vue";
import Error from "@/views/clients/Error.vue";
import Header from "@/views/clients/Header.vue";
import Footer from "@/views/clients/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    About,
    Home,
    Error,
    Header,
    Footer,
  },
};
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
