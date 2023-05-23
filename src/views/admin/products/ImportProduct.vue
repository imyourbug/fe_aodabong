<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Danh sách chi tiết sản phẩm</h1>
    <div class="row">
      <div class="col-lg-3">
        <label>Tìm theo tên sản phẩm</label
        ><Select2
          class="select2"
          :options="products_select2"
          :settings="{ settingOption: value, settingOption: value }"
          @select="selectProduct($event)"
        />
        <h4>{{ value }}</h4>
      </div>
    </div>
    <!-- List in stock -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Danh sách</h6>
        <button
          @click="reset"
          class="btn btn-success btn-add"
          data-toggle="modal"
          data-target="#modalAdd"
        >
          <i class="fa-solid fa-plus"></i>&ensp;Thêm mới
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>
                  <input
                    class="form-check-input select-all"
                    type="checkbox"
                    @click="selectAll"
                    :checked="isSelectAll"
                  />&emsp;<i
                    v-if="isSelectAll || ids.length > 0"
                    @click="removeAll"
                    class="fas fa-trash delete-all"
                  ></i>
                </th>
                <th>Tên sản phẩm</th>
                <th>Màu</th>
                <th>Size</th>
                <th>Số lượng trong kho</th>
                <th>Ảnh</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>
                  <input
                    class="form-check-input select-all"
                    type="checkbox"
                    @click="selectAll"
                    :checked="isSelectAll"
                  />&emsp;<i
                    v-if="isSelectAll || ids.length > 0"
                    @click="removeAll"
                    class="fas fa-trash delete-all"
                  ></i>
                </th>
                <th>Tên sản phẩm</th>
                <th>Màu</th>
                <th>Size</th>
                <th>Số lượng trong kho</th>
                <th>Ảnh</th>
                <th>Lựa chọn</th>
              </tr>
            </tfoot>
            <tbody v-if="details && details.length > 0">
              <tr v-for="detail in details" :key="detail.id">
                <td>
                  <input
                    class="form-check-input select-all"
                    type="checkbox"
                    :checked="isSelectAll"
                    @click="select(detail.id)"
                  />
                </td>
                <td>{{ detail.product.name }}</td>
                <td v-html="showColor(detail.code_color)"></td>
                <td>{{ detail.code_size }}</td>
                <td>{{ detail.unit_in_stock }}</td>
                <td><img class="thumb" :src="detail.thumb" /></td>
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#modalEdit"
                    @click="getDetailProduct(detail)"
                    class="btn btn-primary btn-option"
                  >
                    <i class="fa-solid fa-pen-to-square"></i> </a
                  >&emsp;
                  <a
                    @click="addDetailId(detail.id)"
                    class="btn btn-danger btn-option"
                    data-toggle="modal"
                    data-target="#modalRemove"
                  >
                    <i class="fas fa-trash"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal add -->
  <div
    class="modal fade"
    id="modalAdd"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Thêm chi tiết sản phẩm</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Sản phẩm</label>
            <select
              class="form-control"
              v-model="detail_product.product_id"
              v-if="products && products.length > 0"
            >
              <option
                :value="product.id"
                v-for="product in products"
                :key="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Màu sắc</label>
            <input
              type="color"
              class="form-control"
              v-model="detail_product.color"
            />
            <div :class="{ error: v$.color.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.color.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Size</label>
            <select class="form-control" v-model="detail_product.size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <div :class="{ error: v$.size.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.size.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Số lượng nhập</label>
            <input
              type="number"
              class="form-control"
              v-model="detail_product.quantity"
            />
            <div :class="{ error: v$.quantity.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.quantity.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Ảnh</label>
            <input @change="uploadImage" type="file" class="form-control" />
            <img :src="detail_product.thumb" />
            <div :class="{ error: v$.thumb.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.thumb.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="add">Lưu</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal">
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal edit -->
  <div
    class="modal fade"
    id="modalEdit"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chỉnh sửa chi tiết sản phẩm</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Sản phẩm</label>
            <select
              disabled
              class="form-control"
              v-model="detail_product.product_id"
              v-if="products && products.length > 0"
            >
              <option
                :value="product.id"
                v-for="product in products"
                :key="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Màu sắc</label>
            <input
              type="color"
              class="form-control"
              v-model="detail_product.color"
            />
            <div :class="{ error: v$.color.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.color.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Size</label>
            <select class="form-control" v-model="detail_product.size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <div :class="{ error: v$.size.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.size.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Số lượng trong kho</label>
            <input
              type="number"
              class="form-control"
              v-model="detail_product.quantity"
            />
            <div :class="{ error: v$.quantity.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.quantity.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Ảnh</label>
            <input @change="uploadImage" type="file" class="form-control" />
            <img :src="detail_product.thumb" />
            <div :class="{ error: v$.thumb.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.thumb.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="edit">Lưu</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal">
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal remove -->
  <div
    class="modal fade"
    id="modalRemove"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Xóa sản phẩm trong kho</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <h6>Bạn có muốn xóa sản phẩm này trong kho?</h6>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="remove">Xóa</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal">
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { useToasted } from "@hoppscotch/vue-toasted";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minValue } from "@vuelidate/validators";
import { useStore } from "vuex";

const toast = useToasted();
const store = useStore();
const router = useRouter();
const emitter = inject("emitter");
const detailRepository = RepositoryFactory.get("detail_product");
const categoryRepository = RepositoryFactory.get("category");
const supplierRepository = RepositoryFactory.get("supplier");
const uploadRepository = RepositoryFactory.get("upload");

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;

const details = computed(() => {
  return store.state.detail_products.details;
});
const products = computed(() => {
  return store.state.products.all;
});
const products_select2 = computed(() => {
  let _products = [{ id: 0, text: "Tất cả" }];
  store.state.products.all.forEach((item) => {
    _products.push({
      id: item.id,
      text: item.name,
    });
  });
  return _products;
});

const ids = ref([]);
const isSelectAll = ref(false);
const detail_product = reactive({
  id: 0,
  product_id: "",
  size: "",
  color: "",
  quantity: 0,
  thumb: "",
});

// validate
const rules = {
  size: { required: helpers.withMessage("Không được để trống!", required) },
  color: { required: helpers.withMessage("Không được để trống!", required) },
  thumb: { required: helpers.withMessage("Không được để trống!", required) },
  quantity: {
    required: helpers.withMessage("Không được để trống!", required),
    minValue: helpers.withMessage("Số lượng nhập phải lớn hơn 0!", minValue(1)),
  },
};

const v$ = useVuelidate(rules, detail_product);

const reload = () => {
  isSelectAll.value = false;
  ids.value = [];
  store.dispatch("detail_products/getAll");
  store.dispatch("products/getAll");
  v$.value.$reset();
};

reload();

const add = () => {
  v$.value.$validate();
  if (v$.value.$invalid) {
    toast.error("Vui lòng điền đầy đủ thông tin", {
      duration: duration_time,
      action: [
        {
          text: `OK`,
          onClick: (_, toastObject) => {
            toastObject.goAway(0);
          },
        },
      ],
    });
  } else {
    detailRepository.create(detail_product).then((response) => {
      if (response.data.status === 0) {
        reload();
        toast.success("Thêm thành công", {
          duration: duration_time,
          action: [
            {
              text: `OK`,
              onClick: (_, toastObject) => {
                toastObject.goAway(0);
              },
            },
          ],
        });
      }
      if (response.data.status === 1) {
        toast.error(response.data.error.message, {
          duration: duration_time,
          action: [
            {
              text: `OK`,
              onClick: (_, toastObject) => {
                toastObject.goAway(0);
              },
            },
          ],
        });
      }
      if (response.data.status !== 1 && response.data.status !== 0) {
        console.log(response);
      }
    });
  }
};

const edit = () => {
  detailRepository.edit(detail_product).then((response) => {
    if (response.data.status === 0) {
      reload();
      toast.success("Chỉnh sửa sản phẩm thành công", {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    }
    if (response.data.status === 1) {
      toast.error(response.data.error.message, {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    }
    if (response.data.status !== 1 && response.data.status !== 0) {
      console.log(response);
    }
  });
};

const getDetailProduct = (detail) => {
  detail_product.id = detail.id;
  detail_product.product_id = detail.product_id;
  detail_product.size = detail.code_size;
  detail_product.color = detail.code_color;
  detail_product.quantity = detail.unit_in_stock;
  detail_product.thumb = detail.thumb;
};

const remove = () => {
  detailRepository.remove(detail_product.id).then((response) => {
    if (response.data.status === 0) {
      reload();
      toast.success("Xóa sản phẩm thành công", {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    }
    if (response.data.status === 1) {
      toast.error(response.data.error.message, {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    }
    if (response.data.status !== 1 && response.data.status !== 0) {
      console.log(response);
    }
  });
};

const removeAll = () => {
  if (ids.value.length === 0) {
    toast.error("Không có sản phẩm để xóa", {
      duration: duration_time,
      action: [
        {
          text: `OK`,
          onClick: (_, toastObject) => {
            toastObject.goAway(0);
          },
        },
      ],
    });
  } else {
    detailRepository.removeAll(ids.value).then((response) => {
      if (response.data.status === 0) {
        reload();
        toast.success("Xóa sản phẩm thành công", {
          duration: duration_time,
          action: [
            {
              text: `OK`,
              onClick: (_, toastObject) => {
                toastObject.goAway(0);
              },
            },
          ],
        });
      }
      if (response.data.status === 1) {
        toast.error(response.data.error.message, {
          duration: duration_time,
          action: [
            {
              text: `OK`,
              onClick: (_, toastObject) => {
                toastObject.goAway(0);
              },
            },
          ],
        });
      }
      if (response.data.status !== 1 && response.data.status !== 0) {
        console.log(response);
      }
    });
  }
};

const addDetailId = (detail_id) => {
  detail_product.id = detail_id;
};

const uploadImage = (event) => {
  let formData = new FormData();
  formData.append("image_file", event.target.files[0]);
  uploadRepository.uploadImage(formData).then((response) => {
    if (response.data.status === 0) {
      detail_product.thumb = response.data.url;
    }
    if (response.data.status === 1) {
      toast.error(response.data.error.message, {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    }
    if (response.data.status !== 1 && response.data.status !== 0) {
      console.log(response);
    }
  });
};

const select = (category_id) => {
  if (ids.value.includes(category_id)) {
    ids.value = ids.value.filter((id) => {
      return id !== category_id;
    });
  } else {
    ids.value.push(category_id);
  }
  console.log(ids.value);
};

const selectAll = () => {
  isSelectAll.value = !isSelectAll.value;
  ids.value = [];
  if (isSelectAll.value === true) {
    products.value.forEach((item) => {
      ids.value.push(item.id);
    });
  }
  console.log(ids.value);
};

const reset = () => {
  detail_product.id = 0;
  detail_product.product_id = 0;
  detail_product.size = "";
  detail_product.color = "";
  detail_product.unit_in_stock = 0;
  detail_product.unit_import = 0;
  detail_product.thumb = "";
};

const showColor = (code_color) => {
  return `<span class="btn btn-xs" style="background-color:${code_color};height: 40px;
  width: 40px;"></span>`;
};

const selectProduct = (product) => {
  isSelectAll.value = false;
  ids.value = [];
  store.dispatch("detail_products/getByProductId", product.id);
};
</script>

<style scoped>
/* @import "../../../../public/css/sb-admin-2.min.css"; */
.btn-option {
  border-radius: 50%;
  padding: 5px 10px;
  color: white;
}
.btn-option:hover {
  color: white !important;
}
.btn-add {
  float: right;
}
.card-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
.thumb {
  width: 50px;
  height: 50px;
}
.delete-all {
  margin-left: 25px;
  color: #ed1a29;
}
.delete-all:hover {
  cursor: pointer;
}
.select-all {
  margin-left: 15px;
}
</style>
