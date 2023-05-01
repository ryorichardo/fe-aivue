import { apiDelete, apiGet, apiPost, apiPut } from '.';

const INTERVIEW_KITS = [
    {
        id: '1',
        title: 'General HR Interview',
        desc: 'Posisi software enginer nih bos senggol dong',
        numOfQuestions: 3,
        totalDuration: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: [
            { id: '1', question: 'Siapa Tuhanmu?', duration: 5 },
            { id: '2', question: 'Siapa Nabimu?', duration: 5 },
            { id: '3', question: 'Apa Kitabmu?', duration: 5 }
        ]
    },
    {
        id: '2',
        title: 'General SE I Interview',
        desc: 'Posisi software enginer nih bos senggol dong',
        numOfQuestions: 3,
        totalDuration: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: [
            { id: '1', question: 'Siapa Tuhanmu?', duration: 5 },
            { id: '2', question: 'Siapa Nabimu?', duration: 5 },
            { id: '3', question: 'Apa Kitabmu?', duration: 5 }
        ]
    },
    {
        id: '3',
        title: 'Additional Algorithm SE I Interview',
        desc: 'Posisi software enginer nih bos senggol dong',
        numOfQuestions: 3,
        totalDuration: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: [
            { id: '1', question: 'Siapa Tuhanmu?', duration: 5 },
            { id: '2', question: 'Siapa Nabimu?', duration: 5 },
            { id: '3', question: 'Apa Kitabmu?', duration: 5 }
        ]
    }
];

export const getInterviewKits = () => {
    return apiGet('/kits');
};

export const getInterviewKitById = (id) => {
    return apiGet('/kits/detail', { params: { id } });
};

export const createInterviewKit = (payload) => {
    return apiPost('/kits', payload);
};

export const updateInterviewKit = (id, payload) => {
    return apiPut('/kits', { id, ...payload });
};

export const deleteInterviewKit = (id) => {
    return apiDelete('/kits', { id });
};
