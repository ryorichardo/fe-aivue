import * as yup from 'yup';

export const candidateSchema = yup.object().shape({
    name: yup.string().required('Nama kandidat tidak boleh kosong'),
    email: yup.string().email().required('Email kandidat tidak boleh kosong'),
    position: yup.string().required('Posisi kandidat tidak boleh kosong'),
    cv: yup.string().required().required('CV kandidat tidak boleh kosong'),
    pic: yup.string().required().required('Nama PIC tidak boleh kosong'),
    expiredDuration: yup.number().required('Durasi expired interview tidak boleh kosong'),
    startDateTime: yup.date().required('Tanggal mulai interview tidak boleh kosong')
});

export const defaultValues = {
    name: '',
    email: '',
    cv: '',
    position: '',
    pic: '',
    expiredDuration: 3,
    startDateTime: new Date()
};
