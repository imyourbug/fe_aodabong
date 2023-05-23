import Repository from "@/api/repositories/Repository";

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/detail_products`;

export default {
  getAll() {
    return Repository.get(`${baseDomain}/api/clients/details/list`);
  },
  // getDetailByProductId(product_id) {
  //   return Repository.get(`${baseUrl}/detail/${product_id}`);
  // },
  create(product_detail) {
    return Repository.post(`${baseUrl}/create`, {
      product_id: product_detail.product_id,
      code_color: product_detail.color,
      code_size: product_detail.size,
      unit_in_stock: product_detail.quantity,
      thumb: product_detail.thumb,
    });
  },
  remove(detail_id) {
    return Repository.delete(`${baseUrl}/delete`, {
      data: { id: detail_id },
    });
  },
  removeAll(ids) {
    return Repository.delete(`${baseUrl}/delete_all`, {
      data: { ids: ids },
    });
  },
  edit(product_detail) {
    return Repository.put(`${baseUrl}/update`, {
      product_id: product_detail.product_id,
      code_color: product_detail.color,
      code_size: product_detail.size,
      unit_in_stock: product_detail.quantity,
      thumb: product_detail.thumb,
    });
  },
};
