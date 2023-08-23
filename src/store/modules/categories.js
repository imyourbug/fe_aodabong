import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const categoryRepository = RepositoryFactory.get("category");

// initial state
const state = {
  all: [],
  detail: [],
};

// getters
const getters = {};

// actions
const actions = {
  getAll({ commit }) {
    try {
      categoryRepository.getAllCategories().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.categories);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  getDetailCategory({ commit }, category_id) {
    try {
      categoryRepository.getDetailCategory(category_id).then((response) => {
        if (response.data.status === 0) {
          commit("setDetail", response.data.category);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};

// mutations
const mutations = {
  setAll(state, categories) {
    state.all = categories;
  },
  setDetail(state, category) {
    state.detail = category;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
