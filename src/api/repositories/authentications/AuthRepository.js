import Repository from '@/api/repositories/Repository';

const baseDomain = 'http://localhost:8000';
const baseUrl = `${baseDomain}/api/authentications`;

export default {
    login(account) {
        return Repository.post(`${baseUrl}/login`, {
            email: account.email,
            password: account.password
        });
    }
}
