import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { Card, Grid, Tab, Tabs, Stack } from '@mui/material';

import { getCandidateById } from 'utils/api/candidate';
import { getInterviewDetail } from 'utils/api/interview';

import { gridSpacing } from 'configs/constant';

import CandidateInfo from './components/CandidateInfo';
import CandidateReviewAction from './components/CandidateReviewAction';
import InterviewQuestions from './components/InterviewQuestions';
import CandidateNotes from './components/CandidateNotes';
import InterviewAnswer from './components/InterviewAnswer';
import InterviewList from './components/InterviewList';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
import OverallEmotion from './components/OverallEmotion';

function CandidateReviewPage() {
    const { id, interviewId } = useParams();
    const dispatch = useDispatch();
    const [candidate, setCandidate] = useState();
    const [interview, setInterview] = useState();
    const [currentQuestionId, setCurrentQuestionId] = useState();

    const [notes, setNotes] = useState([]);

    const getCandidateDetail = async (id) => {
        try {
            // TODO - add loading mechanism
            const { data } = await getCandidateById(id);
            setCandidate(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    const getInterview = async (candidateId, interviewId) => {
        try {
            const { data } = await getInterviewDetail(candidateId, interviewId);
            setInterview(data);
            setNotes(data.notes);
            setCurrentQuestionId(data.interviewKit.questions[0].id);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    useEffect(() => {
        if (id) {
            getCandidateDetail(id);
        }
    }, [id]);

    useEffect(() => {
        if (candidate && interviewId) {
            getInterview(candidate.id, interviewId);
        }
    }, [candidate, interviewId]);

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
                            <CandidateReviewAction rating={candidate.rating} isReviewPage />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item xs={5}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item>
                                <InterviewQuestions
                                    questions={interview?.interviewKit?.questions}
                                    selectedQuestionId={currentQuestionId}
                                    handleSelectQuestion={setCurrentQuestionId}
                                />
                            </Grid>
                            <Grid item>
                                <OverallEmotion />
                            </Grid>
                            <Grid item>
                                <CandidateNotes notes={notes} interviewId={interviewId} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item>
                                <InterviewAnswer interviewId={interviewId} currentQuestionId={currentQuestionId} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CandidateReviewPage;
