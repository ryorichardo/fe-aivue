import PropTypes from 'prop-types';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import { IconAlarm } from '@tabler/icons';
import React from 'react';
import { useEffect } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useRecordWebcam } from 'react-record-webcam';

const OPTIONS = {
    fileName: 'test-filename',
    mimeType: 'video/x-matroska;codecs=avc1',
    width: 1920,
    height: 1080,
    disableLogs: true
};

const CAMERA_STATUS = {
    INIT: 'INIT',
    CLOSED: 'CLOSED',
    OPEN: 'OPEN',
    RECORDING: 'RECORDING',
    PREVIEW: 'PREVIEW',
    ERROR: 'ERROR'
};

function AnswerRecorder({ question, setVideoFile, onSubmit }) {
    const { duration } = question;
    const recordWebcam = useRecordWebcam(OPTIONS);

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
                    <Button size="large" variant="contained" onClick={getRecordingFileHooks}>
                        Submit
                    </Button>
                </Stack>
            );
        }
    };

    const getRecordingFileHooks = async () => {
        const blob = await recordWebcam.getRecording();
        setVideoFile(new File([blob], 'test.mp4', { type: blob.type }));
        onSubmit();
    };

    useEffect(() => {
        if (recordWebcam) {
            recordWebcam.open();
        }
    }, []);

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
                            sx={{ visibility: 'hidden', display: recordWebcam.status === CAMERA_STATUS.RECORDING ? 'none' : 'block' }}
                        >
                            <Stack direction="row" justifyContent="center">
                                <IconAlarm />
                                <Typography variant="h2">00:02</Typography>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid item>{renderControlButton(recordWebcam.status)}</Grid>
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
    question: PropTypes.object
};
export default AnswerRecorder;
