import { Button, Grid, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { gridSpacing } from 'configs/constant';
import InterviewKitList from './components/InterviewKitList';
import { getInterviewKits } from 'utils/api/interview-kit';
import { useState, useEffect } from 'react';

function InterviewKitPage() {
    const navigate = useNavigate();
    const [interviewKits, setInterviewKits] = useState([]);

    const getAllInterviewKits = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getInterviewKits();
            setInterviewKits(data);
        } catch (error) {
            // TODO - add error handling
            console.log(error);
        }
    };

    useEffect(() => {
        getAllInterviewKits();
    }, []);

    const handleClickNavigate = () => {
        navigate('/interview-kit/new');
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                    <Button size="large" variant="contained" onClick={handleClickNavigate}>
                        Tambah Interview Kit
                    </Button>
                </Grid>
            </Grid>
            {!interviewKits || interviewKits.length === 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Interview kit Anda masih kosong, tekan tombol "Tambah Interview Kit" untuk mulai tambahkan interview kit
                    </Typography>
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <InterviewKitList data={interviewKits} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end">
                            <Pagination count={10} color="primary" shape="rounded" />
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default InterviewKitPage;
