import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const productRepository = RepositoryFactory.get("product");
const clientRepository = RepositoryFactory.get("client");

// initial state
const state = {
  products: [],
  all: [],
  search: {
    like: [],
    not_like: [],
  },
  detail: [],
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
  searchProductByKeyWord({ commit }, key_word) {
    try {
      clientRepository.searchProductByKeyWord(key_word).then((response) => {
        if (response.data.status === 0) {
          commit("setSearch", response.data.data);
        }
        if (response.data.status === 1) {
          commit("setError", response.data.error.message);
        }
      });
    } catch (e) {
      commit("setError", e.message);
    }
  },
  getDetailProduct({ commit }, product_id) {
    try {
      clientRepository.getDetailProduct(product_id).then((response) => {
        if (response.data.status === 0) {
          console.log(response.data.data);
          commit("setDetail", response.data.data);
        }
        if (response.data.status === 1) {
          commit("setError", response.data.error.message);
        }
      });
    } catch (e) {
      commit("setError", e.message);
    }
  },
};

// mutations
const mutations = {
  setAll(state, products) {
    state.all = state.products = products;
  },
  setDetail(state, product) {
    state.deatil = product;
  },
  setSearch(state, products) {
    console.log(products);
    state.search.like = products.like;
    state.search.not_like = products.not_like;
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
