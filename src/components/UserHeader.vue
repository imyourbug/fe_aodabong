<template>
  <router-link :to="{ name: 'info_user' }"
    ><i class="fa-solid fa-user"></i> Tài khoản</router-link
  >
  <br />
  <router-link :to="{ name: 'change_password' }"
    ><i class="fa-solid fa-key"></i> Đổi mật khẩu</router-link
  >
  <br />
  <a href="#" @click="handleSignOut"
    ><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a
  ><br />
</template>

<script setup>
import { inject, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isLogged: Boolean,
  user: Object,
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

<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: #ed1a29;
  transition: all 0.5s ease;
}
</style>
