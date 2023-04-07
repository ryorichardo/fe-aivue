const { ROLE } = require('config/constant');

const USERS = [
    {
        id: '1',
        name: 'Rafidika Samekto',
        username: 'rafdikcz',
        email: 'rafidika.samekto@aivue.com',
        role: ROLE.ADMIN,
        isVerified: true
    },
    {
        id: '2',
        name: 'Rafidika Samekto',
        username: 'rafdikcz',
        email: 'rafidika.samekto@aivue.com',
        role: ROLE.ADMIN,
        isVerified: false
    }
];

export const getAllUsers = () => {
    return { data: USERS };
};

export const getAllUsersById = () => {
    return { data: USERS.filter((user) => user.id === id)[0] || undefined };
};
