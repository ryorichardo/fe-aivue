import { Button, Grid } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import QuestionCard from '../components/QuestionCard';
import AnswerRecorderPractice from '../components/AnswerRecorderPractice';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function PracticePage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const candidate = useSelector((state) => state.candidate.candidate);
    const nav = useNavigate();

    const handleClickStartInterview = (e) => {
        e.preventDefault();
        nav(`/interview/${id}/question/${candidate?.interview_detail?.questions?.[0]?.question_id}`);
    };

    const handleBack = (e) => {
        e.preventDefault();
        nav(`/interview/${id}`);
    };
    const [showNextButton, setShowNextButton] = useState(false);

    if (!candidate) {
        return;
    }
    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={4}>
                <QuestionCard
                    currentQuestion={{ question: 'Perkenalkan dirimu dalam Bahasa Inggris', duration: 1 }}
                    numOfQuestion={1}
                    currentQuestionNumber={1}
                />
            </Grid>
            <Grid item xs={8}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <AnswerRecorderPractice
                            question={{ question: 'Perkenalkan dirimu dalam Bahasa Inggris', duration: 1 }}
                            onSubmit={() => {
                                dispatch({
                                    type: SET_NOTIFICATION,
                                    notification: { type: 'success', message: 'Latihan interview berhasil, silahkan mulai interview' }
                                });
                                setShowNextButton(true);
                            }}
                        />
                    </Grid>
                    {showNextButton ? (
                        <Grid item>
                            <Grid container direction="row" spacing={1}>
                                <Grid item>
                                    <Button variant="contained" onClick={handleClickStartInterview}>
                                        Mulai Interview
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" onClick={handleBack}>
                                        Kembali
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PracticePage;
