import Repository from '@/api/repositories/Repository';

const baseDomain = 'http://localhost:8000';
const baseUrl = `${baseDomain}/api/users`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
    getAllProductGroup() {
        return Repository.get(`${baseUrl}/list_product_group`);
    },
    getDetailProduct(id) {
        return Repository.get(`${baseUrl}/product/${id}`);
    },
}