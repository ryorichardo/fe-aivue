import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { Card, Grid } from '@mui/material';

import { getCandidateById } from 'utils/api/candidate';
import { getInterviewDetail } from 'utils/api/interview';

import { gridSpacing } from 'configs/constant';

import CandidateInfo from './components/CandidateInfo';
import CandidateReviewAction from './components/CandidateReviewAction';
import InterviewQuestions from './components/InterviewQuestions';
import CandidateNotes from './components/CandidateNotes';
import InterviewAnswer from './components/InterviewAnswer';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
import { getAnswerForInterview, submitRating } from 'utils/api/answer';
import EmotionDetail from './components/EmotionDetail';
import ModalConfirm from 'components/ModalConfirm';
import RatingAnswer from './components/RatingAnswer';
import { mapAnswerToPayloadSubmitRating } from './utils';

function CandidateReviewPage() {
    const { id, interviewId } = useParams();
    const dispatch = useDispatch();
    const [candidate, setCandidate] = useState();
    const [interview, setInterview] = useState();
    const [currentQuestionId, setCurrentQuestionId] = useState();

    const [questions, setQuestions] = useState([]);
    const [mapAnswer, setMapAnswer] = useState({});
    const [currentPredictions, setCurrentPredictions] = useState();

    const [notes, setNotes] = useState([]);

    const getCandidateDetail = async (id) => {
        try {
            const { data } = await getCandidateById(id);
            setCandidate(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    const getInterview = async (interviewId) => {
        try {
            const { data } = await getInterviewDetail(interviewId);
            setInterview(data);
            //TODO- change Notes to notes
            setNotes(data.Notes);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    const getAnswers = async (interviewId) => {
        try {
            const { data } = await getAnswerForInterview(interviewId);
            let map = {};
            data.answers.forEach((answer) => {
                map[answer.question_id] = answer;
            });
            setMapAnswer(map);

            setQuestions(
                data.answers.map((a) => {
                    return {
                        id: a.question_id,
                        question: a.question
                    };
                })
            );
            setCurrentQuestionId(data.answers[0].question_id);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    // handle modal
    const [modalAction, setModalAction] = useState({
        open: false,
        onOK: () => {},
        title: '',
        message: '',
        confirmDelete: false
    });

    const handleClickReject = () => {
        setModalAction({
            open: true,
            onOk: () => handleSubmitRating(mapAnswer, 'Ditolak'),
            title: 'Tolak Kandidat',
            message: `Apakah Anda yakin ingin menolak kandidat ${candidate?.name} untuk posisi ${candidate?.position}? Email penolakan akan dikirim secara otomatis oleh sistem ke email kandidat.`,
            confirmDelete: true
        });
    };

    const handleClickSelect = () => {
        setModalAction({
            open: true,
            onOk: () => handleSubmitRating(mapAnswer, 'Dipilih'),
            title: 'Pilih Kandidat',
            message: `Apakah Anda yakin ingin memilih kandidat ${candidate?.name} untuk posisi ${candidate?.position}? Email penerimaan kandidat akan dikirim secara otomatis oleh sistem ke email kandidat.`,
            confirmDelete: false
        });
    };

    const handleClickOnHold = () => {
        setModalAction({
            open: true,
            onOk: () => handleSubmitRating(mapAnswer, 'Ditangguhkan'),
            title: 'Tangguhkan Kandidat',
            message: `Apakah Anda yakin ingin menangguhkan kandidat  ${candidate?.name} untuk posisi ${candidate?.position}? Anda tetap dapat mengubah hasil interview kandidat sewaktu-waktu.`,
            confirmDelete: false
        });
    };

    const handleSubmitRating = async (mapAnswer, result) => {
        try {
            const payload = mapAnswerToPayloadSubmitRating({ mapAnswer, result });
            if (payload.ratings.some((rate) => rate.rating === 0)) {
                return dispatch({
                    type: SET_NOTIFICATION,
                    notification: { type: 'warning', message: 'Mohon beri penilaian untuk setiap jawaban kandidat' }
                });
            }
            const res = await submitRating(payload);
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res, 'Berhasil menyimpan hasil interview kandidat') });
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    const handleOpenModal = (open) => {
        setModalAction((prev) => ({ ...prev, open }));
    };

    // effects
    useEffect(() => {
        if (id) {
            getCandidateDetail(id);
        }
    }, [id]);

    useEffect(() => {
        if (candidate && interviewId) {
            getInterview(interviewId);
            getAnswers(interviewId);
        }
    }, [candidate, interviewId]);

    useEffect(() => {
        setCurrentPredictions();
    }, [currentQuestionId]);

    if (!candidate && !interview) {
        return;
    }

    return (
        <Grid container spacing={gridSpacing} justifyContent="space-between">
            <Grid item xs={12}>
                <Card>
                    <Grid container justifyContent="space-between">
                        <Grid item xs={6}>
                            <CandidateInfo
                                name={candidate?.name}
                                email={candidate?.email}
                                position={candidate?.position}
                                result={candidate?.result}
                                pic={candidate?.pic}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CandidateReviewAction
                                rating={interview?.rating}
                                isReviewPage
                                onClickOnHold={handleClickOnHold}
                                onClickReject={handleClickReject}
                                onClickSelect={handleClickSelect}
                                cvUrl={candidate?.cv_url}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item xs={12} md={5}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item>
                                <InterviewQuestions
                                    questions={questions}
                                    selectedQuestionId={currentQuestionId}
                                    handleSelectQuestion={setCurrentQuestionId}
                                />
                            </Grid>
                            <Grid item>
                                <EmotionDetail emotion={mapAnswer?.[currentQuestionId]} />
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" spacing={3}>
                                    <Grid item xs={8}>
                                        <CandidateNotes notes={notes} interviewId={interviewId} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <RatingAnswer
                                            onChange={(_, newValue) => {
                                                setMapAnswer((prev) => ({
                                                    ...prev,
                                                    [currentQuestionId]: { ...prev[currentQuestionId], rating: newValue }
                                                }));
                                            }}
                                            mapAnswer={mapAnswer}
                                            currentQuestionId={currentQuestionId}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item>
                                <InterviewAnswer
                                    answerMap={mapAnswer}
                                    currentQuestionId={currentQuestionId}
                                    setCurrentPredictions={setCurrentPredictions}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ModalConfirm setOpen={handleOpenModal} {...modalAction} />
        </Grid>
    );
}

export default CandidateReviewPage;
