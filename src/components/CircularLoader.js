import PropTypes from 'prop-types';
import { Box, CircularProgress, styled } from '@mui/material';
import React from 'react';

const DisabledBackground = styled(Box)({
    position: 'fixed',
    width: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#ffffffb3',
    zIndex: 1
});

function CircularLoader({ disabledBg = false }) {
    return (
        <>
            {disabledBg ? <DisabledBackground /> : null}
            <CircularProgress
                size={70}
                sx={{
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                }}
            />
        </>
    );
}

CircularLoader.propTypes = {
    disabledBg: PropTypes.bool
};

export default CircularLoader;
