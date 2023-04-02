import axios from 'axios';
import config from '../../config';
/**
 * get cors allowed origin
 */
const getAllowedOrigin = () => {
    return config.apiUrl;
};

/**
 * Custom Axios with default configuration
 */
const api = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': getAllowedOrigin()
    }
});

export default api;
