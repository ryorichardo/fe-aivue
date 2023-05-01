import { apiDelete, apiPost } from '.';

export const addNotes = (payload) => {
    return apiPost('/notes', payload);
};

export const deleteNotes = (id) => {
    return apiDelete('/notes', { id });
};
