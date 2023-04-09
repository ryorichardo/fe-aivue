import * as yup from 'yup';

export const interviewKitSchema = yup.object().shape({
    title: yup.string().required('Posisi tidak boleh kosong'),
    desc: yup.string(),
    questions: yup.array().min(1, 'Minimal terdapat 1 pertanyaan').required()
});

export const defaultValues = {
    title: '',
    desc: '',
    questions: []
};
