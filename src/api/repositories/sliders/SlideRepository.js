import Repository from "@/api/repositories/Repository";

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/slides`;

export default {
  getAllSlides() {
    return Repository.get(`${baseUrl}/list`);
  },
};
