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
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    throw Error;
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
