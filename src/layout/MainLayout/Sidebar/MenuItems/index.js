// assets
import { IconLayoutDashboard, IconUsers, IconBooks, IconBriefcase } from '@tabler/icons';

// constant
const icons = { IconLayoutDashboard, IconUsers, IconBooks, IconBriefcase };

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

const menuItems = {
    items: [dashboard, kandidat, position, interviewKit]
};

export default menuItems;
