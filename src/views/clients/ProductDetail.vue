<template>
  <div class="block-content pb-2">
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
            <img class="img-detail" :src="`${domain}${data.thumb}`" />
            <div class="row">
              <div class="col-12" style="font-size: 24px; font-weight: bold">
                Đánh giá sản phẩm
              </div>
              <div class="col-12"><Rating /></div>
            </div>
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
                      @click="setSize(size)"
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
                      @click="setColor(color)"
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
              <td>65 - 76 kg</td>
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
      <br />
      <div class="out-texthead">
        <div class="text-head">
          <i class="far fa-comment-dots"></i>&ensp;ĐÁNH GIÁ SẢN PHẨM
        </div>
      </div>
      <div class="block-comment mt-2 col-6">
        <div class="head-comment">
          <div class="txt-cmt">
            Viết bình luận ..... <i class="fas fa-pencil-alt"></i>
          </div>
        </div>
        <div class="content-comment mt-2">
          <img class="avatar" :src="`${domain}${user.avatar}`" />&emsp;
          <input
            class="form-control"
            placeholder="Nhập bình luận của bạn tại đây"
            v-model="comment.content"
            @keyup.enter="addComment"
          />
          <br />
        </div>
        <div style="text-align: right">
          <button @click="addComment" class="btn-send my-2">Gửi</button>
        </div>
      </div>
      <div v-if="comments && comments.length > 0">
        <Comment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :showRepComment="showRepComment"
          :showEditComment="showEditComment"
          :domain="domain"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// import dateFormat, { masks } from "dateformat";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import { reactive, ref, inject } from "vue";
import { useRouter } from "vue-router";
import ntc from "ntc-hi-js";
import Rating from "@/components/rates/Rating.vue";
import Comment from "@/components/comments/Comment.vue";

const clientRepository = RepositoryFactory.get("client");
const commentRepository = RepositoryFactory.get("comment");
const router = useRouter();
const emitter = inject("emitter");

const domain = process.env.VUE_APP_DOMAIN_URL;
const product_id = parseInt(router.currentRoute.value.params.id);
const showRepComment = ref(-1);
const showEditComment = ref([]);
const data = ref([]);
const sizes = ref([]);
const colors = ref([]);
const comments = ref([]);
const unit_in_stock = ref(0);
const choice = reactive({
  detail_id: -1,
  new_size: "",
  new_color: "",
  price: 0,
  quantity: unit_in_stock.value === 0 ? 0 : 1,
});
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      avatar: `${domain}/storage/uploads/default.jpg`,
    };
const comment = reactive({
  user_id: user.id ?? "",
  product_id: product_id,
  content: "",
  reply_id: 0,
});

// show edit comment
emitter.on("showEdit", (comment_id) => {
  if (!showEditComment.value.includes(comment_id)) {
    showEditComment.value.push(comment_id);
  }
});

// show reply comment
emitter.on("showReply", (comment_id) => {
  showRepComment.value = comment_id;
});

// edit comment
emitter.on("editComment", (comment) => {
  commentRepository
    .updateContentComment(comment.id, comment.content)
    .then((response) => {
      if (response.data.status === 0) {
        reload();
      }
      if (response.data.status === 1) {
        alert(response.data.error.message);
      }
      if (response.data.status !== 0 && response.data.status !== 1) {
        alert(response.data);
      }
    });
});

// rep comment
emitter.on("repComment", (comment) => {
  commentRepository.createComment(comment).then((response) => {
    if (response.data.status === 0) {
      reload();
    }
    if (response.data.status === 1) {
      alert(response.data.error.message);
    }
    if (response.data.status !== 0 && response.data.status !== 1) {
      alert(response.data);
    }
  });
});

// delete comment
emitter.on("deleteComment", (comment_id) => {
  if (confirm("Bạn có muốn xóa bình luận này không?")) {
    commentRepository.deleteComment(comment_id).then((response) => {
      if (response.data.status === 0) {
        reload();
      }
      if (response.data.status === 1) {
        alert(response.data.error.message);
      }
      if (response.data.status !== 0 && response.data.status !== 1) {
        alert(response.data);
      }
    });
  }
});

// parse flat structure to tree structure
const traverse = (arr, parentId) =>
  arr
    .filter((comment) => comment.reply_id === parentId)
    .reduce(
      (result, current) => [
        ...result,
        {
          ...current,
          children: traverse(arr, current.id),
        },
      ],
      []
    );

const parseTree = (arr) =>
  arr
    .sort(({ order }) => order)
    .filter(({ reply_id }) => !reply_id)
    .map((comment) => ({
      ...comment,
      children: traverse(arr, comment.id),
    }));

// addComment
const addComment = () => {
  if (comment.content.trim()) {
    commentRepository.createComment(comment).then((response) => {
      console.log(response.data);
      if (response.data.status === 0) {
        reload();
      }
      if (response.data.status === 1) {
        alert(response.data.error.message);
      }
      if (response.data.status !== 0 && response.data.status !== 1) {
        alert(response.data);
      }
    });
  }
};

// get name color
const getNameByHexColor = (hexCode) => {
  return ntc.name(hexCode, "en").color.name;
};

const reload = () => {
  // get detail product
  clientRepository.getDetailProduct(product_id).then((response) => {
    data.value = response.data.data.product;
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
    // get comments
    comments.value = parseTree(data.value.comments ?? []);
    comment.content = "";
    //
    showEditComment.value = [];
    showRepComment.value = -1;
  });
};

reload();

// set size
const setSize = (size) => {
  choice.new_size = size;
  getUnitInStock();
};

// set color
const setColor = (color) => {
  choice.new_color = color;
  getUnitInStock();
};

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
    choice.detail_id = correctItem.id;
    choice.price = correctItem.price_sale ?? correctItem.price;
    unit_in_stock.value = correctItem.unit_in_stock;
  } else {
    unit_in_stock.value = 0;
    choice.price = 0;
  }
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
        item.product_id == product_id &&
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
      detail_id: choice.detail_id,
      product_id: product_id,
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
  emitter.emit("reloadHeader");

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

.block-khuyenmai {
  margin-top: 10px;
}

.block-khuyenmai .khuyenmai {
  background-color: rgb(248, 28, 138);
  color: white;
  padding: 5px;
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

.text-1 {
  font-weight: bold;
  font-size: 25px;
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

.content-comment {
  display: flex;
  justify-content: center;
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
.img-size {
  width: 100%;
  height: 100%;
}
.img-detail {
  width: 400px;
  height: 400px;
}
/*  */

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
/* block-comment */

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
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
</style>
