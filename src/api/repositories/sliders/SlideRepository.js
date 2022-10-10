import Repository from "@/api/repositories/Repository";

const baseDomain = "http://localhost:8000";
const baseUrl = `${baseDomain}/api/slides`;

export default {
  getAllSlides() {
    return Repository.get(`${baseUrl}/list`);
  },
};
