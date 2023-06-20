import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { Card, Grid, Tab, Tabs, Stack } from '@mui/material';

import { getCandidateById } from 'utils/api/candidate';
import { gridSpacing } from 'configs/constant';

import CandidateInfo from './components/CandidateInfo';
import CandidateReviewAction from './components/CandidateReviewAction';
import InterviewQuestions from './components/InterviewQuestions';
import InterviewAnswer from './components/InterviewAnswer';
import InterviewList from './components/InterviewList';
import { getAllInterviewsForCandidate } from 'utils/api/interview';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';

function CandidateDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [candidate, setCandidate] = useState();
    const [interviews, setInterviews] = useState();

    const getCandidateDetail = async (id) => {
        try {
            // TODO - add loading mechanism
            const { data } = await getCandidateById(id);
            setCandidate(data);
        } catch (error) {
            dispatch({
                type: SET_NOTIFICATION,
                notification: generateNotification(error)
            });
        }
    };

    const getInterviewList = async (candidateId) => {
        try {
            const { data } = await getAllInterviewsForCandidate(candidateId);
            setInterviews(data);
        } catch (error) {
            dispatch({
                type: SET_NOTIFICATION,
                notification: generateNotification(error)
            });
        }
    };

    useEffect(() => {
        if (id) {
            getCandidateDetail(id);
        }
    }, [id]);

    useEffect(() => {
        if (candidate) {
            getInterviewList(candidate.id);
        }
    }, [candidate]);

    if (!candidate) {
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
                            <CandidateReviewAction isReviewPage={false} cvUrl={candidate?.cv_url} />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item xs={6}>
                        <Stack spacing={4}>
                            <InterviewList interviews={interviews} />
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CandidateDetailPage;
