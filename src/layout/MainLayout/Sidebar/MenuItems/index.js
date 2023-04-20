// assets
import { IconLayoutDashboard, IconUsers, IconBooks, IconBriefcase, IconUserPlus } from '@tabler/icons';

// constant
const icons = { IconLayoutDashboard, IconUsers, IconBooks, IconBriefcase, IconUserPlus };

export const dashboard = {
    id: 'Dashboard',
    type: 'group',
    desc: 'Lakukan evaluasi hasil interview kandidat',
    children: [
        {
            id: 'Dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconLayoutDashboard,
            breadcrumbs: false
        }
    ]
};

export const kandidat = {
    id: 'Kandidat',
    type: 'group',
    desc: 'Lakukan evaluasi hasil interview  kandidat',
    children: [
        {
            id: 'Kandidat',
            title: 'Kandidat',
            type: 'item',
            url: '/candidate',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export const interviewKit = {
    id: 'Interview Kit',
    type: 'group',
    desc: 'Kelola pertanyaan interview untuk posisi tertentu',
    children: [
        {
            id: 'Interview Kit',
            title: 'Interview Kit',
            type: 'item',
            url: '/interview-kit',
            icon: icons.IconBooks,
            breadcrumbs: false
        }
    ]
};

export const position = {
    id: 'Posisi',
    type: 'group',
    desc: 'Kelola posisi pekerjaan untuk perusahaanmu',
    children: [
        {
            id: 'Posisi',
            title: 'Posisi',
            type: 'item',
            url: '/position',
            icon: icons.IconBriefcase,
            breadcrumbs: false
        }
    ]
};

export const users = {
    id: 'Pengguna',
    type: 'group',
    desc: 'Kelola pengguna AIVue di perusahaanmu',
    children: [
        {
            id: 'Pengguna',
            title: 'Pengguna',
            type: 'item',
            url: '/user',
            icon: icons.IconUserPlus,
            breadcrumbs: false
        }
    ]
};

export const menuItems = {
    items: [dashboard, kandidat, position, interviewKit]
};

export const menuItemsAdmin = {
    items: [dashboard, kandidat, position, interviewKit, users]
};
