import PropTypes from 'prop-types';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import { IconAlarm } from '@tabler/icons';
import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { CAMERA_STATUS } from '../constant';

function AnswerRecorder({ question, onSubmit, recordWebcam, isUploaded }) {
    if (!recordWebcam) {
        return;
    }

    const { duration } = question;

    const handleStartRecord = () => {
        recordWebcam.start();
    };

    const handleStopRecord = () => {
        recordWebcam.stop();
    };

    const handleRetake = () => {
        recordWebcam.retake();
    };

    const renderControlButton = (status) => {
        if (status === CAMERA_STATUS.OPEN && status !== CAMERA_STATUS.RECORDING) {
            return (
                <Button size="large" variant="contained" onClick={handleStartRecord}>
                    Mulai rekam
                </Button>
            );
        }
        if (status === CAMERA_STATUS.RECORDING) {
            return (
                <Button size="large" variant="contained" color="error" onClick={handleStopRecord}>
                    Berhenti rekam
                </Button>
            );
        }
        if (status === CAMERA_STATUS.PREVIEW) {
            return (
                <Stack spacing={2} direction="row">
                    <Button size="large" variant="outlined" onClick={handleRetake}>
                        Rekam ulang
                    </Button>
                    <Button size="large" variant="contained" onClick={onSubmit}>
                        Submit
                    </Button>
                </Stack>
            );
        }
    };

    const CountdownTimer = ({ minutes, seconds }) => {
        return (
            <Card color="error">
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <IconAlarm />
                    <Typography variant="h2">
                        {zeroPad(minutes)}:{zeroPad(seconds)}
                    </Typography>
                </Stack>
            </Card>
        );
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        {recordWebcam.status === CAMERA_STATUS.RECORDING && (
                            <Countdown
                                date={Date.now() + parseInt(duration) * 1000 * 60}
                                onComplete={() => handleStopRecord()}
                                zeroPadTime={2}
                                renderer={CountdownTimer}
                            />
                        )}
                        <Card
                            color="error"
                            sx={{
                                visibility: 'hidden',
                                display: recordWebcam.status === CAMERA_STATUS.RECORDING ? 'none' : 'block'
                            }}
                        >
                            <Stack direction="row" justifyContent="center">
                                <IconAlarm />
                                <Typography variant="h2">00:02</Typography>
                            </Stack>
                        </Card>
                    </Grid>
                    {!isUploaded ? <Grid item>{renderControlButton(recordWebcam.status)}</Grid> : null}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <video
                    ref={recordWebcam.webcamRef}
                    style={{
                        display: `${
                            recordWebcam.status === CAMERA_STATUS.OPEN || recordWebcam.status === CAMERA_STATUS.RECORDING ? 'flex' : 'none'
                        }`
                    }}
                    width="100%"
                    heigh="auto"
                    autoPlay
                    muted
                />
                <video
                    ref={recordWebcam.previewRef}
                    style={{
                        display: `${recordWebcam.status === CAMERA_STATUS.PREVIEW ? 'flex' : 'none'}`
                    }}
                    controls
                    width="100%"
                    heigh="auto"
                >
                    <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
                </video>
            </Grid>
        </Grid>
    );
}

AnswerRecorder.propTypes = {
    question: PropTypes.object,
    onSubmit: PropTypes.func,
    recordWebcam: PropTypes.any,
    isUploaded: PropTypes.bool
};
export default AnswerRecorder;
