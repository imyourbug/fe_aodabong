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
          type="text"
          class="form-control me-2"
          placeholder="Tìm kiếm"
          v-model.trim="key_word"
          @keyup.enter="searchProduct"
        />
        <a @click.prevent="searchProduct" class="btn btn-outline-success">
          <i class="fa-solid fa-magnifying-glass"></i>
        </a>
      </form>
    </div>
    <div class="col-4 block-user">
      <div class="block-left-header">
        <router-link class="cart" to="/carts"
          ><i class="fa-solid fa-cart-shopping"></i
          ><sup class="cart-quantity">{{ carts.length }}</sup>
          <CartHeader
            class="cart-header"
            :carts="carts"
            :user="user" /></router-link
        >&emsp;
        <router-link class="btn-login" to="/login" v-if="!isLogged"
          ><img class="nav-avatar" src="../../assets/default.jpg"
        /></router-link>
        <div class="btn-logout btn-user" v-if="isLogged">
          <img
            class="nav-avatar"
            :src="user.access_token ? user.avatar : `${domain}${user.avatar}`"
          />
          &ensp;
          <div class="user-header"><UserHeader :user="user" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import CartHeader from "@/components/CartHeader.vue";
import UserHeader from "@/components/UserHeader.vue";

const router = useRouter();
const Vue3GoogleOauth = inject("Vue3GoogleOauth");
const emitter = inject("emitter");

const domain = process.env.VUE_APP_DOMAIN_URL;
const user = ref([]);
const isLogged = ref(false);
const key_word = ref("");
const carts = ref([]);

emitter.on("reloadHeader", () => {
  reload();
});

const handleSignOut = async () => {
  try {
    await Vue3GoogleOauth.instance.signOut();
    unSaveUser();
    isLogged.value = false;

    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};
const unSaveUser = () => {
  // localStorage.removeItem("user");
  localStorage.clear();
};
const searchProduct = () => {
  if (key_word.value.trim()) {
    emitter.emit("searchProduct", key_word.value.trim());

    router.push({
      path: `/products/search/q=${key_word.value.trim()}`,
    });
  }
};
const reload = () => {
  isLogged.value = JSON.parse(localStorage.getItem("user")) ? true : false;
  carts.value = JSON.parse(localStorage.getItem("carts")) ?? [];
  if (isLogged.value) {
    user.value = JSON.parse(localStorage.getItem("user")) ?? "";
  }
};

reload();
</script>

<style scoped>
a {
  text-decoration: none !important;
  color: black;
}
a:hover {
  color: black;
}
.block-left-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* user-header */
.user-header {
  display: none;
  top: 90px;
  right: 200px;
  border: 1px solid #2e3094;
  border-radius: 5px;
  position: absolute;
  z-index: 9;
  background-color: white;
  padding: 10px 15px;
  text-align: left;
}
.btn-user:hover .user-header {
  display: block;
}
/* cart header */
.cart:hover .cart-header {
  display: block;
}
.cart-header {
  display: none;
  width: 25%;
  height: max-content;
  top: 80px;
  right: 300px;
  position: absolute;
  z-index: 9;
}
sup.cart-quantity {
  color: #ed1a29;
  border-radius: 50%;
  padding: 1px 4px;
  font-size: 14px;
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
  padding: 0 15px 15px 15px;
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
  height: 35px;
  border-radius: 50%;
}
.nav-icon {
  font-size: 22px;
}
</style>
