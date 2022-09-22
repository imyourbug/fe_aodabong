<template>
  <div class="block-content">
    <div class="block-head-2">
      <div class="head-text">
        <router-link to="/home" style="color: #ed1a29">Trang chủ</router-link>
        >> Giỏ hàng
      </div>
    </div>
    <div class="in-content">
      <div class="content-top">
        <div class="out-texthead">
          <div class="text-head">
            <i class="fas fa-shopping-basket"></i>&ensp;THÔNG TIN GIỎ HÀNG CỦA
            BẠN
          </div>
        </div>
        <table
          cellspacing="0"
          class="table-product"
          v-if="carts && carts.length > 0"
        >
          <thead class="tbl-text-head">
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Size</th>
              <th>Màu</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, key) in carts" v-bind:key="key">
              <td class="col-img">
                <img :src="product.thumb" />&emsp; {{ product.name }}
              </td>
              <td class="col-dongia">
                {{ formatCash(product.unit_price) }}<sup>đ</sup>
              </td>
              <td class="col-size">
                {{ product.code_size }}
              </td>
              <td class="col-color">
                {{ getNameByHexColor(product.code_color) }}
              </td>
              <td class="col-soluong">
                <input
                  @click="decreaseQuantity(product.id_detail, product.quantity)"
                  type="button"
                  value="-"
                  class="button"
                />
                {{ product.quantity }}
                <input
                  @click="increaseQuantity(product.id_detail, product.quantity)"
                  type="button"
                  value="+"
                  class="button"
                />
              </td>
              <td class="col-thanhtien">
                {{ formatCash(product.unit_price * product.quantity)
                }}<sup>đ</sup>
              </td>
              <td class="col-thaotac">
                <div class="in-thaotac">
                  <button class="delete-product">
                    <i
                      @click="removeProduct(product.id_detail)"
                      class="fas fa-trash-alt"
                    ></i>
                  </button>
                  &emsp;
                  <router-link
                    :to="`/products/detail/${product.id_product}`"
                    class="info-product"
                  >
                    <i class="fas fa-info-circle"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            <tr style="border: none">
              <td colspan="6">
                <div class="total">
                  Tổng tiền: {{ formatCash(totalMoney()) }}<sup>đ</sup>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row-end-money" v-else>
          <span>Giỏ hàng hiện chưa có sản phẩm nào :(</span>
        </div>
      </div>
      <br />
      <div class="button-home">
        <router-link class="btn-home" to="/home">
          <i class="fas fa-arrow-left"></i> Tiếp tục mua hàng
        </router-link>
      </div>
      <br />
    </div>
    <div class="content-bot" v-if="carts && carts.length > 0">
      <div class="out-texthead">
        <div class="text-head">
          <i class="fas fa-dolly-flatbed"></i>&ensp;THÔNG TIN GIAO HÀNG
        </div>
        <div class="text-head">
          <i class="fas fa-dollar-sign"></i>&ensp;THANH TOÁN
        </div>
      </div>
      <div class="row">
        <div class="information col-7">
          <form @submit.prevent="submitForm">
            <div class="text-hint">
              * Vui lòng nhập đầy đủ thông tin để chúng tôi giao hàng được chính
              xác, cảm ơn!
            </div>
            <div class="input-text">
              <input
                id="ten"
                type="text"
                v-model="customer.name"
                placeholder="Tên đầy đủ của bạn"
              />
              <p>*</p>
              &emsp;
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
            <div class="input-text">
              <input
                id="email"
                type="email"
                v-model="customer.email"
                placeholder="Email của bạn"
              />
              <p>*</p>
              &emsp;
              <div :class="{ error: v$.email.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.email.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            <div class="text-hint">* Địa chỉ nhận hàng</div>
            <div class="input-text">
              <input
                id="sonha"
                type="text"
                v-model="customer.address"
                placeholder="Số nhà, đường, (tòa nhà), phường/xã..."
              />
              <p>*</p>
              &emsp;
              <div :class="{ error: v$.address.$errors.length }">
                <div
                  class="input-errors"
                  v-for="error of v$.address.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            <div class="input-text">
              <input
                id="sdt"
                type="text"
                placeholder="Số điện thoại"
                v-model="customer.phone"
              />
              <p>*</p>
              &emsp;
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
            <div class="text-hint">* Ghi chú</div>
            <textarea
              id="mota"
              rows="2"
              cols="60"
              placeholder="Giao cho tôi vào giờ hành chính"
              v-model="customer.note"
            ></textarea>
            <br />
          </form>
        </div>
        <div class="information col-5">
          <br />
          <table class="table-payment">
            <tr>
              <td><label>Voucher</label></td>
              <td class="col-voucher">
                <Select2
                  v-model="voucher"
                  :options="vouchers"
                  :settings="{ settingOption: value, settingOption: value }"
                  @select="selectVoucher($event)"
                />
                <h4>{{ value }}</h4>
              </td>
            </tr>
            <tr>
              <td>Phí vận chuyển</td>
              <td class="col-infor2">30.000<sup>đ</sup></td>
            </tr>
            <tr>
              <td>Mã giảm giá</td>
              <td class="col-infor2">
                {{
                  voucherSelected.discount
                    ? formatCash(
                        (voucherSelected.discount / 100) * totalMoney()
                      )
                    : 0
                }}<sup>đ</sup>
              </td>
            </tr>
            <tr class="tongtien">
              <td><label>Tổng thanh toán</label></td>
              <td class="col-infor2">
                {{
                  voucherSelected.discount
                    ? formatCash(
                        (1 - voucherSelected.discount / 100) * totalMoney() +
                          30000
                      )
                    : 0
                }}<sup>đ</sup>
              </td>
            </tr>
          </table>
          <br />
          <button type="submit" class="btn-buy" @click="submitForm">
            <i class="fas fa-dollar-sign"></i> Thanh toán
          </button>
        </div>
      </div>
    </div>
    <br />
  </div>
  <div class="form-popup" id="myForm">
    <h3>Xác nhận</h3>
    <table class="table-confirm">
      <tr>
        <td>
          <label><b>Họ tên</b></label>
        </td>
        <td>
          <input
            type="text"
            class="form-control"
            id="ten2"
            name="cus_name"
            readonly
          />
        </td>
      </tr>
      <tr>
        <td>
          <label><b>Email</b></label>
        </td>
        <td>
          <input
            type="email"
            class="form-control"
            id="email2"
            name="email"
            readonly
          />
        </td>
      </tr>
      <tr>
        <td>
          <label><b>Địa chỉ</b></label>
        </td>
        <td>
          <input
            type="text"
            class="form-control"
            id="sonha2"
            name="address"
            readonly
          />
        </td>
      </tr>
      <tr>
        <td>
          <label><b>Số điện thoại</b></label>
        </td>
        <td>
          <input
            type="text"
            class="form-control"
            id="sdt2"
            name="phone_number"
            readonly
          />
        </td>
      </tr>
      <tr>
        <td>
          <label><b>Tổng tiền</b></label>
        </td>
        <td>
          <input
            type="text"
            class="form-control"
            id="total2"
            name="total"
            readonly
          />
        </td>
      </tr>
      <tr>
        <td>
          <label><b>Ghi chú</b></label>
        </td>
        <td>
          <input
            type="text"
            class="form-control"
            id="mota2"
            name="note"
            readonly
          />
        </td>
      </tr>
    </table>
    <button type="submit" class="btn">
      <i class="fas fa-save"></i>&ensp;Xác nhận
    </button>
    <a class="btn" onclick="closeForm()"
      ><i class="fas fa-window-close"></i>&ensp;Đóng</a
    >
    <input type="hidden" id="voucher_id" name="voucher_id" />
  </div>
</template>

<script setup>
import ntc from "ntc-hi-js";
import Select2 from "vue3-select2-component";
import { ref, inject, reactive } from "vue";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  helpers,
  maxLength,
} from "@vuelidate/validators";

// const toasted = inject("Toasted");

const clientRepository = RepositoryFactory.get("client");
const voucherRepository = RepositoryFactory.get("voucher");
const emitter = inject("emitter");

const carts = ref([]);
const data = ref([]);
const vouchers = ref([]);
const voucherSelected = ref([]);
const customer = reactive({
  name: "",
  email: "",
  address: "",
  phone: "",
  note: "",
});

// validate
const alpha = helpers.regex(/^0\d{9}$/);

const rules = {
  name: { required: helpers.withMessage("Không được để trống!", required) },
  email: {
    required: helpers.withMessage("Không được để trống!", required),
    email: helpers.withMessage("Email không hợp lệ!", email),
  },
  address: { required: helpers.withMessage("Không được để trống!", required) },
  phone: {
    required: helpers.withMessage("Không được để trống!", required),
    alpha: helpers.withMessage("Số điện thoại không hợp lệ!", alpha),
  },
};

const v$ = useVuelidate(rules, customer);

const submitForm = () => {
  console.log(v$);
  v$.value.$validate();
  if (v$.value.$invalid) {
    alert("Vui lòng điền đầy đủ thông tin");
  } else alert("Chuyển sang form thanh toán");
};

//
const selectVoucher = (voucher) => {
  voucherSelected.value = voucher;
  console.log(voucherSelected.value);
};

const reload = async () => {
  await clientRepository.getAllDetailProduct().then((response) => {
    data.value = response.data.data;
  });
  //
  await voucherRepository.getAllVouchers().then((response) => {
    let data = [];
    response.data.data.forEach((item) => {
      data.push({
        // text is require to show value in screen
        // id is require to select an option
        id: item.id,
        text: item.name,
        discount: item.discount,
      });
    });
    vouchers.value = data;
  });
  //
  carts.value = JSON.parse(localStorage.getItem("carts"));
};

reload();

// decrease quantity
const decreaseQuantity = (id_detail, quantity) => {
  if (quantity > 1) {
    carts.value.forEach((item) => {
      if (item.id_detail === id_detail) {
        item.quantity -= 1;
      }
    });
  } else {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      removeProduct(id_detail);
      // change count quantity cart
      emitter.emit("changeQuantity");
      return;
    }
  }
  localStorage.setItem("carts", JSON.stringify(carts.value));
  reload();
};

// increase quantity
const increaseQuantity = (id_detail, quantity) => {
  if (quantity < getQuantity(id_detail)) {
    carts.value.forEach((item) => {
      if (item.id_detail === id_detail) {
        item.quantity += 1;
      }
    });
  } else {
    alert("Bạn đã đạt mức tối đa số lượng sản phẩm này");
  }
  localStorage.setItem("carts", JSON.stringify(carts.value));
  reload();
};

// get name color
const getNameByHexColor = (hexCode) => {
  return ntc.name(hexCode, "en").color.name;
};

// get quantity by id_detail
const getQuantity = (id_detail) => {
  let unit_in_stock = 0;
  data.value.forEach((item) => {
    if (item.id === id_detail) {
      unit_in_stock = item.unit_in_stock;
    }
  });

  return unit_in_stock;
};

// total money
const totalMoney = () => {
  let total = 0;
  carts.value.forEach((item) => {
    total += item.quantity * item.unit_price;
  });
  return total;
};

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

// remove product from carts
const removeProduct = (id) => {
  let storageProducts = JSON.parse(localStorage.getItem("carts"));
  let products = storageProducts.filter((product) => product.id_detail !== id);
  localStorage.setItem("carts", JSON.stringify(products));

  reload();
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  outline: none;
}
a {
  text-decoration: none;
}
/* .block-head-2 */
.block-head-2 {
  background-color: rgb(246, 249, 252);
  align-items: center;
  padding: 10px 0px 10px 0px;
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
  padding: 10px;
  box-shadow: 0px 4px 8px 0px rgb(207, 200, 200);
}
/* .conten-top */
.table-product tr th {
  text-align: center;
  padding: 15px 0px 15px 0px;
}
.table-product tr {
  border-bottom: 1px solid rgb(200, 201, 202);
}
.table-product {
  width: 100%;
}
input.money {
  border: none;
  width: 50%;
}
td img {
  width: 80px;
  height: 80px;
  padding: 10px;
}
.col-thaotac {
  width: 320px;
  align-items: center;
  text-align: center;
}
.in-thaotac {
  display: flex;
  justify-content: center;
  align-items: center;
}
.col-img {
  width: 320px;
  padding-left: 30px;
}
.col-thanhtien,
.col-dongia {
  width: 230px;
  text-align: right;
  padding-right: 50px;
}
.col-soluong,
.col-color {
  width: 200px;
  text-align: left;
  padding-left: 40px;
}
.col-voucher {
  width: 80%;
}
td .button,
td button {
  border: none;
  background-color: #ed1a29;
  color: white;
  padding: 0px 12px;
  border-radius: 5px;
  font-size: 20px;
}
.soluong {
  width: 20px;
  border: none;
}

.row-end-money {
  font-weight: bold;
  color: #ed1a29;
  font-size: 20px;
  text-align: center;
  padding: 40px 0px;
}

button.delete-product {
  padding: 0px 8px;
  background-color: #ed1a29;
  color: white;
}
a.info-product {
  color: #2e3094;
  font-size: 30px;
}
/*  */
.total {
  font-weight: bold;
  text-align: right;
  padding: 10px 0px;
  font-size: 20px;
}
.total input {
  border: none;
  color: #ed1a29;
  font-weight: bold;
}
/*  */
.button-home .btn-home,
.btn-update {
  border: none;
  border-radius: 10px;
  padding: 10px 15px 10px 15px;
  color: white;
  background-color: #2e3094;
}
.button-home .btn-home:hover,
.btn-update:hover {
  background-color: #ed1a29;
}
.out-texthead {
  border-bottom: 1px solid #ed1a29;
  display: flex;
  justify-content: space-between;
}
.text-head {
  font-size: 20px;
  padding: 5px 0px 5px 10px;
  background-color: #ed1a29;
  width: 40%;
  color: white;
  text-align: left;
}
/* content-bot */
.information {
  padding-left: 10px;
}
.information .text-hint {
  padding: 25px 0px 15px 0px;
}
.information input {
  padding-left: 10px;
  margin-bottom: 5px;
  width: 300px;
}
.information p {
  color: red;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
.input-text {
  display: flex;
}
.input-text input,
textarea {
  border-radius: 5px;
  border: 1px solid rgb(208, 212, 216);
}
textarea {
  padding-left: 10px;
}
.input-text p {
  padding-left: 15px;
  align-items: center;
}
.btn-buy {
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #2e3094;
  color: white;
}
.btn-buy:hover {
  background-color: red;
}
/* Popup form */
.form-popup {
  display: none;
  position: fixed;
  bottom: 5%;
  right: 30%;
  z-index: 9;
  border-radius: 10px;
  background-color: white;
  border: 3px solid #2e3094;
}

/* Add styles to the form container */
.form-container {
  height: 580px;
  width: 500px;
  padding: 10px;
}

.form-container h3 {
  text-align: center;
}

/* Full-width input fields */
.form-container input[type="text"],
.form-container input[type="number"],
.form-container input[type="email"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* Khi nhấn vào input */
.form-container input[type="text"]:focus,
.form-container
  input[type="number"]:focus
  .form-container
  input[type="email"]:focus {
  background-color: #ddd;
  outline: none;
}

.form-container .btn[type="submit"] {
  background-color: #2e3094;
}

/* Nút lưu, đóng */
.form-container .btn {
  background-color: #ed1a29;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 5px;
  opacity: 0.8;
}
.table-confirm,
.table-payment {
  width: 100%;
}
.col-infor2 {
  text-align: right;
  font-weight: bold;
}
.col-infor2 #discount,
.col-infor2 #total {
  border: none;
  width: 50%;
  text-align: right;
  font-weight: bold;
}
</style>