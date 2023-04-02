import React from 'react';
import { Button, Grid, Pagination, Typography } from '@mui/material';
import { gridSpacing } from 'config/constant';
import InterviewKitList from './components/InterviewKitList';
import { getInterviewKits } from 'utils/api/interview';

function InterviewKitPage() {
    const interviewKits = getInterviewKits();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                    <Button size="large" variant="contained">
                        Tambah Interview Kit
                    </Button>
                </Grid>
            </Grid>
            {!interviewKits || interviewKits.length === 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Interview kit Anda masih kosong, tekan tombol "Tambah Interview Kit" untuk mulai tambhakan interview kit
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
