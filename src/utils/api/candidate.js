import { INTERVIEW_RESULT, INTERVIEW_STATUS } from 'configs/constant';
import { apiGet, apiGetWithPagination, apiPost } from '.';

const CANDIDATES_v1 = [
    {
        id: '1',
        name: 'Andrew Tate',
        email: 'tate@topg.com',
        position: 'Software Engineer I',
        status: INTERVIEW_STATUS.COMPLETED,
        result: INTERVIEW_RESULT.SELECTED,
        expiredDate: new Date(),
        completedDate: new Date(),
        rating: 0,
        pic: { name: 'Rafidika Samekto', email: 'rafidika@gmail.com' },
        notes: [
            {
                sender: 'Rafidika Samekto',
                text: 'Sumpah ini TOP G pasti layak jadi karyawan kita dia kan botak',
                dateTime: '2 hours ago'
            }
        ]
    }
];

const CANDIDATES = [
    {
        id: 'J5ZObT3dzFU-R9rieLPahxU=',
        name: 'Kandidat 1',
        email: 'rafidika2013@gmail.com',
        position: 'Mobile Enjiner Intern',
        level: 'internship',
        result: 'Belum ada hasil',
        pic: {
            id: 'NPxdtjBH8-3aOiPI7t06BZxJ',
            name: 'Super admin 1',
            email: 'vihagi6249@ippals.com',
            role: 'super admin'
        },
        active_interview: {
            name: 'general hr',
            status: 'Menunggu Review',
            expired_date: '25/04/2023 08:00',
            completed_date: '25/04/2023 08:00'
        }
    }
];

export const getAllCandidates = () => {
    // return apiGetWithPagination('/candidates');
    return { data: CANDIDATES };
};

export const getCandidateById = (id) => {
    // return apiGet('/candidates/detail', { params: { id } });
    return { data: CANDIDATES.filter((candidate) => candidate.id === id)[0] || undefined };
};

export const createCandidate = (payload) => {
    return apiPost('/candidates', payload);
};
