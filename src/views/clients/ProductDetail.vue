<template>
  <div class="block-content">
    <div class="container">
      <div class="row">
        <div class="block-head-2">
          <div class="head-text">
            <router-link to="/home" style="color: #ed1a29"
              >Trang chủ</router-link
            >
            >><a style="color: #ed1a29" href=""> Sản phẩm </a>
            >>
            {{ data.name }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="detail-pro">
            <img class="img-detail" src="../../assets/08-30-20ao1.jpg" />
            <div class="block-khuyenmai">
              <div class="khuyenmai">
                <i class="far fa-star"></i> Tặng ngay quả bóng đá, giày bóng đá,
                găng tay thủ môn, phụ kiện bóng đá ... tùy theo số lượng đặt
                in.<br /><i class="fas fa-truck-pickup"></i> Miễn phí SHIP TOÀN
                QUỐC khi đặt ONLINE với hóa đơn trên 3 triệu.<br />
                <i class="fa fa-fire"></i> Cùng nhiều khuyến mãi hấp dẫn khác
                đang chờ bạn khám phá ^^
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <p class="text-1"></p>
          <div class="block-soluong">
            <h3>{{ data.name }}</h3>
            <div v-if="data.product_details && data.product_details.length > 0">
              <div class="price">
                {{ formatCash(choice.price) }}<sup>đ</sup>
              </div>
              <br />
              <div class="row">
                <div class="col-3"><label>Kích cỡ</label>&ensp;</div>
                <div class="col-9" v-if="sizes && sizes.length > 0">
                  <label
                    class="radio"
                    v-for="(size, key) in sizes"
                    v-bind:key="key"
                  >
                    <input
                      type="radio"
                      name="size"
                      :value="size"
                      v-model="choice.new_size"
                      @click="getUnitInStock"
                    />
                    <span>{{ size }}</span
                    >&ensp;
                  </label>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-3"><label>Màu sắc</label>&ensp;</div>
                <div class="col-9" v-if="colors && colors.length > 0">
                  <label
                    class="radio"
                    v-for="(color, key) in colors"
                    v-bind:key="key"
                  >
                    <input
                      type="radio"
                      name="color"
                      :value="color"
                      v-model="choice.new_color"
                      @click="getUnitInStock"
                    />
                    <span>{{ getNameByHexColor(color.toString()) }}</span
                    >&ensp;
                  </label>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-3"><label>Số lượng: </label>&ensp;</div>
                <div class="col-9">
                  <input
                    type="button"
                    @click="decreaseQuantity"
                    value="-"
                    class="button"
                  />
                  <input
                    class="soluong"
                    type="text"
                    :value="choice.quantity"
                    id="quantity"
                    readonly
                    name="quantity"
                  />
                  <input
                    type="button"
                    @click="increaseQuantity"
                    value="+"
                    class="button"
                  />
                  &ensp;
                  <label>{{ unit_in_stock }} sản phẩm có sẵn</label>
                </div>
              </div>
              <br />
              <div>
                <button class="giohang" id="add" @click="addProductToCart">
                  <i class="fas fa-cart-plus"></i>&ensp;Thêm vào giỏ</button
                >&emsp;
                <button class="giohang" id="add" @click="buyNow">
                  Mua ngay</button
                >&emsp;
              </div>
            </div>
            <div v-else>
              Sản phẩm đã hết hàng, vẫn còn rất nhiều sản phẩm tương tự chất
              lượng khác đang chờ bạn
              <router-link to="/home"> Click vào đây</router-link>
            </div>
          </div>
          <hr />
          <div class="text-3">
            Giá Hàng Có Sẵn: <label>80k - 120k - 160k và 220k</label>
          </div>
          <div class="text-3">
            Giá Hàng Đặt May: <label>Từ 150 đến 250k (liên hệ trực tiếp)</label>
          </div>
          <hr />
          <p class="text-4">(Nhận in từ 05 bộ trở lên - MIỄN PHÍ IN)</p>
          <div class="block-timework">
            <i class="fas fa-hand-point-right"></i> Mỗi sản phẩm được sản xuất
            nhiều chất liệu vải # nhau - Tương ứng với mỗi mức giá # nhau.<br />
            <i class="far fa-clock"></i> Giờ làm việc: 9h00 - 20h00 (Tất cả các
            ngày)<br />
            <i class="fas fa-truck-pickup"></i> Giao hàng toàn quốc: Từ 24 - 48h
            (cả thời gian in ấn)
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="table-size col-6">
          <table class="tbl-size" cellspacing="0">
            <th colspan="5">BẢNG SIZE ÁO BÓNG ĐÁ</th>
            <tr class="txt-head">
              <td>Size Châu Á</td>
              <td>M</td>
              <td>L</td>
              <td>XL</td>
              <td></td>
            </tr>
            <tr class="txt-head">
              <td>Size Châu Âu</td>
              <td>S</td>
              <td>M</td>
              <td>L</td>
              <td>XL</td>
            </tr>
            <tr>
              <td class="txt-head">Cân nặng</td>
              <td>40 - 54 kg</td>
              <td>55 - 65 kg</td>
              <td>65 -76 kg</td>
              <td>77 - 99 kg</td>
            </tr>
            <tr>
              <td class="txt-head">Chiều cao</td>
              <td>1m50 - 1m66</td>
              <td>1m68 - 1m73</td>
              <td>1m74 - 1m80</td>
              <td>1m81 - 1m90</td>
            </tr>
            <tr>
              <td colspan="5" class="txt-end">
                (size XXL Châu Á chỉ áp dụng cho áo đặt may theo yêu cầu và
                không có sẵn)
              </td>
            </tr>
          </table>
        </div>
        <div class="col-6">
          <img class="img-size" src="../../assets/bang_size_giay.png" />
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { reactive, ref, inject } from "vue";
import { useRouter } from "vue-router";
import ntc from "ntc-hi-js";

const clientRepository = RepositoryFactory.get("client");
const router = useRouter();
const emitter = inject("emitter");

const id_product = parseInt(router.currentRoute.value.params.id);
const data = ref([]);
const sizes = ref([]);
const colors = ref([]);
const unit_in_stock = ref(0);
const choice = reactive({
  id_detail: -1,
  new_size: "",
  new_color: "",
  price: 0,
  quantity: unit_in_stock.value === 0 ? 0 : 1,
});

// get name color
const getNameByHexColor = (hexCode) => {
  return ntc.name(hexCode, "en").color.name;
};

const reload = () => {
  // get detail product
  clientRepository.getDetailProduct(id_product).then((response) => {
    data.value = response.data.data.product;
    // console.log(data.value);
    // get sizes and colors
    let size = [];
    let color = [];
    data.value.product_details.forEach((item) => {
      size.push(item.code_size);
      color.push(item.code_color);
    });
    sizes.value = size.filter((v, i, a) => a.indexOf(v) === i);
    colors.value = color.filter((v, i, a) => a.indexOf(v) === i);
    // get unit in stock
    getUnitInStock();
  });
};

reload();

// get unit in stock
const getUnitInStock = () => {
  choice.quantity = 1;
  let correctItem;
  data.value.product_details.forEach((item) => {
    if (
      item.code_color === choice.new_color &&
      item.code_size === choice.new_size
    ) {
      correctItem = item;
    }
  });
  if (correctItem) {
    choice.id_detail = correctItem.id;
    choice.price = correctItem.price_sale ?? correctItem.price;
    unit_in_stock.value = correctItem.unit_in_stock;
  } else unit_in_stock.value = 0;
};
// decrease quantity
const decreaseQuantity = () => {
  if (unit_in_stock.value > 0 && choice.quantity > 1) {
    choice.quantity--;
  }
};
// increase quantity
const increaseQuantity = () => {
  if (unit_in_stock.value > 0 && choice.quantity < unit_in_stock.value) {
    choice.quantity++;
  }
};
// add product to carts
const addProductToCart = () => {
  if (!choice.new_size || !choice.new_color) {
    alert("Chưa chọn đủ thông tin sản phẩm");
    return false;
  }
  if (unit_in_stock.value === 0) {
    alert("Sản phẩm đã hết");
    return false;
  }
  // get carts in localStorage
  let carts = [];
  let count = 0;
  if (localStorage.getItem("carts")) {
    carts = JSON.parse(localStorage.getItem("carts"));
  }
  // update quantity if exists product in carts
  if (carts.length > 0) {
    carts.forEach((item) => {
      if (
        item.id_product == id_product &&
        item.code_color === choice.new_color &&
        item.code_size === choice.new_size
      ) {
        count++;
        if (item.quantity + choice.quantity <= unit_in_stock.value) {
          item.quantity += choice.quantity;
          alert("Thêm sản phẩm vào giỏ hàng thành công");
        } else {
          alert("Sản phẩm trong giỏ hàng đã đạt số lượng tối đa");
          return false;
        }
      }
    });
  }
  //
  if (count === 0) {
    carts.push({
      id_detail: choice.id_detail,
      id_product: id_product,
      code_color: choice.new_color,
      code_size: choice.new_size,
      quantity: choice.quantity,
      unit_price: choice.price,
      thumb: data.value.thumb,
      name: data.value.name,
    });
    alert("Thêm sản phẩm vào giỏ hàng thành công");
  }
  localStorage.setItem("carts", JSON.stringify(carts));
  // change count quantity cart
  emitter.emit("changeQuantity");

  return true;
};
// buy now
const buyNow = () => {
  if (addProductToCart()) {
    router.push({
      path: "/carts",
    });
  }
};
// format money
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
  padding: 15px 0px;
}
/* .block-content */
.block-content {
  margin: 0 10%;
  box-shadow: 0px 4px 8px 0px rgb(207, 200, 200);
}

.block-content-1 {
  display: flex;
  justify-content: center;
}

.block-content-1-left {
  width: 400px;
}

.block-img .in-img img {
  width: max-content;
  height: max-content;
}

.block-khuyenmai {
  margin-top: 10px;
}

.block-khuyenmai .khuyenmai {
  background-color: rgb(248, 28, 138);
  color: white;
  padding: 5px;
}

.block-content-1-right {
  padding: 10px 0px 0px 40px;
}

.block-soluong {
  margin-left: 15%;
}
.price {
  color: #ed1a29;
  font-size: 25px;
}
.giohang {
  color: white;
  background-color: #2e3094;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  border: none;
}

.giohang:hover {
  background-color: #ed1a29;
}

p.thongbao {
  margin-left: 15%;
  font-size: 20px;
  font-weight: bold;
}
.text-1 {
  font-weight: bold;
  font-size: 25px;
}

.text-2 {
  color: #ed1a29;
  font-weight: bold;
  font-size: 25px;
}

.text-2:hover {
  color: #ed1a29;
}

.text-3 {
  font-weight: bold;
  border: 1px dashed #ed1a29;
  width: 450px;
  margin: 10px 15%;
  padding: 10px;
}

.text-3 label {
  font-weight: normal;
}

.text-4 {
  text-align: center;
}

.block-timework {
  padding: 0px 0px 0px 10px;
  color: #2e3094;
  background-color: rgb(233, 233, 14);
}

input.button {
  border: none;
  background-color: red;
  color: white;
  width: 30px;
  height: 30px;
  margin: 0px 10px 0px 10px;
  border-radius: 5px;
  font-size: 20px;
}

.soluong {
  width: 20px;
  border: none;
}

/* .block-table */

.tbl-size {
  justify-content: center;
  border: 1px solid #ed1a29;
  padding: 0px 80px;
  width: 100%;
}

.table-size td {
  padding: 5px;
  border: 1px solid #ed1a29;
}

.table-size th {
  padding: 10px;
  color: white;
  background-color: #ed1a29;
}

.txt-head {
  font-weight: bold;
}

td.txt-end {
  font-style: italic;
}

/* block-commnet */
.enter-comment {
  padding: 15px;
}

.out-texthead {
  border-bottom: 1px solid #2e3094;
}

.out-texthead .text-head {
  font-size: 20px;
  padding: 5px 0px 5px 10px;
  background-color: #2e3094;
  width: 30%;
  color: white;
}

.content-comment textarea {
  padding: 10px;
}

.btn-send {
  border: none;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  color: white;
  background-color: #2e3094;
}

.btn-send:hover {
  background-color: #ed1a29;
  outline: 1px solid #ed1a29;
}

/* .show-commnet */
.comment {
  display: flex;
}

.user-img img {
  width: 80px;
  height: 80px;
}

.line-comment {
  font-weight: bold;
}

.delete-comment {
  margin-top: 10px;
  color: rgb(39, 133, 209);
  background-color: transparent;
}

.delete-comment:hover {
  color: #ed1a29;
}

/*  */
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

/* .block-4 */
.img {
  overflow: hidden;
  position: relative;
  width: auto;
}

.img img {
  width: 100%;
}

.img img:hover {
  -webkit-transform: scale(1);
  transform: scale(1.1);
  transition: 1s;
}

.block-img {
  margin: 15px 15px;
}

.block-img:hover {
  transition: 0.5s;
  box-shadow: 0px 8px 16px 0px rgb(99, 95, 95);
}

.img p,
.btn-out {
  text-align: center;
}

.img .id-pro {
  position: absolute;
  top: -9999px;
  left: -9999px;
}

.img a {
  color: black;
}

.img a:hover {
  color: #ed1a29;
}

.btn-group a.detail {
  color: #ed1a29;
  font-weight: bold;
  background-color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 60px;
  outline: 1px solid #ed1a29;
}

.btn-group a.detail:hover {
  color: #ed1a29;
  outline: 2px solid #ed1a29;
}
.img-size {
  width: 100%;
  height: 100%;
}
.img-detail {
  width: 400px;
  height: 400px;
}
/*  */
.card {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  float: left;
  font-family: "Lato", Arial, sans-serif;
  font-size: 16px;
  margin: 10px 1%;
  max-width: 310px;
  min-width: 250px;
  overflow: hidden;
  position: relative;
  text-align: left;
  width: 100%;
}

.ratings i {
  font-size: 14px;
  margin-right: 2px;
}

.p-description {
  font-size: 12px;
  margin-top: 11px;
}

label.radio {
  cursor: pointer;
}

label.radio input {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}

label.radio span {
  padding: 3px 9px;
  border: 1px solid #8f37aa;
  display: inline-block;
  color: #8f37aa;
  border-radius: 5px;
  font-size: 11px;
  text-transform: uppercase;
}

label.radio input:checked + span {
  border-color: #8f37aa;
  background-color: #8f37aa;
  color: #fff;
}
</style>