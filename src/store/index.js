import { createStore, createLogger } from "vuex";
import products from "@/store/modules/products";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    products,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
