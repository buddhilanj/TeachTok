import axios from "axios";

const baseURL = "https://cross-platform.rp.devfactory.com";

const API = axios.create({
  baseURL,
  timeout: 4000,
  headers: { "Content-Type": "application/json" },
});

export default { API };
