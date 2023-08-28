import axios from "axios";

export const backendInstance = axios.create({ baseURL: "http://localhost:3000" });
