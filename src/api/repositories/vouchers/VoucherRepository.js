import Repository from "@/api/repositories/Repository";

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/vouchers`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  getAllVouchers() {
    return Repository.get(`${baseUrl}/list`);
  },
};
