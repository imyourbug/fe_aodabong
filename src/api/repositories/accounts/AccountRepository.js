import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/accounts`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  register(account) {
    return getAxios().post(`${baseUrl}/create`, {
      name: account.name,
      email: account.email,
      password: account.password,
      role: 0, // user
    });
  },
};
