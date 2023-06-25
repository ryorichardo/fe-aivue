import { apiDelete, apiGet, apiPost, apiPut } from '.';

export const getAllPositions = () => {
    return apiGet('/positions');
};

export const getPositionById = (id) => {
    return apiGet('/positions/detail', { params: { id } });
};

export const createPosition = (payload) => {
    return apiPost('/positions', payload);
};

export const updatePositionById = (id, payload) => {
    return apiPut('/positions', { id, ...payload });
};

export const deletePosition = (id) => {
    return apiDelete('/positions', { id });
};
