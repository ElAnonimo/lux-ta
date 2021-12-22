import axios from "axios";

const BASE_URL = "https://gorest.co.in/public/v1";
const API_KEY = process.env.REACT_APP_API_KEY;

const config = {
  baseURL: BASE_URL
};

const api = axios.create(config);

api.interceptors.request.use(config => {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.authorization = `Bearer ${API_KEY}` || "";
  return config;
});

export default api;
