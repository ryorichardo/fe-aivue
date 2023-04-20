import { INTERVIEW_RESULT, INTERVIEW_STATUS } from 'configs/constant';

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
        id: '1',
        name: 'Andrew Tate',
        email: 'tate@topg.com',
        position: 'Software Engineer I',
        result: INTERVIEW_RESULT.SELECTED,
        status: INTERVIEW_STATUS.COMPLETED,
        pic: { name: 'Rafidika Samekto', email: 'rafidika@gmail.com' },
        activeInterview: {
            interviewKitId: 'kit1',
            expiredDate: new Date(),
            completedDate: new Date(),
            isActive: true,
            notes: [
                {
                    sender: 'Rafidika Samekto',
                    text: 'Sumpah ini TOP G pasti layak jadi karyawan kita dia kan botak',
                    dateTime: '2 hours ago'
                }
            ]
        },
        expiredDuration: 3,
        startDateTime: new Date(),
        cvUrl: 'CV_URl'
    }
];

export const getAllCandidates = async () => {
    return { data: CANDIDATES };
};

export const getCandidateById = async (id) => {
    return { data: CANDIDATES.filter((candidate) => candidate.id === id)[0] || undefined };
};
