import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotalOrderLineChartCard from './components/TotalOrderLineChartCard';
import CandidateDistributionCard from './components/CandidateDistributionCard';
import { gridSpacing } from 'configs/constant';
import ListWaitingForReviewCard from './components/ListWaitingForReviewCard';
import ListWaitingForReview from './components/ListWaitingForReview';
import TotalInterviewCard from './components/TotalInterviewCard';
import GreetingCard from './components/GreetingCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={9} md={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={12}>
                                <GreetingCard isLoading={isLoading} />
                            </Grid>
                            <Grid item lg={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={5} md={12} sm={12} xs={12}>
                                        <Grid container spacing={gridSpacing} direction="column">
                                            <Grid item>
                                                <TotalOrderLineChartCard isLoading={isLoading} />
                                            </Grid>
                                            <Grid item>
                                                <TotalInterviewCard isLoading={isLoading} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={7} md={12} sm={12} xs={12}>
                                        <CandidateDistributionCard isLoading={isLoading} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={3} md={12} sm={12} xs={12}>
                        <ListWaitingForReviewCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
