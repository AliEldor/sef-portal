import axios from "axios";

// create axios instance
const randomUserAPI = axios.create({
  baseURL: "https://randomuser.me/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const mainAPI = axios.create({
  baseURL: "http://localhost:4000/api", //
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//  add auth token to requests
mainAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

mainAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
     
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


