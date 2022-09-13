import Repository from '@/api/repositories/Repository';

const baseDomain = 'http://localhost:8000';
const baseUrl = `${baseDomain}/api/colors`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
    getAllColors() {
        return Repository.get(`${baseUrl}/list`);
    },
}