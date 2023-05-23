import Repository from "@/api/repositories/Repository";

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/categories`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAllCategories() {
    return Repository.get(`${baseUrl}/list`);
  },
  getDetailCategory(category_id) {
    return Repository.get(`${baseUrl}/detail/${category_id}`);
  },
  create(category) {
    return Repository.post(`${baseUrl}/create`, {
      name: category.name,
      parent_id: category.parent_id,
      description: category.description,
      active: category.active,
    });
  },
  remove(category_id) {
    return Repository.delete(`${baseUrl}/delete`, {
      data: { id: category_id },
    });
  },
  edit(category) {
    return Repository.put(`${baseUrl}/update`, {
      id: category.id,
      name: category.name,
      parent_id: category.parent_id,
      description: category.description,
      active: category.active,
    });
  },
};
