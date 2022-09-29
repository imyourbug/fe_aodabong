import Repository from '@/api/repositories/Repository';

const baseDomain = 'http://localhost:8000';
const baseUrl = `${baseDomain}/api/clients`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
    getAllProductGroup() {
        return Repository.get(`${baseUrl}/list_product_group`);
    },
    getDetailProduct(id) {
        return Repository.get(`${baseUrl}/product/${id}`);
    },
    getAllDetailProduct() {
        return Repository.get(`${baseUrl}/details/list`);
    },
    searchProductByKeyWord(key_word) {
        return Repository.get(`${baseUrl}/search/${key_word}`);
    },
    createOrder(data) {
        console.log(data);
        return Repository.post(`${baseUrl}/orders/create`, {
            carts: data.carts,
            customer: data.customer,
            status: 0, // default - in progress
            discount: data.discount
        });
    }
}
