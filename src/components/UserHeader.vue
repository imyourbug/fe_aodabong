<template>
  <router-link :to="{ name: 'info_user' }"
    ><i class="fa-solid fa-user"></i> Tài khoản</router-link
  >
  <br />
  <a data-toggle="modal" data-dismiss="modal" data-target="#modalChangePassword"
    ><i class="fa-solid fa-key"></i> Đổi mật khẩu</a
  >
  <br />
  <a @click="handleSignOut"
    ><i class="fa-solid fa-right-from-bracket btn-logout"></i> Đăng xuất</a
  ><br />
</template>

<script setup>
import {
  defineProps,
  inject,
} from 'vue';

import { useRouter } from 'vue-router';

import { setCookie } from '@/helpers/helper.js';

const props = defineProps({
  isLogged: Boolean,
  user: Object,
});

const router = useRouter();
const emitter = inject("emitter");

const handleSignOut = () => {
  unSaveUser();
  emitter.emit("reloadHeader");
};

const unSaveUser = () => {
  localStorage.clear();
  setCookie('access_token', '', 30);
  router.push({
          name: "home",
        });
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
.btn-logout:hover {
  cursor: pointer;
}
</style>
