import Repository from "@/api/repositories/Repository";

const baseDomain = "http://localhost:8000";
const baseUrl = `${baseDomain}/api/products`;

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
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      active: product.active,
      thumb: product.thumb,
    });
  },
  remove(product_id) {
    return Repository.delete(`${baseUrl}/delete`, {
      data: { id: product_id },
    });
  },
  removeAll(ids) {
    return Repository.delete(`${baseUrl}/delete_all`, {
      data: { ids: ids },
    });
  },
  edit(product) {
    return Repository.put(`${baseUrl}/update`, {
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      active: product.active,
      thumb: product.thumb,
    });
  },
};
