import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL?.trim();

if (!baseURL) {
    throw new Error("Missing VITE_API_URL environment variable");
}

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // by adding this field, browser will send cookies automatically on every request
})

export default axiosInstance;