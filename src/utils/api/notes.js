import { apiDelete, apiGet, apiPost } from '.';

export const getNotesByInterviewId = (id) => {
    return apiGet('/notes', { params: { id } });
};

export const addNotes = (payload) => {
    return apiPost('/notes', payload);
};

export const deleteNotes = (id) => {
    return apiDelete('/notes', { id: id });
};
