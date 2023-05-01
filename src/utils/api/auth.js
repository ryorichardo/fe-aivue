import { apiPost } from '.';

export const register = (payload) => {
    return apiPost('/register', payload);
};

export const login = (payload) => {
    return apiPost('/login', payload);
};

export const logout = () => {
    return apiPost('/logout');
};
