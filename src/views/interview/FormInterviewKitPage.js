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
    ToggleButtonGroup
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LEVEL_OPTIONS, gridSpacing } from 'config/constant';
import { defaultValues, interviewKitSchema } from 'utils/schema/interview-kit';
import { getInterviewKitById } from 'utils/api/interview';
import { IconAlarmOff, IconClock, IconPlus, IconTrash } from '@tabler/icons';
import { useRef } from 'react';
import MainCard from 'components/cards/MainCard';

function FormInterviewKitPage() {
    const { id } = useParams();
    const [currentData, setCurrentData] = useState(null);
    const theme = useTheme();

    const [modalDurationOpen, setModalDurationOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);

    const [newQuestion, setNewQuestion] = useState({ question: '', duration: -1 });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(interviewKitSchema),
        defaultValues
    });

    const { fields, append, remove } = useFieldArray({
        name: 'questions',
        control
    });

    const getInterviewKitDetail = async (id) => {
        try {
            // TODO - add loading mechanism
            const { data } = await getInterviewKitById(id);
            setCurrentData(data);
        } catch (error) {
            // TODO: error handling here
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getInterviewKitDetail(id);
        }
    }, [id, register]);

    useEffect(() => {
        if (currentData !== null) {
            setValue('position', currentData.position);
            setValue('level', currentData.level);
            setValue('desc', currentData.desc);
            setValue('questions', currentData.questions);
        }
    }, [currentData, setValue]);

    const onSubmit = handleSubmit(async ({ position, level, desc, questions }) => {
        try {
            const payload = {
                position,
                level,
                desc,
                questions
            };

            console.log(payload);

            // if (id) {
            //     await updateShiftById(id, payload);
            // } else {
            //     await createShifts(payload);
            // }
        } catch (error) {
            console.log(error);
        }
    });

    console.log(fields);
    console.log(watch());
    console.log(errors);

    return (
        <form id="interviewKitForm" noValidate onSubmit={onSubmit}>
            <Grid container spacing={gridSpacing} justifyContent="flex-start">
                <Grid item sm={10}>
                    <Stack spacing={2}>
                        <Typography variant="h3">Informasi Pekerjaan</Typography>
                        <Card>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="position"
                                        control={control}
                                        render={({ field }) => (
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    <Typography variant="h4">Posisi</Typography>
                                                </InputLabel>
                                                <TextField
                                                    {...field}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    placeholder="Software Engineer"
                                                    error={errors.position !== undefined}
                                                    helperText={errors.position?.message}
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
                                                    select
                                                    renderValue={(selected) => {
                                                        if (!selected.length) {
                                                            return 'Select';
                                                        }

                                                        return selected;
                                                    }}
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
                            </Grid>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item sm={10}>
                    <Stack spacing={2}>
                        <Typography variant="h3">Pertanyaan Interview</Typography>
                        <FormControl>
                            <OutlinedInput
                                margin="normal"
                                fullWidth
                                placeholder="Tulis pertanyaan"
                                multiline
                                value={newQuestion?.question}
                                onChange={(e) => {
                                    setNewQuestion((prev) => {
                                        return { ...prev, question: e.target.value };
                                    });
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={(e) => {
                                                setAnchorEl(e.currentTarget);
                                                setModalDurationOpen((prev) => !prev);
                                            }}
                                        >
                                            <IconClock />
                                        </IconButton>
                                        <IconButton>
                                            <IconPlus
                                                onClick={() => {
                                                    append(newQuestion);
                                                    setNewQuestion({
                                                        question: '',
                                                        duration: 0
                                                    });
                                                    setModalDurationOpen(false);
                                                }}
                                            />
                                        </IconButton>
                                        <Popper anchorEl={anchorEl} placement="top-end" open={modalDurationOpen} disablePortal>
                                            <Card sx={{ boxShadow: theme.shadows[16], zIndex: 999 }}>
                                                <FormControl>
                                                    <Controller
                                                        name="level"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <>
                                                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                                    Durasi Menjawab
                                                                </Typography>
                                                                <Grid container spacing={1} direction="row" alignItems="center">
                                                                    <Grid item>
                                                                        <TextField
                                                                            {...field}
                                                                            variant="standard"
                                                                            margin="normal"
                                                                            type="number"
                                                                            required
                                                                            sx={{ width: '100px' }}
                                                                            disabled={newQuestion?.duration === -1}
                                                                            value={newQuestion.duration === -1 ? 0 : newQuestion.duration}
                                                                            onChange={(e) =>
                                                                                setNewQuestion((prev) => {
                                                                                    return { ...prev, duration: e.target.value };
                                                                                })
                                                                            }
                                                                            InputProps={{
                                                                                endAdornment: (
                                                                                    <InputAdornment position="end">Menit</InputAdornment>
                                                                                )
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Tooltip title="Tanpa durasi">
                                                                            <ToggleButtonGroup
                                                                                color="secondary"
                                                                                exclusive
                                                                                value={newQuestion?.duration}
                                                                                onChange={(_, value) => {
                                                                                    setNewQuestion((prev) => {
                                                                                        return { ...prev, duration: value || 0 };
                                                                                    });
                                                                                    console.log('AOOOO', value);
                                                                                }}
                                                                            >
                                                                                <ToggleButton value={-1} sx={{ border: 'none' }}>
                                                                                    <IconAlarmOff />
                                                                                </ToggleButton>
                                                                            </ToggleButtonGroup>
                                                                        </Tooltip>
                                                                    </Grid>
                                                                </Grid>
                                                            </>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Card>
                                        </Popper>
                                    </InputAdornment>
                                }
                            />
                            {errors.questions && errors.questions.message && <FormHelperText>{errors.questions?.message}</FormHelperText>}
                        </FormControl>

                        {fields.length > 0 && (
                            <Card>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        {fields?.map((question, index) => (
                                            <Stack spacing={1.5}>
                                                <Controller
                                                    name={`questions[${index}].question`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            variant="standard"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            error={errors.position !== undefined}
                                                            helperText={errors.position?.message}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Typography variant="h5">{`${index + 1}.`}</Typography>
                                                                    </InputAdornment>
                                                                ),
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <Controller
                                                                            name={`questions.${index}.duration`}
                                                                            control={control}
                                                                            render={({ field }) => (
                                                                                <Stack direction="row" spacing={1}>
                                                                                    <IconButton size="small" color="secondary">
                                                                                        {question.duration === -1 ? (
                                                                                            <IconAlarmOff size={18} />
                                                                                        ) : (
                                                                                            <>
                                                                                                <IconClock size={18} />
                                                                                                <Typography variant="body1" mx={1.5}>
                                                                                                    {question.duration}
                                                                                                </Typography>
                                                                                            </>
                                                                                        )}
                                                                                    </IconButton>
                                                                                    <IconButton
                                                                                        size="small"
                                                                                        color="secondary"
                                                                                        onClick={() => remove(index)}
                                                                                    >
                                                                                        <IconTrash size={18} />
                                                                                    </IconButton>
                                                                                </Stack>
                                                                            )}
                                                                        />
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Stack>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Card>
                        )}
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

export default FormInterviewKitPage;