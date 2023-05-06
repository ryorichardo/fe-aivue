import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

function EmotionDetail({ emotion }) {
    if (!emotion) {
        return;
    }

    return (
        <>
            <Typography>Pada {emotion.timestamp}</Typography>
            {emotion?.labels?.map((e, i) => (
                <>
                    <Typography key={i}>{`Angry : ${e.Angry}`}</Typography>
                </>
            ))}
        </>
    );
}

EmotionDetail.propTypes = {
    emotion: PropTypes.any
};
export default EmotionDetail;
