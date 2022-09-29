<template>
  <router-link :to="{ name: 'info_user' }">Tài khoản</router-link>
  <br />
  <router-link :to="{ name: 'change_password' }">Đổi mật khẩu</router-link>
  <br />
  <a href="#" @click="handleSignOut">Đăng xuất</a><br />
</template>

<script setup>
import { inject, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isLogged: Boolean,
});

const Vue3GoogleOauth = inject("Vue3GoogleOauth");
const emitter = inject("emitter");
const router = useRouter();

const handleSignOut = async () => {
  try {
    await Vue3GoogleOauth.instance.signOut();
    unSaveUser();
    emitter.emit("reloadHeader");

    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};

const unSaveUser = () => {
  // localStorage.removeItem("user");
  localStorage.clear();
};
</script>

<style scoped></style>
