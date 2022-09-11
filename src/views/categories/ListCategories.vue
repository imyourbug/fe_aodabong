<template>
  <main>
    <div class="album bg-light">
      <div class="container">
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
          v-if="categories && categories.length > 0"
        >
          <div
            class="col"
            v-for="(category, key) in categories"
            v-bind:key="key"
          >
            <div class="card shadow-sm">
              <img src="" />
              <div class="card-body">
                <p class="card-text">{{ category.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer class="text-muted py-5">
    <div class="container"></div>
  </footer>
</template>

<script>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";

const CategoryRepository = RepositoryFactory.get("category");

export default {
  name: "ListCategories",
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    CategoryRepository.getAllCategories()
      .then((response) => {
        this.categories = response.data.categories;
        console.log(this.categories);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {},
};
</script>

<style>
.card-body,
.text-card {
  text-align: left;
}
.card-text {
  font-weight: bold;
}
</style>