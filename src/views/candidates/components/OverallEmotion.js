import { Stack, Typography, Card, Grid } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';

const EmotionChart = () => {
    let options = {
        series: [70, 20, 10, 10],
        options: {
            labels: ['Percaya diri', 'Senang', 'Sedih', 'Marah'],
            colors: ['#546FFF'],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '30%'
                    }
                }
            }
        }
    };
    return <Chart width="100%" type="radialBar" {...options} />;
};

function OverallEmotion() {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Emosi yang Diperlihatkan</Typography>
            <Card>
                <Grid container direction="row" spacing={1} justifyContent="center">
                    <Grid item>
                        <EmotionChart />
                    </Grid>
                    <Grid item>Detail</Grid>
                </Grid>
            </Card>
        </Stack>
    );
}

export default OverallEmotion;
