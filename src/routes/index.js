// export default router
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/clients/Login.vue";
import About from "@/views/clients/About.vue";
import Home from "@/views/clients/Home.vue";
import ProductDetail from "@/views/clients/ProductDetail.vue";
import SearchProduct from "@/views/clients/SearchProduct.vue";
import Cart from "@/views/clients/Cart.vue";
import Register from "@/views/clients/Register.vue";
import Checkout from "@/components/checkouts/PaypalCheckout.vue";
import InfoUser from "@/views/clients/InfoUser.vue";
import ChangePassword from "@/views/clients/ChangePassword.vue";
import GroupProduct from "@/views/clients/GroupProduct.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    // meta: {
    //     requiresAuth: true
    // },
  },
  {
    path: "/products/search/q=:key_word",
    name: "search_product",
    component: SearchProduct,
  },
  {
    path: "/products/detail/:id",
    name: "product_detail",
    component: ProductDetail,
  },
  {
    path: "/carts",
    name: "cart",
    component: Cart,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/change_password",
    name: "change_password",
    component: ChangePassword,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/user/info",
    name: "info_user",
    component: InfoUser,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

// Middleware
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("user")) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
