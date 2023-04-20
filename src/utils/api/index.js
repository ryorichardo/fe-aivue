import axios from 'axios';
import config from '../../configs';

const getAllowedOrigin = () => {
    return config.apiUrl;
};

const api = axios.create({
    baseURL: config.apiUrl
    // headers: { Authorization: `Bearer ${token}` }
});

export const apiPost = async (url, data) => {
    try {
        const res = await api.post(url, data);
        if (res.status != 200 && res.statusText != 'OK') {
            new Error(
                JSON.stringify({
                    status: res.status,
                    message: 'Terjadi kesalahan'
                })
            );
        }
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(
                JSON.stringify({
                    status: error.status,
                    message: error.response.data.message
                }),
                { message: error.response.data.message }
            );
        } else {
            throw error;
        }
    }
};

export default api;
