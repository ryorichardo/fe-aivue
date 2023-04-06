import * as yup from 'yup';

export const interviewKitSchema = yup.object().shape({
    position: yup.string().required('Posisi tidak boleh kosong'),
    level: yup.string().required('Level tidak boleh kosong'),
    desc: yup.string().required('Deskripsi tidak boleh kosong'),
    questions: yup.array().min(1, 'Minimal terdapat 1 pertanyaan').required(),
    createdAt: yup.date(),
    updatedAt: yup.date()
});

export const defaultValues = {
    position: '',
    level: '',
    desc: '',
    questions: []
};
