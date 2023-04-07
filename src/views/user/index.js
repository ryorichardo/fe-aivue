import { Box, Button, Grid, InputLabel, MenuItem, Modal, Pagination, Stack, TextField, Typography } from '@mui/material';
import { ROLE, gridSpacing } from 'config/constant';
import { useState, useEffect } from 'react';
import { getAllUsers } from 'utils/api/user';
import UserList from './components/UserList';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema, defaultValues } from 'utils/schema/user';

function UserPage() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues
    });

    const getUsers = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAllUsers();
            setUsers(data);
        } catch (error) {
            // TODO - add error handling
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const onSubmitNewUser = async ({ name, role, email }) => {
        const payload = {
            name,
            email,
            role
        };
        console.log(payload);
        setOpen(false);
        reset();
    };

    const handleOnClickAddUser = () => {
        setOpen(true);
    };
    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container justifyContent="flex-end">
                        <Button size="large" variant="contained" onClick={handleOnClickAddUser}>
                            Tambah Akun
                        </Button>
                    </Grid>
                </Grid>
                {!users || users.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Belum ada user AIVue di perusahaan Anda. Mulai tambahkan akun untuk memudahkan pekerjaan Anda.
                        </Typography>
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <UserList data={users} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end">
                                <Pagination count={10} color="primary" shape="rounded" />
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#fff',
                        boxShadow: 24,
                        p: 4
                    }}
                    component="form"
                    onSubmit={handleSubmit(onSubmitNewUser)}
                >
                    <Typography variant="h2" component="h2" marginBottom={2}>
                        Tambah Akun
                    </Typography>
                    <Grid container spacing={3} justifyContent="flex-end">
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Stack spacing={1}>
                                        <InputLabel>
                                            <Typography variant="h4">Nama</Typography>
                                        </InputLabel>
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            placeholder="John Doe"
                                            error={errors.name !== undefined}
                                            helperText={errors.name?.message}
                                            size="small"
                                        />
                                    </Stack>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Stack spacing={1}>
                                        <InputLabel>
                                            <Typography variant="h4">Email</Typography>
                                        </InputLabel>
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            placeholder="johndoe@aivue.com"
                                            error={errors.email !== undefined}
                                            helperText={errors.email?.message}
                                            size="small"
                                        />
                                    </Stack>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <Stack spacing={1}>
                                        <InputLabel>
                                            <Typography variant="h4">Role</Typography>
                                        </InputLabel>
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            select
                                            error={errors.role !== undefined}
                                            helperText={errors.role?.message}
                                            size="small"
                                        >
                                            {Object.values(ROLE).map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Stack>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" justifyContent="flex-end" spacing={1.5}>
                                <Grid item>
                                    <Button fullWidth variant="outlined" onClick={() => setOpen(false)}>
                                        Kembali
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button fullWidth variant="contained" type="submit">
                                        Simpan
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}

export default UserPage;
