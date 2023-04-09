import { INTERVIEW_RESULT, INTERVIEW_STATUS } from 'config/constant';

const CANDIDATES = [
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

const CANDIDATES_v2 = [
    {
        id: '1',
        name: 'Andrew Tate',
        email: 'tate@topg.com',
        position: 'Software Engineer I',
        result: INTERVIEW_RESULT.SELECTED,
        status: 'SELECTED',
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
        duration: 3,
        startDateTime: new Date(),
        interviews: [
            {
                interviewKitId: 'kit1',
                duration: 2,
                expiredTime: '21.00',
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
            {
                interviewKitId: 'kit2',
                expiredDate: new Date(),
                completedDate: null,
                isActive: false,
                notes: []
            }
        ],
        notes: [
            {
                sender: 'Rafidika Samekto',
                text: 'Sumpah ini TOP G pasti layak jadi karyawan kita dia kan botak',
                dateTime: '2 hours ago'
            }
        ]
    }
];

export const getAllCandidates = async () => {
    return { data: CANDIDATES_v2 };
};

export const getCandidateById = async (id) => {
    return { data: CANDIDATES_v2.filter((candidate) => candidate.id === id)[0] || undefined };
};
