<template>
  <div class="row">
    <div class="col-md-12 block-btn">
      <a
        class="btn btn-lg btn-google btn-block text-uppercase btn-outline"
        @click="logInByGoogle"
        href="#"
        ><img src="https://img.icons8.com/color/16/000000/google-logo.png" />
        Đăng nhập bằng Google</a
      >
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const Vue3GoogleOauth = inject("Vue3GoogleOauth");
const emitter = inject("emitter");
const router = useRouter();

const logInByGoogle = async () => {
  try {
    const googleUser = await Vue3GoogleOauth.instance.signIn();
    // save user login
    saveGoogleUser(googleUser);
    // Change name
    emitter.emit("reloadHeader");
    //
    router.push({ name: "home" });
  } catch (e) {
    console.log(e);
  }
};

const saveGoogleUser = (user) => {
  let account = {
    id: user.getBasicProfile().getId(),
    name: user.getBasicProfile().getName(),
    email: user.getBasicProfile().getEmail(),
    access_token: user.Cc.access_token,
    url: user.getBasicProfile().getImageUrl(),
  };
  localStorage.setItem("user", JSON.stringify(account));
};
</script>

<style scoped>
.btn-google {
  color: #545454;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 1px #ddd;
  font-size: 14px;
}
.btn-google img {
  padding-bottom: 3px;
}
</style>
