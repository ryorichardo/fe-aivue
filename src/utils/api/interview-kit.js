const INTERVIEW_KITS = [
    {
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
    {
        id: '2',
        title: 'General SE I Interview',
        level: 'Entry Level',
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
    {
        id: '3',
        title: 'Additional Algorithm SE I Interview',
        level: 'Entry Level',
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
    }
];

export const getInterviewKits = () => {
    return {
        data: INTERVIEW_KITS
    };
};

export const getInterviewKitById = (id) => {
    return {
        data: INTERVIEW_KITS.filter((kit) => kit.id === id)[0] || undefined
    };
};
