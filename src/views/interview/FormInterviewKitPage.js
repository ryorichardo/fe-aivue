import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
    Button,
    Card,
    Grid,
    Stack,
    TextField,
    Typography,
    InputLabel,
    OutlinedInput,
    IconButton,
    InputAdornment,
    FormHelperText,
    FormControl,
    Tooltip,
    Popper,
    ClickAwayListener,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { gridSpacing } from 'configs/constant';
import { defaultValues, interviewKitSchema } from 'utils/schema/interview-kit';
import { createInterviewKit, getInterviewKitById, updateInterviewKit } from 'utils/api/interview-kit';
import { IconAlarmOff, IconClock, IconPlus, IconTrash } from '@tabler/icons';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
import CircularLoader from 'components/CircularLoader';

const DEFAULT_INTERVIEW_DURATION = 3;

function FormInterviewKitPage() {
    const { id } = useParams();
    const [currentData, setCurrentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [modalDurationOpen, setModalDurationOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);

    const [newQuestion, setNewQuestion] = useState({ question: '', duration: DEFAULT_INTERVIEW_DURATION });

    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        clearErrors,
        setError
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
            const { data } = await getInterviewKitById(id);
            setCurrentData(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    useEffect(() => {
        if (id) {
            getInterviewKitDetail(id);
        }
    }, [id]);

    useEffect(() => {
        if (currentData !== null) {
            setValue('title', currentData.title);
            setValue('desc', currentData.description);
            setValue('questions', currentData.questions);
        }
    }, [currentData, setValue]);

    const onSubmit = handleSubmit(async ({ title, desc, questions }) => {
        setLoading(true);
        try {
            let payload = {
                title,
                description: desc,
                questions
            };

            let res;
            if (id) {
                res = await updateInterviewKit(id, payload);
            } else {
                res = await createInterviewKit(payload);
            }

            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res) });
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        } finally {
            setLoading(false);
            navigate('/interview-kit');
        }
    });

    return (
        <form id="interviewKitForm" noValidate onSubmit={onSubmit}>
            {loading ? <CircularLoader disabledBg /> : null}
            <Grid container spacing={gridSpacing} justifyContent="flex-start">
                <Grid item sm={10}>
                    <Stack spacing={2}>
                        <Typography variant="h3">Informasi Interview Kit</Typography>
                        <Card>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <Stack spacing={1}>
                                                <InputLabel>
                                                    <Typography variant="h4">Judul</Typography>
                                                </InputLabel>
                                                <TextField
                                                    {...field}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    placeholder="Judul interview kit"
                                                    error={errors.title !== undefined}
                                                    helperText={errors.title?.message}
                                                />
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
                        <FormControl error={errors.questions}>
                            <OutlinedInput
                                fullWidth
                                placeholder="Tulis pertanyaan"
                                multiline
                                value={newQuestion?.question}
                                onChange={(e) => {
                                    if (errors.questions !== undefined) {
                                        clearErrors('questions');
                                    }
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
                                        <IconButton
                                            onClick={() => {
                                                if (newQuestion.question === '') {
                                                    setError('questions', { message: 'Pertanyaan tidak boleh kosong' });
                                                } else {
                                                    append({
                                                        ...newQuestion,
                                                        duration: newQuestion.duration === -1 ? 0 : newQuestion.duration
                                                    });
                                                    setNewQuestion({
                                                        question: '',
                                                        duration: DEFAULT_INTERVIEW_DURATION
                                                    });
                                                    setModalDurationOpen(false);
                                                }
                                            }}
                                        >
                                            <IconPlus />
                                        </IconButton>

                                        <Popper anchorEl={anchorEl} placement="top-end" open={modalDurationOpen} disablePortal>
                                            <ClickAwayListener
                                                onClickAway={(event) => {
                                                    if (anchorEl.current && anchorEl.current.contains(event.target)) {
                                                        return;
                                                    }
                                                    setModalDurationOpen(false);
                                                }}
                                            >
                                                <Card sx={{ boxShadow: theme.shadows[16], zIndex: 999 }}>
                                                    <FormControl>
                                                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                            Durasi Menjawab
                                                        </Typography>
                                                        <Grid container spacing={1} direction="row" alignItems="center">
                                                            <Grid item>
                                                                <TextField
                                                                    variant="standard"
                                                                    margin="normal"
                                                                    type="number"
                                                                    required
                                                                    sx={{ width: '100px' }}
                                                                    disabled={newQuestion?.duration === -1}
                                                                    value={newQuestion.duration === -1 ? 0 : newQuestion.duration}
                                                                    onChange={(e) =>
                                                                        setNewQuestion((prev) => {
                                                                            return {
                                                                                ...prev,
                                                                                duration: parseInt(
                                                                                    e.target.value === -1 ? 0 : e.target.value
                                                                                )
                                                                            };
                                                                        })
                                                                    }
                                                                    InputProps={{
                                                                        endAdornment: <InputAdornment position="end">Menit</InputAdornment>
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
                                                                                return {
                                                                                    ...prev,
                                                                                    duration: value || DEFAULT_INTERVIEW_DURATION
                                                                                };
                                                                            });
                                                                        }}
                                                                    >
                                                                        <ToggleButton value={-1} sx={{ border: 'none' }}>
                                                                            <IconAlarmOff />
                                                                        </ToggleButton>
                                                                    </ToggleButtonGroup>
                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>
                                                    </FormControl>
                                                </Card>
                                            </ClickAwayListener>
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
                                            <Stack spacing={1.5} key={question.id}>
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
                                                                        <Stack direction="row" spacing={1}>
                                                                            <IconButton size="small" color="secondary">
                                                                                {question.duration === 0 ? (
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
