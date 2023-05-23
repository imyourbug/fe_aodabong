import Repository from "@/api/repositories/Repository";

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/products`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAll() {
    return Repository.get(`${baseUrl}/list`);
  },
  create(product) {
    return Repository.post(`${baseUrl}/create`, {
      name: product.name,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      price: product.price,
      price_sale: product.price_sale,
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
      price: product.price,
      price_sale: product.price_sale,
      active: product.active,
      thumb: product.thumb,
    });
  },
};
