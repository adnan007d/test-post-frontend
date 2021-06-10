import axios from "axios";

const API = axios.create({
  baseURL: "https://test-post-backend.herokuapp.com/api",
});

export default API;
