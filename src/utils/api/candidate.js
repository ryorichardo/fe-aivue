import { apiGet, apiGetWithPagination, apiPostFormData, apiDelete } from '.';

export const getAllCandidates = () => {
    return apiGetWithPagination('/candidates');
};

export const getCandidateById = (id) => {
    return apiGet('/candidates/detail', { params: { id } });
};

export const createCandidate = (payload) => {
    return apiPostFormData('/candidates', payload);
};

export const deleteCandidate = (id) => {
    return apiDelete('/candidates', { id });
};

export const submitResult = async (payload) => {
    return apiPost('/candidates', payload);
};
