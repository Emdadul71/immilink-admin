import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const localStorageToken = JSON.parse(localStorage.getItem("auth")!);
    const token = localStorageToken?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

API.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    }
    return Promise.reject(response.data);
  },
  (error) => {
    const expErr =
      error?.response &&
      error?.response?.status >= 400 &&
      error?.response?.status < 500;
    // if (error?.response?.status == 401) {
    //   EncryptionStorage.removeItem("AUTH");
    // }

    if (!expErr) {
      console.log("Unexpected error : ", error.response);
    }
    if (error.response) {
      return error?.response?.data;
    }

    return Promise.reject(error);
  }
);

export default API;
