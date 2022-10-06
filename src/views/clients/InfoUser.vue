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
            :src="`${domain}${user.avatar}`"
            width="90"
          />
          <input
            class="upload"
            type="file"
            v-if="!!isEdit"
            @change="changeImage"
          />
          <span class="font-weight-bold">{{ user.name }}</span
          ><span class="text-black-50">{{ user.email }}</span>
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
                placeholder="Họ tên"
                v-model="user.name"
                :readonly="!isEdit"
              />
              <div :class="{ error: v$.name.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.name.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <label class="labels">Tỉnh/thành phố</label>
              <input
                type="text"
                class="form-control"
                v-model="user.province"
                placeholder="Tỉnh/thành phố"
                :readonly="!isEdit"
                v-if="!isEdit"
              />
              <div v-else>
                <Select2
                  :options="source.provinces"
                  :settings="{ settingOption: value, settingOption: value }"
                  @select="selectProvince($event)"
                />
                <h4>{{ value }}</h4>
              </div>
              <div :class="{ error: v$.province.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.province.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label class="labels">Quận/huyện</label>
              <input
                type="text"
                class="form-control"
                placeholder="Quận/huyện"
                v-model="user.district"
                :readonly="!isEdit"
                v-if="!isEdit"
              />
              <div v-else>
                <Select2
                  :options="source.districts"
                  :settings="{ settingOption: value, settingOption: value }"
                  @select="selectDistrict($event)"
                />
                <h4>{{ value }}</h4>
              </div>
              <div :class="{ error: v$.district.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.district.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6">
              <label class="labels">Xã</label>
              <input
                type="text"
                class="form-control"
                placeholder="Xã"
                v-model="user.ward"
                :readonly="!isEdit"
                v-if="!isEdit"
              />
              <div v-else>
                <Select2
                  :options="source.wards"
                  :settings="{ settingOption: value, settingOption: value }"
                  @select="selectWard($event)"
                />
                <h4>{{ value }}</h4>
              </div>
              <div :class="{ error: v$.ward.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.ward.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label class="labels">Đường</label
              ><input
                type="text"
                class="form-control"
                placeholder="Đường"
                v-model="user.street"
                :readonly="!isEdit"
              />
              <div :class="{ error: v$.street.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.street.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
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
              <div :class="{ error: v$.phone.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.phone.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
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
              <div :class="{ error: v$.zip_code.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.zip_code.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
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
import { ref, inject, reactive } from "vue";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const uploadRepository = RepositoryFactory.get("upload");
const clientRepository = RepositoryFactory.get("client");
const provinceRepository = RepositoryFactory.get("province");
const emitter = inject("emitter");

const domain = process.env.VUE_APP_DOMAIN_URL;
const user = ref({});
const isEdit = ref(false);
const source = reactive({
  provinces: [],
  districts: [],
  wards: [],
});
// const isUploadImage = ref(false);

// validate

const valid_phone = helpers.regex(/^[0]\d{9}$/);

const rules = {
  name: {
    required: helpers.withMessage("Không được để trống", required),
  },
  phone: {
    required: helpers.withMessage("Không được để trống", required),
    valid_phone: helpers.withMessage("Số điện thoại không hợp lệ", valid_phone),
  },
  province: {
    required: helpers.withMessage("Không được để trống", required),
  },
  district: {
    required: helpers.withMessage("Không được để trống", required),
  },
  ward: {
    required: helpers.withMessage("Không được để trống", required),
  },
  street: {
    required: helpers.withMessage("Không được để trống", required),
  },
  zip_code: {
    required: helpers.withMessage("Không được để trống", required),
  },
};

const v$ = useVuelidate(rules, user);

// select
const selectProvince = (province) => {
  user.value.province = province.text;
  // load districts
  provinceRepository
    .getDistrictsByCodeProvince(province.id)
    .then((response) => {
      let data = [];
      response.data.districts.forEach((item) => {
        data.push({
          // text is require to show value in screen
          // id is require to select an option
          id: item.code,
          text: item.name,
        });
      });
      source.districts = data;
    });
};

const selectDistrict = (district) => {
  user.value.district = district.text;
  // load districts
  provinceRepository.getWardsByCodeDistrict(district.id).then((response) => {
    let data = [];
    response.data.wards.forEach((item) => {
      data.push({
        // text is require to show value in screen
        // id is require to select an option
        id: item.code,
        text: item.name,
      });
    });
    source.wards = data;
  });
};

const selectWard = (ward) => {
  user.value.ward = ward.text;
};

// upload avatar
const changeImage = async (event) => {
  let formData = new FormData();
  console.log(event.target.files);
  formData.append("image_file", event.target.files[0]);
  let respone_upload = await uploadRepository.uploadImage(formData);
  if (respone_upload.data.status === 0) {
    user.value.avatar = respone_upload.data.url;
  }
  if (respone_upload.data.status === 1) {
    alert(respone_upload.data.error.message);
  }
  if (respone_upload.data.status !== 1 && respone_upload.data.status !== 0) {
    alert(respone_upload);
  }
};

const updateInfo = (user) => {
  clientRepository.updateInfo(user).then((response) => {
    if (response.data.status === 0) {
      console.log(response.data.user);
      saveUser(response.data.user);
      emitter.emit("reloadHeader");
      isEdit.value = false;
      reload();
    }
    if (response.data.status === 1) {
      console.log(response.data.error.message);
    }
    if (response.data.status !== 1 && response.data.status !== 0) {
      console.log(response);
    }
  });
};

const reload = () => {
  user.value = JSON.parse(localStorage.getItem("user")) ?? {};
  // load provinces
  provinceRepository.getAllProvinces().then((response) => {
    let data = [];
    response.data.forEach((item) => {
      data.push({
        // text is require to show value in screen
        // id is require to select an option
        id: item.code,
        text: item.name,
      });
    });
    source.provinces = data;
  });
};

reload();

const edit = () => {
  isEdit.value = true;
};

const save = async () => {
  if (confirm("Bạn có muốn lưu thay đổi?")) {
    v$.value.$validate();
    if (v$.value.$invalid) {
      alert("Vui lòng điền đầy đủ thông tin");
    } else updateInfo(user.value);
  }
};

const saveUser = (user) => {
  let account = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    province: user.province,
    district: user.district,
    ward: user.ward,
    street: user.street,
    zip_code: user.zip_code,
    // authtoken: user.authtoken,
    avatar:
      user.avatar ??
      `${process.env.VUE_APP_DOMAIN_URL}/storage/uploads/default.jpg`,
  };
  localStorage.setItem("user", JSON.stringify(account));
};
</script>

<style scoped>
input.upload {
  font-size: 10px;
}
/* block-text-1 */
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

.avatar {
  width: 70px;
  height: 70px;
}

.avatar:hover {
  scale: 1.5;
  transition: 0.5s all ease;
  cursor: pointer;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
