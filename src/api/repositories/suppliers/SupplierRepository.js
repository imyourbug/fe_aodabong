import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/suppliers`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAll() {
    return getAxios().get(`${baseUrl}/list`);
  },
  getDetail(product_id) {
    return getAxios().get(`${baseUrl}/detail/${product_id}`);
  },
  create(product) {
    return getAxios().post(`${baseUrl}/create`, {
      name: product.name,
      parent_id: product.parent_id,
      description: product.description,
      active: product.active,
    });
  },
  remove(product_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: product_id },
    });
  },
  edit(product) {
    return getAxios().put(`${baseUrl}/update`, {
      id: product.id,
      name: product.name,
      parent_id: product.parent_id,
      description: product.description,
      active: product.active,
    });
  },
};
