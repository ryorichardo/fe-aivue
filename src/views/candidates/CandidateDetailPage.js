import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { Card, Grid, Tab, Tabs } from '@mui/material';

import { getCandidateById } from 'utils/api/candidate';
import { gridSpacing } from 'config/constant';

import CandidateInfo from './components/CandidateInfo';
import CandidateReviewAction from './components/CandidateReviewAction';
import InterviewQuestions from './components/InterviewQuestions';
import CandidateNotes from './components/CandidateNotes';
import { Stack } from '@mui/system';
import InterviewAnswer from './components/InterviewAnswer';
import InterviewList from './components/InterviewList';
import { getAllInterviews } from 'utils/api/interview';

function CandidateDetailPage() {
    const { id } = useParams();
    const [candidate, setCandidate] = useState();
    const [interviews, setInterviews] = useState();
    const [notes, setNotes] = useState([]);

    const getCandidateDetail = async (id) => {
        try {
            // TODO - add loading mechanism
            const { data } = await getCandidateById(id);
            setCandidate(data);
            setNotes(data.notes);
        } catch (error) {
            // TODO: error handling here
            console.log(error);
        }
    };

    const getInterviewList = async (candidateId) => {
        try {
            const { data } = await getAllInterviews(candidateId);
            setInterviews(data);
        } catch (error) {
            // TODO: error handling here
            console.log(error);
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
                                completedDate={candidate?.completedDate}
                                pic={candidate?.pic}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CandidateReviewAction rating={candidate?.rating} isReviewPage={false} />
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
