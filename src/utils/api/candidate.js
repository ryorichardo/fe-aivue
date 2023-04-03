const CANDIDATES = [
    {
        id: '1',
        name: 'Andrew Tate',
        email: 'tate@topg.com',
        position: 'Software Engineer I',
        status: 'SELECTED',
        expiredDate: new Date(),
        completedDate: new Date(),
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

export const getAllCandidates = async () => {
    return { data: CANDIDATES };
};

export const getCandidateById = async (id) => {
    return { data: CANDIDATES.filter((candidate) => candidate.id === id)[0] || undefined };
};
