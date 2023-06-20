import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import CandidateDistributionCard from './components/CandidateDistributionCard';
import { gridSpacing } from 'configs/constant';
import ListWaitingForReviewCard from './components/ListWaitingForReviewCard';
import TotalInterviewCard from './components/TotalInterviewCard';
import GreetingCard from './components/GreetingCard';
import useDashboardPage from './hooks/useDashboardPage';
import TotalCandidateCard from './components/TotalCandidateCard';

const Dashboard = () => {
    const { isLoading, totalInterview, candidatesDistributionData, totalCandidate, needReview } = useDashboardPage();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={12} md={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12}>
                        <GreetingCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={4} md={12} sm={12} xs={12}>
                                <Grid container spacing={gridSpacing} direction="column">
                                    <Grid item>
                                        <TotalCandidateCard data={totalCandidate} isLoading={isLoading} />
                                    </Grid>
                                    <Grid item>
                                        <TotalInterviewCard data={totalInterview} isLoading={isLoading} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={4} md={12} sm={12} xs={12}>
                                <CandidateDistributionCard data={candidatesDistributionData} isLoading={isLoading} />
                            </Grid>
                            <Grid item lg={4} md={12} sm={12} xs={12}>
                                <ListWaitingForReviewCard data={needReview} isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
