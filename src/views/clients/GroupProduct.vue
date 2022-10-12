<template>
  <main>
    <div class="row">
      <div class="block-head-2">
        <div class="head-text">
          <router-link :to="{ name: 'home' }" style="color: #ed1a29"
            >Trang chủ</router-link
          >
          >> <a style="color: #ed1a29" href="#"> {{ category.detail.name }} </a>
        </div>
      </div>
    </div>
    <div class="group-product">
      <div class="album bg-light">
        <div class="container">
          <div class="block-text-1">
            <div class="block-text-left">
              <a class="btn-left"
                >&ensp;<i class="far fa-futbol"></i>&ensp;{{
                  category.detail.name
                }}&emsp;</a
              >
            </div>
            <div class="block-text-right">
              <a class="btn-right"
                >Xem thêm <i class="fas fa-chevron-right"></i
                ><i class="fas fa-chevron-right"></i
              ></a>
            </div>
          </div>
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3"
            v-if="category.products && category.products.length > 0"
          >
            <div
              class="col"
              v-for="(product, key) in category.products"
              :key="key"
            >
              <router-link
                :to="{
                  name: 'product_detail',
                  params: { id: product.product.id },
                }"
              >
                <div class="block-product">
                  <a> <img :src="product.product.thumb" /></a>
                  <a>
                    <p>{{ product.product.name }}</p>
                  </a>
                  {{ formatCash(product.min_price) }}đ
                  {{
                    product.max_price > product.min_price
                      ? ` - ${product.max_price}đ`
                      : ""
                  }}
                  <br />
                  <br />
                  <a class="detail"> Chi tiết</a>
                  <br />&ensp;
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
    <div class="block-feature">
      <div class="features">
        <div class="feature">
          <div class="in-feature"><i class="fas fa-tshirt"></i></div>
          &ensp;
          <div class="in-feature">
            <div class="text-top">SẢN PHẨM ĐA DẠNG</div>
            <div class="text-bot">Cung cấp nhiều mẫu mã đẹp</div>
          </div>
        </div>
        <div class="feature">
          <div class="in-feature"><i class="fas fa-dolly-flatbed"></i></div>
          &ensp;
          <div class="in-feature">
            <div class="text-top">GIAO HÀNG SIÊU TỐC</div>
            <div class="text-bot">Giao hàng ngay sau khi đặt mua</div>
          </div>
        </div>
        <div class="feature">
          <div class="in-feature"><i class="fas fa-handshake"></i></div>
          &ensp;
          <div class="in-feature">
            <div class="text-top">CHÍNH SÁCH ƯU ÁI</div>
            <div class="text-bot">Chính sách bảo hành dài hạn</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { inject, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emitter = inject("emitter");
const categoryRepository = RepositoryFactory.get("category");

const category_id = ref(router.currentRoute.value.params.category_id ?? "");
const category = ref([]);

emitter.on("reloadGroupProduct", () => {
  reload();
});

const reload = () => {
  categoryRepository
    .getDetailCategory(category_id.value)
    .then((response) => {
      if (response.data.status === 0) {
        category.value = response.data.category;
      }
      if (response.data.status === 1) {
        alert(response.data.error.message);
      }
      if (response.data.status !== 0 && response.data.status !== 1) {
        alert(response.data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const formatCash = (str) => {
  return str
    .toString()
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
};

reload();

onUnmounted(() => {
  // emitter.off("reloadGroupProduct");
});
</script>

<style scoped>
.block-head-2 {
  align-items: center;
  padding: 10px 0px 0px 10px;
}

.block-head-2 a {
  color: black;
}

.block-head-2 a:hover {
  text-decoration: underline;
}
.head-text {
  padding: 15px 160px;
}
.card-body,
.text-card {
  text-align: left;
}
.card-text {
  font-weight: bold;
}

a {
  text-decoration: none;
}

.slider {
  margin: 10px 145px 10px 145px;
}

.list-danhmuc {
  border: 1px solid rgb(218, 209, 209);
  padding: 0px;
  margin: 0px 96px 0px 11px;
}
.danhmuc .text-top {
  color: white;
  background-color: #ed1a29;
  padding: 10px;
  font-size: 17px;
  font-weight: bold;
}
.option a {
  font-size: 16px;
  color: #2e3094;
  width: 100%;
  padding: 10px;
}
.option a:hover {
  color: #ed1a29;
}

.album {
  margin: 0px 145px;
}

.block-text-1 {
  border-bottom: 1px solid #ed1a29;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px 8px 0px;
}
.block-text-1 a {
  color: white;
  padding: 8px;
}
.btn-left {
  background-color: #ed1a29;
  font-size: 17px;
  font-weight: bold;
}
.btn-left:hover {
  color: white;
}
.btn-right {
  background-color: #393a44;
}
.btn-right:hover {
  background-color: #ed1a29;
  color: white;
}
/*  */
.block-product {
  align-items: center;
  text-align: center;
}
.block-product img {
  width: 100%;
}
.block-product p {
  margin-top: 10px;
}

.block-product:hover {
  transition: 0.5s;
  box-shadow: 0px 8px 16px 0px rgb(99, 95, 95);
}
p,
.btn-out {
  text-align: center;
}
.id-pro {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
a,
.block-product p {
  color: black;
}
a:hover,
.block-product p:hover {
  color: #ed1a29;
}
a.detail {
  color: #ed1a29;
  font-weight: bold;
  background-color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 60px;
  outline: 1px solid #ed1a29;
  margin-bottom: 10px;
}
a.detail:hover {
  color: #ed1a29;
  outline: 2px solid #ed1a29;
}

/* block-feature */
.block-feature {
  background-color: rgb(220, 220, 228);
  padding: 50px 160px;
}
.block-feature .features,
.features .feature {
  justify-content: space-between;
  display: flex;
}
.in-feature i {
  color: white;
  font-size: 30px;
  border-radius: 50%;
  padding: 10px 7px 10px 7px;
  background-color: red;
}
.in-feature .text-top {
  font-weight: bold;
  font-size: 18px;
}
</style>
