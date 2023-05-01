import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../configs';

const getAllowedOrigin = () => {
    return config.apiUrl;
};

const api = axios.create({
    baseURL: config.apiUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getAxiosInstance = () => {
    return api;
};

export const apiGetWithPagination = async (url, data) => {
    try {
        const res = await api.get(url, data);
        return {
            data: res.data.data,
            pagination_info: res.pagination_info
        };
    } catch (error) {
        throw error;
    }
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

export const apiDelete = async (url, data) => {
    try {
        const res = await api.delete(url, { data: data });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export default api;
