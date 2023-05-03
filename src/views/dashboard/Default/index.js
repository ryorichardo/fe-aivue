import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'configs/constant';
import TopRatedCandidate from '../components/TopRatedCandidate';
import ListWaitingForReview from '../components/ListWaitingForReview';
import OngoingInterview from '../components/OngoingInterview';
import GreetingSection from '../components/GreetingSection';

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
                                <GreetingSection isLoading={isLoading} />
                            </Grid>
                            <Grid item lg={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={5} md={12} sm={12} xs={12}>
                                        <Grid container spacing={gridSpacing} direction="column">
                                            <Grid item>
                                                <TotalOrderLineChartCard isLoading={isLoading} />
                                            </Grid>
                                            <Grid item>
                                                <OngoingInterview isLoading={isLoading} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={7} md={12} sm={12} xs={12}>
                                        <TotalGrowthBarChart isLoading={isLoading} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={3} md={12} sm={12} xs={12}>
                        <TopRatedCandidate isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
