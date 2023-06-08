import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { Card, Stack, Typography } from '@mui/material';

const EmotionDetailChart = ({ data }) => {
    let categories = !data?.emotion_data
        ? ['angry', 'annoyed', 'bored', 'confused', 'fear', 'happy', 'neutral', 'sad', 'surprise']
        : Object.keys(data?.emotion_data);

    const chartData = {
        options: {
            chart: {
                id: 'horizontal-bar-chart',
                stacked: true
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true
                }
            },

            xaxis: {
                categories: categories
            },
            yaxis: {
                min: 0,
                max: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return (val * 100).toFixed(2) + '%';
                    }
                }
            },
            dataLabels: {
                enabled: false
            },

            colors: ['#651fff']
        },
        series: [
            {
                name: 'Percentage',
                data: Object.values(data?.emotion_data ?? {})
            }
        ]
    };

    return <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />;
};

function EmotionDetail({ emotion }) {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Emosi yang Diperlihatkan</Typography>
            <Card>
                <Typography>Pada {emotion?.timestamp}</Typography>
                <EmotionDetailChart data={emotion} />
            </Card>
        </Stack>
    );
}

EmotionDetail.propTypes = {
    emotion: PropTypes.any
};
export default EmotionDetail;
