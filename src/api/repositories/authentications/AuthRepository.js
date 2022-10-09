import Repository from "@/api/repositories/Repository";

const baseDomain = "http://localhost:8000";
const baseUrl = `${baseDomain}/api/authentications`;

export default {
  login(account) {
    return Repository.post(`${baseUrl}/login`, {
      email: account.email,
      password: account.password,
    });
  },
  googleLogin(account) {
    console.log(account);
    return Repository.post(`${baseUrl}/socials/google_login`, {
      email: account.email,
      provider_user_id: account.id,
      avatar: account.avatar,
      name: account.name,
    });
  },
  changePassword(account) {
    return Repository.post(`${baseUrl}/change_password`, {
      email: account.email,
      password: account.password,
      new_password: account.new_password,
      re_new_password: account.re_new_password,
    });
  },
};
