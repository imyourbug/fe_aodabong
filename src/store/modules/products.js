import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";

const productRepository = RepositoryFactory.get("product");

// initial state
const state = {
  products: [],
  all: [],
  error: "",
};

// getters
const getters = {};

// actions
const actions = {
  getAll({ commit }) {
    try {
      productRepository.getAll().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.products);
        }
        if (response.data.status === 1) {
          commit("setError", response.data.error.message);
        }
      });
    } catch (e) {
      commit("setError", e.message);
    }
  },
  getByCategoryId({ commit }, category_id) {
    if (parseInt(category_id) !== 0) {
      let products = [];
      let id = parseInt(category_id);
      state.all.forEach((item) => {
        if (item.category_id === id) products.push(item);
      });
      commit("setFilterProduct", products);
    } else {
      commit("setAll", state.all);
    }
  },
  getByProductId({ commit }, product_id) {
    if (parseInt(product_id) !== 0) {
      let products = [];
      let id = parseInt(product_id);
      state.all.forEach((item) => {
        if (item.id === id) {
          products.push(item);
        }
      });
      commit("setFilterProduct", products);
    } else {
      commit("setAll", state.all);
    }
  },
};

// mutations
const mutations = {
  setAll(state, products) {
    state.all = state.products = products;
  },
  setFilterProduct(state, products) {
    state.products = products;
  },
  setError(state, error) {
    state.error = error;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
