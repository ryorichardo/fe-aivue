import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'components/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'components/cards/MainCard';
import { gridSpacing } from 'configs/constant';

// chart data
import chartData from '../data/ongoing-interview';
import TotalInterviewCard from 'components/cards/Skeleton/TotalInterviewCard';

const TotalInterview = ({ isLoading, data }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <TotalInterviewCard />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing} alignItems="center">
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Interview Berlangsung</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" spacing={1}>
                                                <Grid item>
                                                    <Typography variant="h3">{data?.completed}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1">/ {data?.total}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart
                                height={420}
                                width="100%"
                                {...{
                                    ...chartData,
                                    series: [data?.completed, data?.ongoing, data?.expired]
                                }}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalInterview.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalInterview;
