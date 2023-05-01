import { INTERVIEW_STATUS } from 'configs/constant';
import { apiGet } from '.';

const INTERVIEWS = [
    {
        id: '1',
        candidateId: 'J5ZObT3dzFU-R9rieLPahxU=',
        interviewKit: {
            id: '1',
            title: 'General HR Interview',
            desc: 'Posisi software enginer nih bos senggol dong',
            numOfQuestions: 3,
            duration: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
            questions: [
                { id: '1', question: 'Siapa Tuhanmu?', duration: 5 },
                { id: '2', question: 'Siapa Nabimu?', duration: 5 },
                { id: '3', question: 'Apa Kitabmu?', duration: 5 }
            ]
        },
        answers: [
            {
                id: '1',
                questionId: '1',
                videoUrl: 'https://www.youtube.com/watch?v=xqhN68d-UzA&ab_channel=WillTennyson',
                rating: 0
            },
            {
                id: '2',
                questionId: '2',
                videoUrl: 'https://www.youtube.com/watch?v=-v-MiVpDEGA&ab_channel=Cretivox',
                rating: 0
            },
            {
                id: '3',
                questionId: '3',
                videoUrl: 'https://www.youtube.com/watch?v=t2Xs6KF6LoI&ab_channel=CodeWithYousaf',
                rating: 0
            }
        ],
        isCompleted: true,
        completedAt: new Date(),
        expiredAt: new Date(),
        status: INTERVIEW_STATUS.WAITING_REVIEW,
        notes: [
            {
                id: '1',
                sender: 'Rafidika Samekto',
                text: 'Sumpah ini TOP G pasti layak jadi karyawan kita dia kan botak',
                dateTime: '2 hours ago'
            }
        ]
    }
];

export const getAllInterviews = (candidateId) => {
    return apiGet('/interviews/candidate', {
        params: {
            id: candidateId
        }
    });
    // return { data: INTERVIEWS.filter((interview) => interview.candidateId === candidateId) || undefined };
};

export const getInterviewDetail = (candidateId, id) => {
    return { data: INTERVIEWS.filter((interview) => interview.candidateId === candidateId && interview.id === id)[0] || undefined };
};

export const getAnswerForQuestion = (interviewId, questionId) => {
    return {
        data:
            INTERVIEWS.filter((interview) => interview.id === interviewId)[0].answers.filter(
                (answer) => answer.questionId === questionId
            )[0] || undefined
    };
};
