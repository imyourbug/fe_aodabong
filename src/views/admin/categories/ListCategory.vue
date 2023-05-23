<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Danh mục sản phẩm</h1>

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
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Viết tắt</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Viết tắt</th>
                <th>Lựa chọn</th>
              </tr>
            </tfoot>
            <tbody v-if="categories && categories.length > 0">
              <tr v-for="cate in categories" :key="cate.id">
                <td>{{ cate.name }}</td>
                <td>{{ cate.description }}</td>
                <td v-html="active(cate.active)"></td>
                <td>{{ cate.slug }}</td>
                <td>
                  <a
                    data-toggle="modal"
                    data-target="#modalEdit"
                    @click="getCategory(cate)"
                    class="btn btn-primary btn-option"
                  >
                    <i class="fa-solid fa-pen-to-square"></i> </a
                  >&emsp;
                  <a
                    @click="addCateId(cate.id)"
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
          <h5 class="modal-title">Thêm mới danh mục</h5>
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
            <label class="form-label">Tên danh mục</label>
            <input type="text" class="form-control" v-model="category.name" />
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
            <label class="form-label">Mô tả</label>
            <input
              v-model="category.description"
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Danh mục</label>
            <select
              class="form-control"
              v-model="category.parent_id"
              v-if="categories && categories.length > 0"
            >
              <option value="0">Danh mục cha</option>
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
            <label class="form-label">Kích hoạt</label>
            <div class="form-check">
              <input
                v-model="category.active"
                class="form-check-input"
                name="active1"
                value="1"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Có
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="category.active"
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
          <h5 class="modal-title">Chỉnh sửa danh mục</h5>
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
            <label class="form-label">Tên danh mục</label>
            <input type="text" class="form-control" v-model="category.name" />
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
            <label class="form-label">Mô tả</label>
            <input
              v-model="category.description"
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Danh mục</label>
            <select
              class="form-control"
              v-model="category.parent_id"
              v-if="categories && categories.length > 0"
            >
              <option value="0">Danh mục cha</option>
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
            <label class="form-label">Kích hoạt</label>
            <div class="form-check">
              <input
                v-model="category.active"
                class="form-check-input"
                name="active"
                value="1"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Có
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="category.active"
                class="form-check-input"
                name="active"
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
          <h5 class="modal-title">Xóa danh mục</h5>
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
          <h6>Bạn có muốn xóa danh mục này?</h6>
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
import { required, helpers } from "@vuelidate/validators";
import { useStore } from "vuex";

const toast = useToasted();
const store = useStore();
const router = useRouter();
const emitter = inject("emitter");
const categoryRepository = RepositoryFactory.get("category");

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const list_cate_id = ref([]);
const category = reactive({
  id: 0,
  parent_id: 0,
  name: "",
  active: 1,
  description: "",
});

const categories = computed(() => {
  console.log(store.state.categories.all);
  return store.state.categories.all;
});

// validate
const rules = {
  name: { required: helpers.withMessage("Không được để trống!", required) },
};

const v$ = useVuelidate(rules, category);

const reload = () => {
  store.dispatch("categories/getAll");
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
    categoryRepository.create(category).then((response) => {
      if (response.data.status === 0) {
        reload();
        toast.success("Tạo danh mục thành công", {
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
  categoryRepository.edit(category).then((response) => {
    if (response.data.status === 0) {
      reload();
      toast.success("Chỉnh sửa danh mục thành công", {
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

const getCategory = (cate) => {
  category.id = cate.id;
  category.parent_id = cate.parent_id;
  category.name = cate.name;
  category.active = cate.active;
  category.description = cate.description;
};

const remove = () => {
  if (list_cate_id.value.length === 0) {
    toast.error("Bạn cần chọn ít nhất một danh mục", {
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
    let id = list_cate_id.value[0];
    categoryRepository.remove(id).then((response) => {
      if (response.data.status === 0) {
        reload();
        toast.success("Xóa danh mục thành công", {
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

const addCateId = (category_id) => {
  list_cate_id.value = [];
  list_cate_id.value.push(category_id);
};

const reset = () => {
  category.id = 0;
  category.parent_id = 0;
  category.name = "";
  category.active = 1;
  category.description = "";
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
.select2 {
  width: 100%;
  z-index: 9999;
}
</style>
