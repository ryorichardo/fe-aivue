import { Button, Grid } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import QuestionCard from '../components/QuestionCard';
import AnswerRecorder from '../components/AnswerRecorder';
import { finishInterview, insertAnswerForQuestionId, uploadAnswerToS3 } from 'utils/api/answer';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';

function AnswerPage() {
    const { interviewId, questionId } = useParams();
    const navigate = useNavigate();
    const interviewQuestions = useSelector((state) => state.candidate?.candidate?.interview_detail?.questions);
    const currentIndex = useSelector((state) => state.candidate?.currentQuestionIndex);

    console.log(useSelector((state) => state));
    const dispatch = useDispatch();

    const [currentQuestion, setCurrentQuestion] = useState();
    const [videoFile, setVideoFile] = useState();
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const insertAnswer = async (interviewId, questionId) => {
        setLoading(true);
        try {
            const { data } = await insertAnswerForQuestionId(interviewId, questionId);
            if (data?.presigned_url && videoFile) {
                const res = await uploadAnswerToS3(data.presigned_url, videoFile);
                if (res.status === 200) {
                    dispatch({
                        type: SET_NOTIFICATION,
                        notification: generateNotification(res, 'Upload jawaban berhasil, silahkan menuju pertanyaan berikutnya')
                    });
                    dispatch({ type: INCREMENT_QUESTION_INDEX });
                    setUploadSuccess(true);
                }
            }
        } catch (error) {
            dispatch({
                type: SET_NOTIFICATION,
                notification: generateNotification(error, 'Terjadi kesalahan, mohon upload video kembali')
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (interviewId && questionId) {
            insertAnswer(interviewId, questionId);
        }
    };

    const navigateToNextQuestion = async (idx) => {
        if (idx >= interviewQuestions.length) {
            navigate(`/interview/${interviewId}/finish`);
        } else {
            navigate(`/interview/${interviewId}/question/${interviewQuestions[idx]?.question_id}`);
        }
    };

    useEffect(() => {
        if (questionId && interviewQuestions) setCurrentQuestion(interviewQuestions.filter((q) => q.question_id === questionId)?.[0]);
    }, [questionId, interviewQuestions]);

    if (!currentQuestion) {
        return;
    }

    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={4}>
                <QuestionCard
                    currentQuestion={currentQuestion}
                    numOfQuestion={interviewQuestions?.length}
                    currentQuestionNumber={currentIndex}
                />
            </Grid>
            <Grid item xs={8}>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <AnswerRecorder question={currentQuestion} onSubmit={handleSubmit} setVideoFile={setVideoFile} />
                    </Grid>
                    {uploadSuccess ? (
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigateToNextQuestion(currentIndex);
                                }}
                            >
                                Pertanyaan Selanjutnya
                            </Button>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AnswerPage;
