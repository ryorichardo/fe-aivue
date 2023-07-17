import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { Card, Stack, Typography } from '@mui/material';
import { EMOTION_LABEL_MAP } from 'configs/constant';

const EmotionDetailChart = ({ data }) => {
    let categories = Object.values(EMOTION_LABEL_MAP);

    // const chartData = {
    //     options: {
    //         chart: {
    //             id: 'horizontal-bar-chart',
    //             stacked: true
    //         },
    //         plotOptions: {
    //             bar: {
    //                 borderRadius: 4,
    //                 horizontal: true
    //             }
    //         },

    //         xaxis: {
    //             categories: categories
    //         },
    //         yaxis: {
    //             min: 0,
    //             max: 1
    //         },
    //         tooltip: {
    //             y: {
    //                 formatter: function (val) {
    //                     return (val * 100).toFixed(2) + '%';
    //                 }
    //             }
    //         },
    //         dataLabels: {
    //             enabled: false
    //         },

    //         colors: ['#651fff']
    //     },
    //     series: [
    //         {
    //             name: 'Percentage',
    //             data: Object.values(data?.emotion_data ?? {})
    //         }
    //     ]
    // };

    const averageEmotions = {};

    data?.emotion?.forEach((emotion) => {
        const { emotion_data } = emotion;

        // Calculate the average for each emotional state
        Object.entries(emotion_data).forEach(([state, value]) => {
            console.log(state, value);
            if (!averageEmotions[state]) {
                averageEmotions[state] = value;
            } else {
                averageEmotions[state] += value;
            }
        });
    });

    // Divide the sum by the number of records to get the average percentage
    Object.entries(averageEmotions).forEach(([state, sum]) => {
        averageEmotions[state] = (sum * 100) / data?.emotion?.length;
    });

    console.log(averageEmotions);
    const chartData = {
        options: {
            labels: categories,
            colors: ['#FF0000', '#D5EFB3', '#E58EAC', '#005AAB', '#F4CEA5', '#6AE3C1', '#81ECF9', '#9A9DE8', '#FFB3BA']
        },
        series: Object.values(averageEmotions ?? {})
    };
    return <Chart options={chartData.options} series={chartData.series} type="pie" height={350} />;
};

function EmotionDetail({ emotion }) {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Rata-Rata Emosi yang Diperlihatkan</Typography>
            <Card>
                {/* <Typography>Pada {emotion?.timestamp}</Typography> */}
                <EmotionDetailChart data={emotion} />
            </Card>
        </Stack>
    );
}

EmotionDetail.propTypes = {
    emotion: PropTypes.any
};
export default EmotionDetail;
