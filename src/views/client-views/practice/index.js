import { Button, Grid } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import QuestionCard from '../components/QuestionCard';
import AnswerRecorder from '../components/AnswerRecorder';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function PracticePage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const candidate = useSelector((state) => state.candidate.candidate);
    const nav = useNavigate();

    const handleClickStartInterview = () => {
        nav(`/interview/${id}/question/${candidate?.interview_detail?.questions?.[0]?.question_id}`);
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
                        <AnswerRecorder
                            question={{ question: 'Perkenalkan dirimu dalam Bahasa Inggris', duration: 1 }}
                            setVideoFile={() => {}}
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
                            <Button variant="contained" onClick={() => handleClickStartInterview()}>
                                Mulai Interview
                            </Button>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PracticePage;
