import { useState } from 'react';

import { Box, Button, Grid } from '@mui/material';

import CardInfoInterview from './components/CardInfoInterview';
import { useParams } from 'react-router';
import { getInterviewKitById } from 'utils/api/interview-kit';
import { useEffect } from 'react';

function OnboardingPage() {
    const { id } = useParams();
    const [interview, setInterview] = useState({
        id: '1',
        title: 'General HR Interview',
        desc: 'Posisi software enginer nih bos senggol dong',
        num_of_questions: 3,
        total_duration: 15,
        position: 'Software Engineer I',
        expiredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: [
            { id: '1', question: 'Siapa Tuhanmu?', duration: 5 },
            { id: '2', question: 'Siapa Nabimu?', duration: 5 },
            { id: '3', question: 'Apa Kitabmu?', duration: 5 }
        ]
    });

    const getInterviewDetail = async (id) => {
        try {
            const { data } = getInterviewKitById(id);
            setInterview(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getInterviewDetail(id);
        }
    }, []);

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
                    <CardInfoInterview interview={interview} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                        <Button variant="contained" color="primary">
                            Latihan Interview
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary">
                            Mulai Interview
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default OnboardingPage;
