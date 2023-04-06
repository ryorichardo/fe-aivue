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
    interviewKits: []
};
