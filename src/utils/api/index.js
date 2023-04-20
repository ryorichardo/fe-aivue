import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../configs';

const getAllowedOrigin = () => {
    return config.apiUrl;
};

const api = axios.create({
    baseURL: config.apiUrl,
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBSVZ1ZSIsImV4cCI6MTY4MjYwMzU0OCwiaWQiOiI1R0pGZVJoc2pPQjR5QjhjNURqMFgzTGEiLCJuYW1lIjoiU3VwZXIgYWRtaW4gMSIsImVtYWlsIjoidmloYWdpNjI0OUBpcHBhbHMuY29tIiwicm9sZSI6InN1cGVyIGFkbWluIn0.OL88c9CqgngfobsG52aPdY0vVUBLLWblVsnqAwm8m9w`
    }
});

export const getAxiosInstance = () => {
    return api;
};

export const apiGet = async (url, data) => {
    try {
        const res = await api.get(url, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
export const apiPost = async (url, data) => {
    try {
        const res = await api.post(url, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const apiPut = async (url, data) => {
    try {
        const res = await api.put(url, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export default api;
