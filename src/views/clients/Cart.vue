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
        <table cellspacing="0" class="table-product">
          <thead class="tbl-text-head">
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-img"><img src="" /></td>
              <td class="col-dongia">
                <input
                  type="text"
                  value=""
                  id="dongia"
                  class="money"
                  readonly="readonly"
                />
              </td>
              <td class="col-soluong">
                <input type="button" onclick="" value="-" class="button" />
                <input
                  class="soluong"
                  type="text"
                  value=""
                  id=""
                  name=""
                  readonly
                />
                <input type="button" onclick="" value="+" class="button" />
              </td>
              <td class="col-thanhtien">
                <input type="text" value="" id="" class="money" readonly />
                <input type="hidden" value="0" id="money" readonly />
              </td>
              <td class="col-thaotac">
                <div class="in-thaotac">
                  <a
                    onclick="return confirm('Bạn có muốn xóa?')"
                    href=""
                    class="info-product"
                  >
                    <i style="color: #ed1a29" class="fas fa-trash-alt"></i> </a
                  >&emsp;
                  <a href="" class="info-product">
                    <i class="fas fa-info-circle"></i>
                  </a>
                </div>
              </td>
            </tr>
            <tr style="border: none">
              <td colspan="4" style="text-align: right; padding: 10px 0px">
                <input
                  class="btn-update"
                  type="submit"
                  value="Cập nhật"
                  formaction="/update-cart"
                />
              </td>
            </tr>
            <tr style="border: none">
              <td colspan="5">
                <div class="total">
                  Tổng tiền:
                  <input
                    type="text"
                    value=""
                    id="tongtien"
                    class="tongtien"
                    readonly="readonly"
                    name="tongtien"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row-end-money">
          <span>Giỏ hàng hiện chưa có sản phẩm nào :(</span>
          <input type="hidden" name="tongtien" />
        </div>
      </div>
      <br />
      <div class="button-home">
        <a class="btn-home" href="/">
          <i class="fas fa-arrow-left"></i> Tiếp tục mua hàng
        </a>
      </div>
      <br />
    </div>
    <div class="content-bot">
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
              placeholder="Tên đầy đủ của bạn"
              required
            />
            <p>*</p>
          </div>
          <div class="input-text">
            <input
              id="email"
              type="email"
              placeholder="Email của bạn"
              required
            />
            <p>*</p>
          </div>
          <div class="text-hint">* Địa chỉ nhận hàng</div>
          <div class="input-text">
            <input
              id="sonha"
              type="text"
              placeholder="Số nhà, đường, (tòa nhà), phường/xã..."
              required
            />
            <p>*</p>
          </div>
          <div class="input-text">
            <input
              id="sdt"
              type="number"
              placeholder="Số điện thoại"
              required
            />
            <p>*</p>
          </div>
          <div class="text-hint">* Ghi chú</div>
          <textarea
            id="mota"
            rows="2"
            cols="60"
            placeholder="Giao cho tôi vào giờ hành chính"
          ></textarea
          ><br />
        </div>
        <div class="information col-5">
          <br />
          <table class="table-payment">
            <tr>
              <td><label>Voucher</label></td>
              <td class="col-voucher">
                <select
                  onchange=""
                  id="select"
                  class="select2"
                  style="width: 100%"
                >
                  <option value="">Không</option>
                  <option value=""></option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Phí vận chuyển</td>
              <td class="col-infor2">30.000đ</td>
            </tr>
            <tr>
              <td>Mã giảm giá</td>
              <td class="col-infor2">
                <input readonly value="0" id="discount" />đ
              </td>
            </tr>
            <tr class="tongtien">
              <td><label>Tổng thanh toán</label></td>
              <td class="col-infor2">
                <input readonly value="0" id="total" />đ
              </td>
            </tr>
          </table>
          <br />
          <button onclick="openForm()" class="btn-buy">
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
import { ref } from "vue";

const carts = ref([]);

const reload = () => {
  carts.value = JSON.parse(localStorage.getItem("carts") ?? []);
  console.log(carts.value);
};

reload();
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
.col-dongia,
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
.col-soluong,
.col-thanhtien {
  width: 230px;
  text-align: center;
}
td .button,
td button {
  border: none;
  background-color: #ed1a29;
  color: white;
  width: 30px;
  height: 30px;
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

a.info-product {
  color: #2e3094;
  font-size: 25px;
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
.out-texthead .text-head {
  font-size: 20px;
  padding: 5px 0px 5px 10px;
  background-color: #ed1a29;
  width: 40%;
  color: white;
}
/* content-bot */
.information {
  padding-left: 10px;
}
.information .text-hint {
  padding: 15px 0px 15px 0px;
}
.information input {
  padding-left: 10px;
  margin-bottom: 5px;
  width: 300px;
}
.information p {
  color: red;
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
</style>>