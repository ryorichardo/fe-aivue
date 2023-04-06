// import { Button, Card, Grid, Stack, TextField, Typography, Box } from '@mui/material';
// import { gridSpacing } from 'config/constant';

// function FormCandidatePage() {
//     return (
//         <Grid container spacing={gridSpacing} justifyContent="flex-end">
//             <Grid item md={6} sm={12}>
//                 <Stack spacing={2}>
//                     <Typography variant="h3">Informasi Kandidat</Typography>
//                     <Card>
//                         <Grid container spacing={gridSpacing}>
//                             <Grid item xs={12}>
//                                 <Stack spacing={1}>
//                                     <Typography variant="h4">Nama Kandidat</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="name"
//                                         name="name"
//                                         autoComplete="name"
//                                         placeholder="John Doe"
//                                         // value={watchName}
//                                         // onChange={handleNameChange}
//                                         // error={errors.name !== undefined}
//                                         // helperText={errors.name?.message}
//                                     />
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Stack spacing={1}>
//                                     <Typography variant="h4">Nama Kandidat</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="name"
//                                         name="name"
//                                         autoComplete="name"
//                                         placeholder="John Doe"
//                                         // value={watchName}
//                                         // onChange={handleNameChange}
//                                         // error={errors.name !== undefined}
//                                         // helperText={errors.name?.message}
//                                     />
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Stack spacing={1}>
//                                     <Typography variant="h4">Nama Kandidat</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="name"
//                                         name="name"
//                                         autoComplete="name"
//                                         placeholder="John Doe"
//                                         // value={watchName}
//                                         // onChange={handleNameChange}
//                                         // error={errors.name !== undefined}
//                                         // helperText={errors.name?.message}
//                                     />
//                                 </Stack>
//                             </Grid>
//                         </Grid>
//                     </Card>
//                 </Stack>
//             </Grid>
//             <Grid item md={6} sm={12}>
//                 <Stack spacing={2}>
//                     <Typography variant="h3">Pengaturan Interview</Typography>
//                     <Card>
//                         <Grid container spacing={gridSpacing}>
//                             <Grid item xs={12}>
//                                 <Stack spacing={1}>
//                                     <Typography variant="h4">Nama Interviewer</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="name"
//                                         name="name"
//                                         autoComplete="name"
//                                         placeholder="John Doe"
//                                         // value={watchName}
//                                         // onChange={handleNameChange}
//                                         // error={errors.name !== undefined}
//                                         // helperText={errors.name?.message}
//                                     />
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Stack spacing={1}>
//                                     <Typography variant="h4">Interview Kit</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="name"
//                                         name="name"
//                                         autoComplete="name"
//                                         placeholder="John Doe"
//                                         // value={watchName}
//                                         // onChange={handleNameChange}
//                                         // error={errors.name !== undefined}
//                                         // helperText={errors.name?.message}
//                                     />
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Stack spacing={1}>
//                                     <Typography variant="h4">Tanggal Berlaku</Typography>
//                                     <TextField
//                                         variant="outlined"
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="name"
//                                         name="name"
//                                         autoComplete="name"
//                                         placeholder="John Doe"
//                                         // value={watchName}
//                                         // onChange={handleNameChange}
//                                         // error={errors.name !== undefined}
//                                         // helperText={errors.name?.message}
//                                     />
//                                 </Stack>
//                             </Grid>
//                         </Grid>
//                     </Card>
//                 </Stack>
//             </Grid>

//             <Grid item xs={3}>
//                 <Button size="large" fullWidth variant="contained">
//                     Kirim Undangan
//                 </Button>
//             </Grid>
//         </Grid>
//     );
// }

// export default FormCandidatePage;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
    Button,
    Card,
    Grid,
    Stack,
    TextField,
    Typography,
    InputLabel,
    OutlinedInput,
    MenuItem,
    IconButton,
    InputAdornment,
    FormHelperText,
    FormControl,
    FormGroup,
    Tooltip,
    Popper,
    ClickAwayListener,
    Select,
    ToggleButton,
    ToggleButtonGroup,
    Autocomplete
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LEVEL_OPTIONS, gridSpacing } from 'config/constant';
import { getInterviewKitById, getInterviewKits } from 'utils/api/interview';
import { IconAlarmOff, IconClock, IconPlus, IconTrash } from '@tabler/icons';
import { useRef } from 'react';
import MainCard from 'components/cards/MainCard';
import { defaultValues, positionSchema } from 'utils/schema/position';
import { getPositionById } from 'utils/api/position';

function FormPositionPage() {
    const { id } = useParams();
    const [currentData, setCurrentData] = useState(null);
    const [interviewKitList, setInterviewKitList] = useState([]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(positionSchema),
        defaultValues
    });

    const getPositionDetail = async (id) => {
        try {
            // TODO - add loading mechanism
            const { data } = await getPositionById(id);
            setCurrentData(data);
        } catch (error) {
            // TODO: error handling here
            console.log(error);
        }
    };

    const getInterviewKitList = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getInterviewKits();
            setInterviewKitList(data);
        } catch (error) {
            // TODO: error handling here
            console.log(error);
        }
    };

    useEffect(() => {
        getInterviewKitList();

        if (id) {
            getPositionDetail(id);
        }
    }, [id, register]);

    useEffect(() => {
        if (currentData !== null) {
            setValue('title', currentData.title);
            setValue('level', currentData.level);
            setValue('desc', currentData.desc);
            setValue('interviewKits', currentData.interviewKits);
        }
    }, [currentData, setValue]);

    const onSubmit = async ({ title, level, desc, interviewKits }) => {
        try {
            const payload = {
                title,
                level,
                desc,
                interviewKits
            };

            console.log(payload);
            // TODO - handle submit for position
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form id="positionForm" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={gridSpacing} justifyContent="flex-start">
                <Grid item sm={10}>
                    <Stack spacing={2}>
                        <Typography variant="h3">Informasi Pekerjaan</Typography>
                        <Card>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    <Typography variant="h4">Nama posisi</Typography>
                                                </InputLabel>
                                                <TextField
                                                    {...field}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    placeholder="Software Engineer"
                                                    error={errors.title !== undefined}
                                                    helperText={errors.title?.message}
                                                />
                                            </Stack>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="level"
                                        control={control}
                                        render={({ field }) => (
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    <Typography variant="h4">Level</Typography>
                                                </InputLabel>
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    error={errors.level !== undefined}
                                                    helperText={errors.level?.message}
                                                >
                                                    {LEVEL_OPTIONS.map((option) => (
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
                                    <Controller
                                        name="desc"
                                        control={control}
                                        render={({ field }) => (
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    <Typography variant="h4">Deskripsi</Typography>
                                                </InputLabel>
                                                <TextField
                                                    {...field}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    placeholder="Deskripsi"
                                                    multiline
                                                    minRows={3}
                                                    error={errors.desc !== undefined}
                                                    helperText={errors.desc?.message}
                                                />
                                            </Stack>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="interviewKits"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    <Typography variant="h4">Tahapan Interview</Typography>
                                                </InputLabel>
                                                <Autocomplete
                                                    isOptionEqualToValue={(option, value) => option.title === value.title}
                                                    value={value}
                                                    multiple
                                                    options={interviewKitList}
                                                    getOptionLabel={(option) => option.title}
                                                    filterSelectedOptions
                                                    renderInput={(params) => <TextField {...params} fullWidth placeholder="Tahapan" />}
                                                    onChange={(_, value) => {
                                                        onChange(value);
                                                        return value;
                                                    }}
                                                />
                                            </Stack>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Button size="large" fullWidth variant="contained" type="submit">
                        Simpan
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default FormPositionPage;
