import { Button, Grid } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import QuestionCard from '../components/QuestionCard';
import AnswerRecorder from '../components/AnswerRecorder';
import { insertAnswerForQuestionId, uploadAnswerToS3 } from 'utils/api/answer';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_QUESTION, SET_LOADING_CANDIDATE, SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
import { useRecordWebcam } from 'react-record-webcam';
import { CAMERA_STATUS } from '../constant';

const OPTIONS = {
    fileName: 'test-filename',
    mimeType: 'video/x-matroska;codecs=avc1',
    width: 1920,
    height: 1080,
    disableLogs: true
};

function AnswerPage() {
    const { interviewId, questionId } = useParams();
    const navigate = useNavigate();
    const interviewQuestions = useSelector((state) => state.candidate?.candidate?.interview_detail?.questions);
    const currentIndex = useSelector((state) => state.candidate?.currentQuestionIndex);

    const dispatch = useDispatch();

    const [currentQuestion, setCurrentQuestion] = useState();
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const recordWebcam = useRecordWebcam(OPTIONS);

    const insertAnswer = async (interviewId, questionId) => {
        dispatch({ type: SET_LOADING_CANDIDATE, loading: true });
        try {
            const blob = await recordWebcam.getRecording();
            const videoFile = new File([blob], 'test.mp4', { type: blob.type });

            const { data } = await insertAnswerForQuestionId(interviewId, questionId);
            if (data?.presigned_url && videoFile) {
                const res = await uploadAnswerToS3(data.presigned_url, videoFile);
                if (res.status === 200) {
                    dispatch({
                        type: SET_NOTIFICATION,
                        notification: generateNotification(res, 'Upload jawaban berhasil, silahkan menuju pertanyaan berikutnya')
                    });
                    setUploadSuccess(true);
                }
            }
        } catch (error) {
            dispatch({
                type: SET_NOTIFICATION,
                notification: generateNotification(error, 'Terjadi kesalahan, mohon upload video kembali')
            });
        } finally {
            dispatch({ type: SET_LOADING_CANDIDATE, loading: false });
        }
    };

    const handleSubmit = () => {
        if (interviewId && questionId) {
            insertAnswer(interviewId, questionId);
        }
    };

    const navigateToNextQuestion = async (idx) => {
        if (idx + 1 >= interviewQuestions.length) {
            navigate(`/interview/${interviewId}/finish`);
        } else {
            dispatch({ type: SET_CURRENT_QUESTION, index: idx + 1 });
            navigate(`/interview/${interviewId}/question/${interviewQuestions[idx + 1]?.question_id}`);
            setUploadSuccess(false);
        }
    };

    useEffect(() => {
        if (questionId && interviewQuestions) setCurrentQuestion(interviewQuestions.filter((q) => q.question_id === questionId)?.[0]);
        if (recordWebcam) {
            if (recordWebcam.status === CAMERA_STATUS.PREVIEW) {
                recordWebcam.retake();
            } else {
                recordWebcam.open();
            }
        }
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
                    currentQuestionNumber={currentIndex + 1}
                />
            </Grid>
            <Grid item xs={8}>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <AnswerRecorder
                            question={currentQuestion}
                            onSubmit={handleSubmit}
                            recordWebcam={recordWebcam}
                            isUploaded={uploadSuccess}
                        />
                    </Grid>
                    {uploadSuccess ? (
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigateToNextQuestion(currentIndex);
                                }}
                            >
                                {currentIndex + 1 >= interviewQuestions.length ? 'Selesaikan Interview' : 'Pertanyaan Selanjutnya'}
                            </Button>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AnswerPage;
