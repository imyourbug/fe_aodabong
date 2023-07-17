// export default router
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/client/Login.vue";
import Home from "@/views/client/Home.vue";
import ProductDetail from "@/views/client/ProductDetail.vue";
import SearchProduct from "@/views/client/SearchProduct.vue";
import Cart from "@/views/client/Cart.vue";
import Register from "@/views/client/Register.vue";
import Checkout from "@/components/checkouts/PaypalCheckout.vue";
import InfoUser from "@/views/client/InfoUser.vue";
import ChangePassword from "@/views/client/ChangePassword.vue";
import GroupProduct from "@/views/client/GroupProduct.vue";
import Main from "@/views/client/Main.vue";
import RecoverPassword from "@/views/client/RecoverPassword.vue";
import AdminHome from "@/views/admin/Home.vue";
import ListCategory from "@/views/admin/categories/ListCategory.vue";
import ListProduct from "@/views/admin/products/ListProduct.vue";
import ImportProduct from "@/views/admin/products/ImportProduct.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
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
        path: "/password/recover",
        name: "recover-password",
        component: RecoverPassword,
      },
      {
        path: "/carts",
        name: "cart",
        component: Cart,
      },
      {
        path: "/user/info",
        name: "info_user",
        component: InfoUser,
      },
      {
        path: "/checkout",
        name: "checkout",
        component: Checkout,
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
        path: "/categories/:chapters+/id=:id_category",
        name: "group_product",
        component: GroupProduct,
      },
    ],
  },
  //
  {
    path: "/admin",
    name: "admin-home",
    component: AdminHome,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "categories/list",
        name: "list-category",
        component: ListCategory,
      },
      {
        path: "products/list",
        name: "list-product",
        component: ListProduct,
      },
      {
        path: "products/import",
        name: "import-product",
        component: ImportProduct,
      },
    ],
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
