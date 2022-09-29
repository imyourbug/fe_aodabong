<template>
  <div class="container rounded bg-white mt-2 mb-5">
    <div class="row block-text-1">
      <div class="btn-left">
        &ensp;<i class="far fa-futbol"></i>&ensp;Thông tin cá nhân&emsp;
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 border-right block-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            @click="changeImage"
            class="rounded-circle mt-5 avatar"
            :src="user.url"
            width="90"
          /><span class="font-weight-bold">{{ user.name }}</span
          ><span class="text-black-50">{{ user.email }}</span
          ><span>United States</span>
        </div>
      </div>
      <div class="col-md-7 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="text-right">Thông tin cá nhân</h6>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <label class="labels">Họ tên</label
              ><input
                type="text"
                class="form-control"
                placeholder="first name"
                v-model="user.name"
                :readonly="!isEdit"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">Địa chỉ</label
              ><input
                type="text"
                class="form-control"
                placeholder="Địa chỉ"
                v-model="user.address"
                :readonly="!isEdit"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Số điện thoại</label
              ><input
                type="text"
                class="form-control"
                placeholder="Số điện thoại"
                v-model="user.phone"
                :readonly="!isEdit"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Mã bưu điện</label
              ><input
                type="text"
                class="form-control"
                placeholder="Mã bưu điện"
                v-model="user.zip_code"
                :readonly="!isEdit"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6">
              <label class="labels">Quận/huyện</label
              ><input
                type="text"
                class="form-control"
                placeholder="Quận/huyện"
                v-model="user.district"
                :readonly="!isEdit"
              />
            </div>
            <div class="col-md-6">
              <label class="labels">Tỉnh/thành phố</label
              ><input
                type="text"
                class="form-control"
                v-model="user.province"
                placeholder="Tỉnh/thành phố"
                :readonly="!isEdit"
              />
            </div>
          </div>
          <div class="mt-5">
            <button
              v-if="!isEdit"
              class="btn btn-primary action-button"
              @click="edit"
            >
              Chỉnh sửa
            </button>
            <button
              v-if="!!isEdit"
              class="btn btn-primary action-button"
              @click="save"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";

const user = ref({});
const isEdit = ref(false);

const changeImage = () => {};

const reload = () => {
  user.value = JSON.parse(localStorage.getItem("user")) ?? {};
};

reload();

const edit = () => {
  isEdit.value = true;
};

const save = () => {
  if (confirm("Bạn có muốn lưu thay đổi?")) {
    isEdit.value = false;
  }
};
</script>

<style scoped>
.block-text-1 {
  border-bottom: 1px solid #ed1a29;
  margin: 0px 35px;
}
.btn-left {
  background-color: #ed1a29;
  font-size: 17px;
  font-weight: bold;
  width: max-content;
  padding: 5px;
  color: white;
}
.form-control:focus {
  box-shadow: none;
}

.action-button {
  background-color: #2e3094;
  border: none;
  width: 100px;
}

.action-button:hover {
  background-color: #ed1a29 !important;
}

.labels {
  font-size: 12px;
}

.avatar:hover {
  scale: 1.5;
  transition: 0.5s all ease;
  cursor: pointer;
}
</style>
