<template>
  <div class="block-content">
    <div class="container">
      <div class="row">
        <div class="block-head-2">
          <div class="head-text">
            <a href="" style="color: #ed1a29">Trang chủ</a> >><a
              style="color: #ed1a29"
              href=""
            >
              Sản phẩm
            </a>
            >>
            {{ data.product.name }}
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
          <form method="POST" action="/add-cart">
            <div class="block-soluong">
              <h3>{{ data.product.name }}</h3>
              <div class="row">
                <div class="col-3"><label>Trong kho:</label>&ensp;</div>
                <div class="col-9">{{ unit_in_stock }}</div>
              </div>
              <br />
              <div class="row">
                <div class="col-3"><label>Kích cỡ</label>&ensp;</div>
                <div class="col-9" v-if="sizes && sizes.length > 0">
                  <label
                    class="radio"
                    v-for="(size, key) in sizes"
                    v-bind:key="key"
                    @click="show"
                  >
                    <input
                      type="radio"
                      name="size"
                      :value="size.size"
                      v-model="new_size"
                    />
                    <span>{{ size.size }}</span
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
                    @click="show"
                  >
                    <input
                      type="radio"
                      name="color"
                      :value="color.code_color"
                      v-model="new_color"
                    />
                    <span>{{ color.name }}</span
                    >&ensp;
                  </label>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-3"><label>Số lượng: </label>&ensp;</div>
                <div class="col-9">
                  <input type="button" onclick="" value="-" class="button" />
                  <input
                    class="soluong"
                    type="text"
                    value="1"
                    id="quantity"
                    readonly
                    name="quantity"
                  />
                  <input type="button" onclick="" value="+" class="button" />
                </div>
              </div>
              <br />
            </div>
            <br />
            <div class="btn-giohang">
              <button class="giohang" type="submit" id="add">
                <i class="fas fa-cart-plus"></i>&ensp;Thêm vào giỏ
              </button>
            </div>
            <input type="hidden" value="" name="product_id" />
          </form>
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
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const clientRepository = RepositoryFactory.get("client");
const colorRepository = RepositoryFactory.get("color");
const sizeRepository = RepositoryFactory.get("size");

const data = ref([]);
const sizes = ref([]);
const colors = ref([]);
const new_size = ref("");
const new_color = ref("");
const unit_in_stock = ref(0);

const reload = async () => {
  // get size
  await sizeRepository.getAllSizes().then((response) => {
    sizes.value = response.data.sizes;
  });
  // get color
  await colorRepository.getAllColors().then((response) => {
    colors.value = response.data.colors;
  });
  // get detail product
  let id = useRouter().currentRoute.value.params.id;
  await clientRepository.getDetailProduct(id).then((response) => {
    data.value = response.data.data;
  });
  // get unit in stock
  getUnitInStock("", "", data.value.details);
};

reload();

const getUnitInStock = (size = "", color = "", details) => {
  details.forEach((item) => {
    console.log(item);
    if (item.code_color === color && item.code_size === size) {
      unit_in_stock.value = item.unit_in_stock;
    } else unit_in_stock.value = 0;
  });
};
//
const show = () => {
  console.log("Color", new_color.value, "size", new_size);
  console.log("Size", new_size);
  getUnitInStock(new_color.value, new_size.value, data.value.details);
};
</script>

<style>
.block-head-2 {
  background-color: rgb(246, 249, 252);
  align-items: center;
  padding: 10px 0px 10px 80px;
}

.block-head-2 a {
  color: black;
}

.block-head-2 a:hover {
  text-decoration: underline;
}

/* .block-content */
.block-content {
  margin: 30px 80px 0px 80px;
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

.btn-giohang .giohang {
  color: white;
  background-color: #2e3094;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  margin-left: 15%;
  border: none;
}

.btn-giohang .giohang:hover {
  background-color: #ed1a29;
}

.btn-giohang p.thongbao {
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