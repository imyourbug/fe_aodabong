<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Danh sách sản phẩm</h1>

    <!-- DataTales Example -->
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
                <th>Danh mục</th>
                <th>Nhà cung cấp</th>
                <th>Kích hoạt</th>
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
                <th>Danh mục</th>
                <th>Nhà cung cấp</th>
                <th>Kích hoạt</th>
                <th>Ảnh</th>
                <th>Lựa chọn</th>
              </tr>
            </tfoot>
            <tbody v-if="products && products.length > 0">
              <tr v-for="pro in products" :key="pro.id">
                <td>
                  <input
                    class="form-check-input select-all"
                    type="checkbox"
                    :checked="isSelectAll"
                    @click="select(pro.id)"
                  />
                </td>
                <td>{{ pro.name }}</td>
                <td>{{ pro.category.name }}</td>
                <td>{{ pro.supplier.name }}</td>
                <td v-html="active(pro.active)"></td>
                <td><img class="thumb" :src="pro.thumb" /></td>
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#modalEdit"
                    @click="getProduct(pro)"
                    class="btn btn-primary btn-option"
                  >
                    <i class="fa-solid fa-pen-to-square"></i> </a
                  >&emsp;
                  <a
                    @click="addProductId(pro.id)"
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
          <h5 class="modal-title">Thêm mới sản phẩm</h5>
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
            <label class="form-label">Tên sản phẩm</label>
            <input type="text" class="form-control" v-model="product.name" />
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
          <div class="mb-3">
            <label class="form-label">Ảnh</label>
            <input @change="uploadImage" type="file" class="form-control" />
            <img :src="product.thumb" />
          </div>
          <div class="mb-3">
            <label class="form-label">Danh mục</label>
            <select
              class="form-control"
              v-model="product.category_id"
              v-if="categories && categories.length > 0"
            >
              <option
                :value="cate.id"
                v-for="cate in categories"
                :key="cate.id"
              >
                {{ cate.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Nhà cung cấp</label>
            <select
              class="form-control"
              v-model="product.supplier_id"
              v-if="suppliers && suppliers.length > 0"
            >
              <option
                :value="supplier.id"
                v-for="supplier in suppliers"
                :key="supplier.id"
              >
                {{ supplier.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Kích hoạt</label>
            <div class="form-check">
              <input
                v-model="product.active"
                class="form-check-input"
                name="active1"
                value="1"
                type="radio"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Có
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="product.active"
                class="form-check-input"
                name="active1"
                value="0"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Không
              </label>
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
          <h5 class="modal-title">Chỉnh sửa sản phẩm</h5>
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
            <label class="form-label">Tên sản phẩm</label>
            <input type="text" class="form-control" v-model="product.name" />
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
          <div class="mb-3">
            <label class="form-label">Ảnh</label>
            <input @change="uploadImage" type="file" class="form-control" />
            <img :src="product.thumb" />
          </div>
          <div class="mb-3">
            <label class="form-label">Danh mục</label>
            <select
              class="form-control"
              v-model="product.category_id"
              v-if="categories && categories.length > 0"
            >
              <option
                :value="cate.id"
                v-for="cate in categories"
                :key="cate.id"
              >
                {{ cate.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Nhà cung cấp</label>
            <select
              class="form-control"
              v-model="product.supplier_id"
              v-if="suppliers && suppliers.length > 0"
            >
              <option
                :value="supplier.id"
                v-for="supplier in suppliers"
                :key="supplier.id"
              >
                {{ supplier.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Kích hoạt</label>
            <div class="form-check">
              <input
                v-model="product.active"
                class="form-check-input"
                name="active1"
                value="1"
                type="radio"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Có
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="product.active"
                class="form-check-input"
                name="active1"
                value="0"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Không
              </label>
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
          <h5 class="modal-title">Xóa sản phẩm</h5>
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
          <h6>Bạn có muốn xóa sản phẩm này?</h6>
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
import { ref, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { useToasted } from "@hoppscotch/vue-toasted";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { is } from "@babel/types";

const toast = useToasted();
const router = useRouter();
const emitter = inject("emitter");
const productRepository = RepositoryFactory.get("product");
const categoryRepository = RepositoryFactory.get("category");
const supplierRepository = RepositoryFactory.get("supplier");
const uploadRepository = RepositoryFactory.get("upload");

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const products = ref([]);
const categories = ref([]);
const suppliers = ref([]);
const ids = ref([]);
const isSelectAll = ref(false);
const product = reactive({
  id: 0,
  category_id: 0,
  supplier_id: 0,
  name: "",
  active: 1,
  thumb: "",
});

// validate
const rules = {
  name: { required: helpers.withMessage("Không được để trống!", required) },
};

const v$ = useVuelidate(rules, product);

const getAllCategories = () => {
  categoryRepository.getAllCategories().then((response) => {
    if (response.data.status === 0) {
      categories.value = response.data.categories;
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

const getAllSuppliers = () => {
  supplierRepository.getAll().then((response) => {
    if (response.data.status === 0) {
      suppliers.value = response.data.suppliers;
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

const reload = () => {
  isSelectAll.value = false;
  ids.value = [];
  getAllCategories();
  getAllSuppliers();
  productRepository.getAll().then((response) => {
    if (response.data.status === 0) {
      products.value = response.data.products;
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
    productRepository.create(product).then((response) => {
      if (response.data.status === 0) {
        reload();
        toast.success("Tạo sản phẩm thành công", {
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
  productRepository.edit(product).then((response) => {
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

const getProduct = (pro) => {
  product.id = pro.id;
  product.category_id = pro.category_id;
  product.supplier_id = pro.supplier_id;
  product.name = pro.name;
  product.active = pro.active;
  product.thumb = pro.thumb;
};

const remove = () => {
  productRepository.remove(product.id).then((response) => {
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
    productRepository.removeAll(ids.value).then((response) => {
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

const addProductId = (product_id) => {
  product.id = product_id;
};

const uploadImage = (event) => {
  let formData = new FormData();
  formData.append("image_file", event.target.files[0]);
  uploadRepository.uploadImage(formData).then((response) => {
    if (response.data.status === 0) {
      product.thumb = response.data.url;
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
  product.id = 0;
  product.name = "";
  product.category_id = 0;
  product.supplier_id = 0;
  product.active = 1;
  product.thumb = "";
};

const active = (active) => {
  return active === 1
    ? '<span class="btn btn-danger btn-xs">Không</span>'
    : '<span class="btn btn-success btn-xs">Có</span>';
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
