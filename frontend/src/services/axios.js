import axios from "axios";

// create axios instance
const randomUserAPI = axios.create({
  baseURL: "https://randomuser.me/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

