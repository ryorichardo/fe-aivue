import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string().required('Posisi tidak boleh kosong'),
    email: yup.string().required('Email tidak boleh kosong'),
    role: yup.string().required('Role tidak boleh kosong')
});

export const defaultValues = {
    name: '',
    email: '',
    role: ''
};
