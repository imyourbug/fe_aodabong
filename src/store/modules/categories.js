import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";

const categoryRepository = RepositoryFactory.get("category");

// initial state
const state = {
  all: [],
  error: null,
};

// getters
const getters = {};

// actions
const actions = {
  getAll({ commit }) {
    try {
      categoryRepository.getAll().then((response) => {
        commit("setCategories", response.data.categories);
      });
    } catch (e) {
      console.log(e);
    }
  },
};

// mutations
const mutations = {
  setCategories(state, categories) {
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
