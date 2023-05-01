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

import { LEVEL_OPTIONS, gridSpacing } from 'configs/constant';
import { getInterviewKitById, getInterviewKits } from 'utils/api/interview-kit';
import { IconAlarmOff, IconClock, IconInfoCircle, IconPlus, IconTrash } from '@tabler/icons';
import { useRef } from 'react';
import MainCard from 'components/cards/MainCard';
import { defaultValues, candidateSchema } from 'utils/schema/candidate';
import { getAllPositions } from 'utils/api/position';
import { getAllUsers } from 'utils/api/user';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FileUploader from 'components/FileUploader';
import { format } from 'date-fns';
import { createCandidate } from 'utils/api/candidate';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';

function FormCandidatePage() {
    const dispatch = useDispatch();
    const [positionList, setPositionList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [cv, setCv] = useState();

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(candidateSchema),
        defaultValues
    });

    const getPositionList = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAllPositions();
            setPositionList(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    const getUserList = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAllUsers();
            setUserList(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    useEffect(() => {
        getPositionList();
        getUserList();
    }, []);

    const onSubmit = async ({ name, email, position, pic, expiredDuration, startDateTime }) => {
        try {
            const cvFormData = new FormData();
            cvFormData.append('cv', cv, cv.name);

            const payload = {
                name,
                email,
                cv: cvFormData,
                position_id: position.id,
                pic_id: pic.id,
                expired_duration: expiredDuration,
                start_time: format(startDateTime, 'dd/mm/yyyy hh:mm')
            };
            //TODO - formData and json handling

            const res = await createCandidate(payload);
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res) });
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    return (
        <form id="positionForm" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={gridSpacing} justifyContent="flex-start">
                <Grid item md={6} sm={12}>
                    <Stack spacing={2}>
                        <Typography variant="h3">Informasi Kandidat</Typography>
                        <Card>
                            <Grid container spacing={gridSpacing}>
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
                                                    variant="outlined"
                                                    margin="normal"
                                                    placeholder="johndoe@email.com"
                                                    required
                                                    fullWidth
                                                    error={errors.email !== undefined}
                                                    helperText={errors.email?.message}
                                                />
                                            </Stack>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <Typography variant="h4">Posisi</Typography>
                                        <FormControl fullWidth error={errors.position !== undefined}>
                                            <Controller
                                                name="position"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Autocomplete
                                                        isOptionEqualToValue={(opt, val) => opt.id === val.id}
                                                        value={value || null}
                                                        options={positionList}
                                                        getOptionLabel={(option) => option.title}
                                                        disablePortal
                                                        renderInput={(params) => (
                                                            <TextField {...params} fullWidth placeholder="Software Engineer I" />
                                                        )}
                                                        onChange={(_, value) => {
                                                            onChange(value);
                                                            return value;
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.position && errors.position.message && (
                                                <FormHelperText>{errors.position?.message}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <Typography variant="h4">CV</Typography>
                                        <FormControl fullWidth error={errors.cv !== undefined}>
                                            <Controller
                                                name="cv"
                                                control={control}
                                                render={({ field }) => <FileUploader otherProps={{ ...field }} />}
                                            />
                                            {errors.cv && errors.cv?.message && <FormHelperText error>{errors.cv?.message}</FormHelperText>}
                                        </FormControl>
                                    </Stack>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <Typography variant="h4">CV</Typography>
                                        <FormControl fullWidth>
                                            <FileUploader file={cv} setFile={setCv} />
                                        </FormControl>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item md={6} sm={12}>
                    <Stack spacing={2}>
                        <Typography variant="h3">Pengaturan Interview</Typography>
                        <Card>
                            <Grid container spacing={gridSpacing} justifyContent="flex-end">
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <Typography variant="h4">PIC</Typography>
                                        <FormControl fullWidth error={errors.pic !== undefined}>
                                            <Controller
                                                name="pic"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Autocomplete
                                                        isOptionEqualToValue={(opt, val) => opt.email === val.email}
                                                        value={value || null}
                                                        options={userList}
                                                        getOptionLabel={(option) => option.name}
                                                        disablePortal
                                                        renderInput={(params) => (
                                                            <TextField {...params} fullWidth placeholder="Nama PIC/Interviewer" />
                                                        )}
                                                        onChange={(_, value) => {
                                                            onChange(value);
                                                            return value;
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.pic && errors.position.pic && <FormHelperText>{errors.position?.pic}</FormHelperText>}
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="expiredDuration"
                                        control={control}
                                        render={({ field }) => (
                                            <Stack spacing={1}>
                                                <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant="h4">Durasi submisi</Typography>
                                                    <Tooltip title="Durasi submisi sebelum interview kedaluwarsa berlaku untuk setiap tahapan interview untuk posisi ini">
                                                        <IconButton sx={{ marginLeft: 1 }}>
                                                            <IconInfoCircle size={16} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </InputLabel>
                                                <TextField
                                                    {...field}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    placeholder="3"
                                                    type="number"
                                                    error={errors.expiredDuration !== undefined}
                                                    helperText={errors.expiredDuration?.message}
                                                    InputProps={{ endAdornment: <InputAdornment position="end">hari</InputAdornment> }}
                                                />
                                            </Stack>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <Typography variant="h4">Berlaku dari</Typography>
                                        <FormControl fullWidth error={errors.startDateTime !== undefined}>
                                            <Controller
                                                name="startDateTime"
                                                control={control}
                                                render={({ field: { value, onChange } }) => (
                                                    <Stack spacing={1}>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <DateTimePicker
                                                                value={value}
                                                                onChange={(value) => {
                                                                    onChange(value);
                                                                }}
                                                            />
                                                        </LocalizationProvider>
                                                    </Stack>
                                                )}
                                            />
                                            {errors.startDateTime && errors.startDateTime.message && (
                                                <FormHelperText>{errors.startDateTime?.message}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Stack>
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

export default FormCandidatePage;
