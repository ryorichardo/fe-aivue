import { Card, Rating, Slider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';

function RatingAnswer({ onChange, currentQuestionId, mapAnswer }) {
    const [val, setVal] = useState(0);
    // const marks = [
    //     {
    //         value: 0,
    //         label: '0'
    //     },
    //     {
    //         value: 1,
    //         label: '1'
    //     },
    //     {
    //         value: 2,
    //         label: '2'
    //     },
    //     {
    //         value: 3,
    //         label: '3'
    //     },
    //     {
    //         value: 4,
    //         label: '4'
    //     },
    //     {
    //         value: 5,
    //         label: '5'
    //     }
    // ];

    React.useEffect(() => {
        setVal(mapAnswer?.[currentQuestionId]?.rating);
    }, [currentQuestionId]);

    const handleChange = (_, val) => {
        setVal(val);
        onChange(undefined, val);
    };

    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Nilai Jawaban</Typography>
            <Card>
                <Rating value={val} onChange={handleChange} size="large" />
                {/* <Slider min={0} max={5} value={val} step={null} valueLabelDisplay="auto" marks={marks} onChangeCommitted={handleChange} /> */}
            </Card>
        </Stack>
    );
}

export default RatingAnswer;
