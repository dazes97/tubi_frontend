import axios from "axios";
const baseURL = "http://localhost:3333/";

axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(
  function (config) {
    let loginInfo = localStorage.getItem("token");
    if (!loginInfo) {
      return config;
    }
    let { token } = JSON.parse(loginInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    console.log("entro al error");
    // Do something with request error
    return Promise.reject(error);
  }
);

export default class API {
  public static async GET(url: string) {
    return await axios.get(url);
  }
  public static async POST(url: string, data: any) {
    return await axios.post(url, data);
  }
  public static async DELETE(url: string, id: string) {
    return await axios.delete(url.concat(id));
  }
  public static async UPDATE(url: string, id: string, data: any) {
    return await axios.put(url.concat(id), data);
  }
}
