import Repository from "@/api/repositories/Repository";

const baseDomain = "http://localhost:8000";
const baseUrl = `${baseDomain}/api/categories`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAllCategories() {
    return Repository.get(`${baseUrl}/list`);
  },
  getDetailCategory(category_id) {
    console.log(category_id);
    return Repository.get(`${baseUrl}/detail/${category_id}`);
  },
};
