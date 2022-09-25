<template>
  <div class="container card">
    <div class="row user py-3 px-3">Sản phẩm mới thêm</div>
    <div class="cart" v-if="carts && carts.length > 0">
      <div
        class="row product py-1"
        v-for="(product, key) in carts
          .slice(carts.length - 6, carts.length - 1)
          .reverse()"
        v-bind:key="key"
      >
        <div class="col-3">
          <img class="thumb" src="@/assets/08-30-20ao1.jpg" />
        </div>
        <div class="col-5">
          {{ product.name }}
        </div>
        <div class="col-4 price">
          {{ formatCash(product.unit_price) }}<sup>đ</sup>
        </div>
      </div>
      <div class="row py-3">
        <div class="col-6">{{ carts.length }} sản phẩm trong giỏ</div>
        <div class="col-6 right">
          <router-link class="btn-cart" to="/carts">Xem giỏ hàng</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

// const emit = defineEmits([])

const props = defineProps({
  carts: Object,
  user: Object,
});

const reload = () => {};

// format cash
const formatCash = (str) => {
  return str
    .toString()
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.card {
  background-color: rgb(248, 233, 233);
  text-align: left;
}
.btn-cart {
  color: white;
  background-color: #2f3094;
  padding: 10px 15px;
  border-radius: 5px;
}
.btn-cart:hover {
  background-color: #ed1a29;
}
.user,
.product {
  align-items: center;
}
.user-avt {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.thumb {
  width: 40px;
  height: 40px;
}
.price {
  color: #ed1a29;
}
.right {
  text-align: center;
}
</style>
