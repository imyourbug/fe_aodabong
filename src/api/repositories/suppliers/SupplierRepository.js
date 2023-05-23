import Repository from "@/api/repositories/Repository";

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/suppliers`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAll() {
    return Repository.get(`${baseUrl}/list`);
  },
  getDetail(product_id) {
    return Repository.get(`${baseUrl}/detail/${product_id}`);
  },
  create(product) {
    return Repository.post(`${baseUrl}/create`, {
      name: product.name,
      parent_id: product.parent_id,
      description: product.description,
      active: product.active,
    });
  },
  remove(product_id) {
    return Repository.delete(`${baseUrl}/delete`, {
      data: { id: product_id },
    });
  },
  edit(product) {
    return Repository.put(`${baseUrl}/update`, {
      id: product.id,
      name: product.name,
      parent_id: product.parent_id,
      description: product.description,
      active: product.active,
    });
  },
};
