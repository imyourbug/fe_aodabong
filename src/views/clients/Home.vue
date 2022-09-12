<template>
  <main>
    <div class="group-product" v-for="(group, key) in groups" v-bind:key="key">
      <div
        class="album bg-light"
        v-if="group.products && group.products.length > 0"
      >
        <div class="container">
          <div class="block-text-1">
            <div class="block-text-left">
              <a class="btn-left" @click="groupProduct(group.category_id)"
                >&ensp;<i class="far fa-futbol"></i>&ensp;{{
                  group.category_name
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
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
            <div
              class="col"
              v-for="(product, key) in group.products"
              v-bind:key="key"
            >
              <div class="block-product" @click="detailProduct(product.id)">
                <a> <img src="@/assets/khai.png" /></a>
                <a>
                  <p>{{ product.name }}</p>
                </a>
                {{ product.price_sale ?? product.price }}
                <br />
                <br />
                <a class="detail"> Chi tiết</a>
                <br />&ensp;
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </main>
</template>

<script>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { ref } from "vue";

const clientRepository = RepositoryFactory.get("client");

export default {
  name: "Home",
  setup() {
    const groups = ref([]);
    clientRepository
      .getAllProductGroup()
      .then((response) => {
        groups.value = response.data.data;
        console.log(groups);
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      groups,
    };
  },
  methods: {
    displayPrice(price, price_sale) {
      if (price_sale != 0) {
        return (
          "Giá: " +
          this.formatCash(price) +
          'đ&ensp;< sup style = "text-decoration: line-through; opacity:0.6" > ' +
          this.formatCash(price_sale) +
          "đ</sup>"
        );
      }
      return "Giá: " + price + "đ";
    },

    formatCash(str) {
      return str
        .toString()
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ".") + prev;
        });
    },

    detailProduct(id) {
      this.$router.push({
        path: "/products/detail/" + id,
        params: {
          id: id,
        },
      });
    },
    groupProduct(id) {
      this.$router.push({
        path: "/categories/" + id,
      });
    },
  },
};
</script>

<style>
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
</style>