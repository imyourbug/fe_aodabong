<template>Header</template>

<script setup>
import { ref } from "vue";
const user = ref([]);

const reload = () => {
  user.value = localStorage.getItem("user");
  console.log(user.value);
};

reload();
</script>

<style scoped></style>
