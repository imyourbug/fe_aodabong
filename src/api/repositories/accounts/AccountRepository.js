import Repository from '@/api/repositories/Repository';

const baseDomain = 'http://localhost:8000';
const baseUrl = `${baseDomain}/api/accounts`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
    register(account) {
        return Repository.post(`${baseUrl}/create`, {
            name: account.name,
            email: account.email,
            password: account.password,
            role: 0, // user
        });
    },
}
