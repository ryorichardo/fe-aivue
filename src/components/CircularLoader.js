import { Box, CircularProgress, styled } from '@mui/material';
import React from 'react';

const DisabledBackground = styled(Box)({
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
    zIndex: 1
});

function CircularLoader() {
    return (
        <>
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
            <DisabledBackground />
        </>
    );
}

export default CircularLoader;
