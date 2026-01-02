import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/", // Backend adresimiz
});

export function setToken(token: string) {
  // Giriş yapınca token'ı otomatik ekle
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}