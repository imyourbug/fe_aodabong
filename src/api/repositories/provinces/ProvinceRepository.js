import Repository from "@/api/repositories/Repository";

const baseDomain = "https://provinces.open-api.vn";
const baseUrl = `${baseDomain}/api`;

export default {
  getAllProvinces() {
    return Repository.get(`${baseUrl}/p/`);
  },
  getDistrictsByCodeProvince(code_province) {
    return Repository.get(`${baseUrl}/p/${code_province}?depth=2`);
  },
  getWardsByCodeDistrict(code_district) {
    return Repository.get(`${baseUrl}/d/${code_district}?depth=2`);
  },
};
