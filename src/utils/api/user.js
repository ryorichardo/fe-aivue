import { apiDelete, apiGetWithPagination } from '.';

export const getAllUsers = () => {
    return apiGetWithPagination('/users');
};

export const deleteUser = (userId) => {
    return apiDelete('/users', { id: userId });
};
