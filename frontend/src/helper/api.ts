import axios from "axios";

export const api = axios.create({
  baseURL: "https://kutuphane-backend-erwj.onrender.com",
});

export function setToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}