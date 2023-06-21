import { Stack, Typography, Card } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';

const EmotionChart = ({ data }) => {
    const options = {
        chart: {
            id: 'emotion-chart',
            stacked: true,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        xaxis: {
            type: 'category',
            categories: data?.map((item) => item?.timestamp)
        },
        yaxis: {
            min: 0,
            max: 1,
            labels: {
                formatter: (value) => `${(value * 100).toFixed(2)}%`
            }
        },
        legend: {
            position: 'top'
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.8,
                opacityTo: 1
            }
        },
        dataLabels: {
            enabled: false
        },

        colors: ['#FF0000', '#D5EFB3', '#E58EAC', '#005AAB', '#F4CEA5', '#6AE3C1', '#81ECF9', '#9A9DE8', '#FFB3BA']
    };

    const series = Object.keys(data?.[0]?.emotion_data ?? {}).map((emotion) => ({
        name: emotion,
        data: data?.map((item) => item?.emotion_data?.[emotion])
    }));

    return <Chart options={options} series={series} type="area" height={350} />;
};

function OverallEmotion({ emotions }) {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Grafik Emosi</Typography>
            <Card>
                <EmotionChart data={emotions} />
            </Card>
        </Stack>
    );
}

export default OverallEmotion;
