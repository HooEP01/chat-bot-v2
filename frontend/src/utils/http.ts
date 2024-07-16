import axios from "axios";
import { store } from "../store";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
    // TODO: consider store in localStorage
    const token = store.getState()?.auth?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response?.status === 401) {
        window.dispatchEvent(new CustomEvent("unauthorized"));
    }

    return Promise.reject(error);
});

export default apiClient;