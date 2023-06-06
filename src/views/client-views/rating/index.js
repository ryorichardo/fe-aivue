import { Box, Button, Grid, InputLabel, Rating, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { FINISH, SET_NOTIFICATION } from 'store/actions';
import { finishInterview } from 'utils/api/answer';
import { generateNotification } from 'utils/notification';

function RatingPage() {
    const { id } = useParams();
    const [rate, setRate] = useState(0);
    const [feedback, setFeedback] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFinishInterview = async (e, id) => {
        e.preventDefault();
        try {
            await finishInterview(id, { feedback, rate });
            dispatch({ type: FINISH });
            navigate('/interview/login');
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };
    return (
        <Box sx={{ background: 'white', marginTop: '120px', padding: '64px' }}>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Typography variant="h2">Interview Selesai!</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">Beri penilaian terkait pengalamanmu interview dengan AIVue!</Typography>
                </Grid>
                <Grid item>
                    <Rating size="large" value={rate} onChange={(_, rate) => setRate(rate)} />
                </Grid>
                <Grid item>
                    <Stack spacing={1}>
                        <InputLabel>
                            <Typography variant="body1">Ada komentar?</Typography>
                        </InputLabel>
                        <TextField
                            margin="normal"
                            fullWidth
                            placeholder="Masukkan komentar"
                            multiline
                            minRows={4}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </Stack>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained" onClick={(e) => handleFinishInterview(e, id)}>
                        Selesaikan Interview
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RatingPage;
