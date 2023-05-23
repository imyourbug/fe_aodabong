import { createStore, createLogger } from "vuex";
import products from "@/store/modules/products";
import detail_products from "@/store/modules/detail_products";
import categories from "@/store/modules/categories";
import suppliers from "@/store/modules/suppliers";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    products,
    categories,
    suppliers,
    detail_products,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
