const POSITIONS = [
    {
        id: '1',
        title: 'Software Engineer I',
        desc: 'Ini adalah posisi Software Engineer I',
        level: 'Entry Level',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastUpdatedBy: 'Rafidika Samekto',
        numOfInterviews: 1,
        interviewKits: [
            {
                id: '1',
                title: 'General HR Interview',
                level: 'Entry Level',
                desc: 'Posisi software enginer nih bos senggol dong',
                numOfQuestions: 3,
                duration: 15,
                createdAt: new Date(),
                updatedAt: new Date(),
                questions: [
                    { question: 'Siapa Tuhanmu?', duration: 5 },
                    { question: 'Siapa Nabimu?', duration: 5 },
                    { question: 'Apa Kitabmu?', duration: 5 }
                ]
            }
        ]
    },
    {
        id: '2',
        title: 'Engineering Manager',
        desc: 'Ini adalah posisi Software Engineer I',
        level: 'Entry Level',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastUpdatedBy: 'Rafidika Samekto',
        numOfInterviews: 1,
        interviewKits: [
            {
                id: '1',
                title: 'General HR Interview',
                level: 'Entry Level',
                desc: 'Posisi software enginer nih bos senggol dong',
                numOfQuestions: 3,
                duration: 15,
                createdAt: new Date(),
                updatedAt: new Date(),
                questions: [
                    { question: 'Siapa Tuhanmu?', duration: 5 },
                    { question: 'Siapa Nabimu?', duration: 5 },
                    { question: 'Apa Kitabmu?', duration: 5 }
                ]
            }
        ]
    }
];

export const getAllPositions = () => {
    return { data: POSITIONS };
};

export const getPositionById = (id) => {
    return { data: POSITIONS.filter((pos) => pos.id === id)[0] || undefined };
};
