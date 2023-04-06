import * as yup from 'yup';

export const positionSchema = yup.object().shape({
    title: yup.string().required('Posisi tidak boleh kosong'),
    level: yup.string().required('Level tidak boleh kosong'),
    desc: yup.string().required('Deskripsi tidak boleh kosong'),
    interviewKits: yup.array().min(1, 'Minimal terdapat 1 interview-kit').required()
});

export const defaultValues = {
    title: '',
    level: '',
    desc: '',
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
};
