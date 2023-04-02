// assets
import { IconLayoutDashboard, IconUsers, IconBooks } from '@tabler/icons';

// constant
const icons = { IconLayoutDashboard, IconUsers, IconBooks };

export const dashboard = {
    id: 'Dashboard',
    type: 'group',
    desc: 'Lakukan evaluasi hasil interview kandidat',
    children: [
        {
            id: 'Dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
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
            url: '/dashboard/default',
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

const menuItems = {
    items: [dashboard, kandidat, interviewKit]
};

export default menuItems;
