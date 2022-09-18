import Repository from '@/api/repositories/Repository';

const baseDomain = 'http://localhost:8000';
const baseUrl = `${baseDomain}/api/vouchers`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
    getAllVouchers() {
        return Repository.get(`${baseUrl}/list`);
    },
}
