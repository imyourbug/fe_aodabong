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
                <img :src="product.thumb" />&emsp;
                {{ product.name }}
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
                  @click="decreaseQuantity(product.detail_id, product.quantity)"
                  type="button"
                  value="-"
                  class="button"
                />
                {{ product.quantity }}
                <input
                  @click="increaseQuantity(product.detail_id, product.quantity)"
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
                      @click="removeProduct(product.detail_id)"
                      class="fas fa-trash-alt"
                    ></i>
                  </button>
                  &emsp;
                  <router-link
                    :to="`/products/detail/${product.product_id}`"
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
          <CartEmpty />
        </div>
        <div class="button-home" v-if="carts && carts.length > 0">
          <router-link class="btn-home" to="/home">
            <i class="fas fa-arrow-left"></i> Tiếp tục mua hàng
          </router-link>
        </div>
      </div>
      <br />

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
                        parseInt(
                          (voucherSelected.discount / 100) * totalMoney()
                        )
                      )
                    : 0
                }}<sup>đ</sup>
              </td>
            </tr>
            <tr class="tongtien">
              <td><label>Tổng thanh toán</label></td>
              <td class="col-infor2 total-money">
                {{
                  formatCash(
                    voucherSelected.discount
                      ? parseInt(
                          (1 - voucherSelected.discount / 100) * totalMoney() +
                            30000
                        )
                      : parseInt(totalMoney() + 30000)
                  )
                }}<sup>đ</sup>
              </td>
            </tr>
          </table>
          <br />
          <button type="submit" class="btn-buy" @click="order">
            <i class="fas fa-dollar-sign"></i> Đặt hàng
          </button>
        </div>
      </div>
    </div>
  </div>
  <div name="popup" class="form-popup" v-if="showCheckOut" ref="target">
    <div class="title">Xác nhận</div>
    <div class="row">
      <div class="col-4">Họ tên</div>
      <div class="col-8">
        {{ customer.name }}
      </div>
    </div>
    <div class="row">
      <div class="col-4">Email</div>
      <div class="col-8">{{ customer.email }}</div>
    </div>
    <div class="row">
      <div class="col-4">Địa chỉ</div>
      <div class="col-8">{{ customer.address }}</div>
    </div>
    <div class="row">
      <div class="col-4">Số điện thoại</div>
      <div class="col-8">{{ customer.phone }}</div>
    </div>
    <div class="row">
      <div class="col-4">Ghi chú</div>
      <div class="col-8">{{ customer.note ?? "Trống" }}</div>
    </div>
    <div class="row">
      <div class="col-4">Tổng tiền</div>
      <div class="col-8">
        {{
          formatCash(
            voucherSelected.discount
              ? parseInt(
                  (1 - voucherSelected.discount / 100) * totalMoney() + 30000
                )
              : parseInt(totalMoney() + 30000)
          )
        }}<sup>đ</sup>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-9">
        <PaypalCheckout
          class="btn-paypal"
          :total_money="
            voucherSelected.discount
              ? parseInt(
                  (1 - voucherSelected.discount / 100) * totalMoney() + 30000
                )
              : parseInt(totalMoney() + 30000)
          "
        ></PaypalCheckout>
      </div>
      <div class="col-3">
        <button class="btn-exit" @click="close">
          <i class="fa-sharp fa-solid fa-circle-xmark"></i>&ensp;Thoát
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ntc from "ntc-hi-js";
import { ref, inject, reactive } from "vue";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, integer } from "@vuelidate/validators";
import { onClickOutside } from "@vueuse/core";
import PaypalCheckout from "@/components/checkouts/PaypalCheckout.vue";
import CartEmpty from "@/components/carts/CartEmpty.vue";

const clientRepository = RepositoryFactory.get("client");
const voucherRepository = RepositoryFactory.get("voucher");
const emitter = inject("emitter");

const domain = process.env.VUE_APP_DOMAIN_URL ?? "";
const target = ref(null);
const showCheckOut = ref(false);
const carts = ref([]);
const data = ref([]);
const vouchers = ref([]);
const voucherSelected = ref([]);
const user = JSON.parse(localStorage.getItem("user"));
const customer = reactive({
  name: user?.name ?? "",
  email: user?.email ?? "",
  address:
    `${user?.street ?? ""} - ${user?.ward ?? ""} - ${user?.district ?? ""} - ${
      user?.province ?? ""
    }` ?? "",
  phone: user?.phone ?? "",
  note: "",
});

onClickOutside(target, (event) => (showCheckOut.value = false));

emitter.on("checkoutSuccess", (total_money) => {
  // insert data to database
  let data = {
    customer: customer,
    carts: carts.value,
    discount: voucherSelected.value.discount ?? 0,
    total_money: total_money,
  };
  clientRepository.createOrder(data).then((response) => {
    if (response.data.status === 0) {
      // reset carts
      localStorage.removeItem("carts");
      localStorage.removeItem("customer");
      showCheckOut.value = false;
      emitter.emit("reloadHeader");
      reload();
      alert("Thanh toán thành công");
    }
    if (response.data.status === 1) {
      console.log(response.data.error.message);
    }
    if (response.data.status !== 1 && response.data.status !== 0) {
      console.log(response);
    }
  });
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
// order
const order = () => {
  v$.value.$validate();
  if (v$.value.$invalid) {
    alert("Vui lòng điền đầy đủ thông tin");
  } else {
    localStorage.setItem("customer", JSON.stringify(customer));
    showCheckOut.value = true;
  }
};

const close = () => {
  showCheckOut.value = false;
};
const selectVoucher = (voucher) => {
  voucherSelected.value = voucher;
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
const decreaseQuantity = (detail_id, quantity) => {
  if (quantity > 1) {
    carts.value.forEach((item) => {
      if (item.detail_id === detail_id) {
        item.quantity -= 1;
      }
    });
  } else {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      removeProduct(detail_id);
      // change count quantity cart
      emitter.emit("reloadHeader");
      return;
    }
  }
  localStorage.setItem("carts", JSON.stringify(carts.value));
  reload();
};

// increase quantity
const increaseQuantity = (detail_id, quantity) => {
  if (quantity < getQuantity(detail_id)) {
    carts.value.forEach((item) => {
      if (item.detail_id === detail_id) {
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

// get quantity by detail_id
const getQuantity = (detail_id) => {
  let unit_in_stock = 0;
  data.value.forEach((item) => {
    if (item.id === detail_id) {
      unit_in_stock = item.unit_in_stock;
    }
  });

  return unit_in_stock;
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
  let products = storageProducts.filter((product) => product.detail_id !== id);
  localStorage.setItem("carts", JSON.stringify(products));

  reload();
};

// check out
const checkOut = () => {
  clientRepository.getUrlCheckOut().then((response) => {
    console.log(response.data);
  });
};

// total money
const totalMoney = () => {
  let total = 0;
  if (carts.value) {
    carts.value.forEach((item) => {
      total += item.quantity * item.unit_price;
    });
  }
  return total;
};
</script>

<style scoped>
.btn-paypal {
  float: right;
}
/* Popup form */
.form-popup {
  padding: 20px;
  /* display: block; */
  position: fixed;
  bottom: 250px;
  right: 550px;
  z-index: 9;
  border-radius: 10px;
  background-color: white;
  width: 500px;
  border: 3px solid #2e3094;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
}

.row button {
  border: none;
  border-radius: 5px;
}
.btn-exit {
  text-align: right;
  background-color: #ed1a29;
  color: white;
  padding: 10px 15px;
}
.btn-checkout {
  background-color: #2e3094;
  color: white;
  border: none;
  text-align: left;
  padding: 10px 15px;
}
.title {
  text-align: center;
  font-size: 24px;
  padding-bottom: 10px;
  font-weight: bold;
  border-bottom: 1px solid rgb(241, 215, 231);
}
.table-payment {
  width: 100%;
}
.col-infor2 {
  text-align: right;
}
.total-money {
  font-weight: bold;
  color: #ed1a29;
}
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
  width: 70%;
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
.button-home .btn-home {
  background-color: #2e3094;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
}
.button-home .btn-home:hover {
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
  width: 80%;
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
</style>
