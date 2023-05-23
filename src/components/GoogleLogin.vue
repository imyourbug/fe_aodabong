<template>
  <div class="row">
    <div class="col-md-12 block-btn">
      <a
        class="btn btn-lg btn-google btn-block text-uppercase btn-outline"
        @click="logInByGoogle"><img src="https://img.icons8.com/color/16/000000/google-logo.png" />
        Đăng nhập bằng Google</a>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";

const Vue3GoogleOauth = inject("Vue3GoogleOauth");
const emitter = inject("emitter");
const router = useRouter();

const authRepository = RepositoryFactory.get("auth");

const logInByGoogle = async () => {
  try {
  const googleUser = await Vue3GoogleOauth.instance.signIn();
  // save user login
  if (googleUser) {
  let account = {
    id: googleUser.getBasicProfile().getId(),
    name: googleUser.getBasicProfile().getName(),
    email: googleUser.getBasicProfile().getEmail(),
    access_token: googleUser.Cc.access_token,
    avatar: googleUser.getBasicProfile().getImageUrl(),
    type: "social",
  };
  authRepository.googleLogin(account).then((response) => {
    if (response.data.status === 0) {
      let user = response.data.data[1].user;
      saveGoogleUser(user);
      // Change name
      emitter.emit("reloadHeader");
      //
      router.push({ name: user.role === 0 ? "home" : "admin-home" });
    }
    if (response.data.status === 1) {
      alert(response.data.error.message);
    }
    if (response.data.status !== 0 && response.data.status !== 1) {
      alert(response.data);
    }
  });
    }
  } catch (e) {
    console.log(e);
  }
};

const saveGoogleUser = (account) => {
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
