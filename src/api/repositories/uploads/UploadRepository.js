import Repository from "@/api/repositories/Repository";

const baseDomain = "http://localhost:8000";
const baseUrl = `${baseDomain}/api/uploads`;

// const access_token = localStorage.getItem('access_token') ?? '';

export default {
  uploadImage(formData) {
    return Repository.post(`${baseUrl}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
