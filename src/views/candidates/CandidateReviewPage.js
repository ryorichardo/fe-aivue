import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { Card, Grid } from '@mui/material';

import { getCandidateById } from 'utils/api/candidate';
import { gridSpacing } from 'config/constant';

import CandidateInfo from './components/CandidateInfo';
import CandidateReviewAction from './components/CandidateReviewAction';
import InterviewQuestions from './components/InterviewQuestions';
import CandidateNotes from './components/CandidateNotes';
import { Stack } from '@mui/system';
import InterviewAnswer from './components/InterviewAnswer';

function CandidateReviewPage() {
    const { id } = useParams();
    const [candidate, setCandidate] = useState();
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
    useEffect(() => {
        if (id) {
            getCandidateDetail(id);
        }
    }, [id]);

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
                            <CandidateReviewAction
                                name={candidate?.name}
                                email={candidate?.email}
                                position={candidate?.position}
                                completedDate={candidate?.completedDate}
                                pic={candidate?.pic}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item xs={5}>
                        <Stack spacing={4}>
                            <InterviewQuestions />
                            <CandidateNotes notes={notes} />
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <InterviewAnswer />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CandidateReviewPage;
