<template>
  <div class="row block-head">
    <div class="col-6 block-head-left">
      <router-link to="/home">Trang chủ</router-link>&emsp;
      <a href="#">Giới thiệu</a>&emsp;
      <a href="#">Dịch vụ in ấn</a>
    </div>
    <div class="col-6 block-head-right">
      <a href="#"><i class="fas fa-envelope"></i> Mail</a>&emsp;
      <span class="time"><i class="fas fa-clock"></i> 06:30 - 21:00</span>&emsp;
      <span><i class="fas fa-phone-alt"></i> 0368822642</span>
    </div>
  </div>
  <div class="row menu-header">
    <div class="col-4">
      <router-link class="text-menu-header" to="/home"
        ><img class="logo" src="@/assets/logo.png" /></router-link
      >&emsp;
    </div>
    <div class="col-4 block-search">
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Tìm kiếm"
          aria-label="Search"
          v-model="key_word"
        />
        <a @click.prevent="searchVideo" class="btn btn-outline-success">
          <i class="fa-solid fa-magnifying-glass"></i>
        </a>
      </form>
    </div>
    <div class="col-4 block-user">
      <div id="nav d-flex">
        <router-link class="btn-login" to="/login" v-if="!isLogged"
          >Đăng nhập</router-link
        >
        <router-link to="/carts" v-if="isLogged"
          ><i class="fa-solid fa-cart-shopping"></i
          ><sup class="cart-quantity">{{ carts.length }}</sup></router-link
        >&emsp; <i class="fa-solid fa-bell nav-icon" v-if="isLogged"></i>&emsp;
        <a
          href="#"
          @click.prevent="handleSignOut"
          class="btn-logout"
          v-if="isLogged"
          ><img class="nav-avatar" :src="avatar_user" /> &ensp;Đăng xuất</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  defineEmits,
  inject,
  onActivated,
  onBeforeMount,
} from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const Vue3GoogleOauth = inject("Vue3GoogleOauth");

const emit = defineEmits(["search-video"]);

const avatar_user = ref("");
const isLogged = ref(false);
const key_word = ref("");
const carts = ref([]);
const handleSignOut = async () => {
  try {
    await Vue3GoogleOauth.instance.signOut();
    unSaveUser();
    isLogged.value = false;

    router.push({ path: "/login" });
  } catch (error) {
    console.log(error);
  }
};
const unSaveUser = () => {
  // localStorage.removeItem("user");
  localStorage.clear();
};
const searchVideo = () => {
  if (key_word.value.trim()) {
    // Send key_word to ListVideo component
    emit("search-video", key_word.value);

    router.push({
      path: `/videos/search/${key_word.value}`,
    });
  }
};
const reload = () => {
  isLogged.value = JSON.parse(localStorage.getItem("user")) ? true : false;
  carts.value = JSON.parse(localStorage.getItem("carts")) ?? [];
  if (isLogged.value) {
    avatar_user.value = JSON.parse(localStorage.getItem("user"))[0].url ?? "";
  }
};

onMounted(() => {
  emit("change-name", () => {
    reload();
  });
  console.log("run emit");
});

reload();

const mounted = () => {};
</script>

<style scoped>
a {
  text-decoration: none !important;
  color: black;
}
a:hover {
  color: black;
}
.block-head {
  align-items: center;
  background-color: rgb(246, 249, 252);
  margin: 0px 160px;
}
.block-head a,
.block-head span {
  color: gray;
}
.block-head a:hover {
  color: gray;
}
.block-head-left {
  padding: 10px 0px 10px 0px;
}
.block-head-right {
  text-align: right;
}
.block-head-right span.time {
  border-left: 1px solid black;
  border-right: 1px solid black;
  padding: 0px 15px 0px 15px;
}
.menu-header {
  padding: 0% 1% 1% 1%;
  text-align: center;
  border-bottom: 1px solid rgb(233, 227, 227);
}
.logo {
  width: 200px;
}
.block-search {
  padding-top: 10px;
}
.block-user {
  padding-top: 10px;
}
.btn-login,
.btn-logout {
  color: black;
  font-weight: bold;
}
.nav-avatar {
  width: 35px;
  border-radius: 50%;
}
.nav-icon {
  font-size: 22px;
}
sup.cart-quantity {
  color: #ed1a29;
  border-radius: 50%;
  padding: 1px 4px;
  font-size: 14px;
}
</style>