import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";

const categoryRepository = RepositoryFactory.get("category");

// initial state
const state = {
  all: [],
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
};

// mutations
const mutations = {
  setAll(state, categories) {
    state.all = categories;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
