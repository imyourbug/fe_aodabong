<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Login from "@/views/Login.vue";
import Navbar from "@/views/Navbar.vue";
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Error from "@/views/Error.vue";
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Login,
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
  text-align: center;
  color: #2c3e50;
}
</style>
