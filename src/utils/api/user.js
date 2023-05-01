import { USER_ROLE } from 'configs/constant';
import { apiGetWithPagination } from '.';

const USERS = [
    {
        id: '1',
        name: 'Rafidika Samekto',
        username: 'rafdikcz',
        email: 'rafidika.samekto@aivue.com',
        role: USER_ROLE.ADMIN,
        isVerified: true
    },
    {
        id: '2',
        name: 'Rafidika Samekto',
        username: 'rafdikcz',
        email: 'rafidika.samekto@aivue.com',
        role: USER_ROLE.ADMIN,
        isVerified: false
    }
];

export const getAllUsers = () => {
    return apiGetWithPagination('/users');
};

export const getAllUsersById = () => {
    return { data: USERS.filter((user) => user.id === id)[0] || undefined };
};
