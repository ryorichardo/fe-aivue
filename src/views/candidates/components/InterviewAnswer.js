import PropTypes from 'prop-types';
import { Box, Button, Card, Grid, Rating, Slider } from '@mui/material';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import OverallEmotion from './OverallEmotion';

const getEmotionFromInterval = (timestamp, predictions) => {
    let result = null;
    for (let i = 0; i < predictions.length; i++) {
        let time = predictions[i].timestamp.split(':');
        let timeInSecond = parseInt(time[0]) * 60 * 60 + parseInt(time[1]) * 60 + parseInt(time[2]);
        console.log(timestamp, timeInSecond);
        if (timeInSecond <= timestamp) {
            result = predictions[i];
        } else {
            break;
        }
    }
    return result;
};
function InterviewAnswer({ answerMap, currentQuestionId, setCurrentPredictions }) {
    const [videoState, setVideoState] = useState({
        duration: 0,
        marks: [],
        playedSeconds: 0,
        played: 0
    });
    const videoAnswerRef = useRef(null);
    const playerWrapperRef = useRef(null);

    useEffect(() => {
        if (parseInt(videoState.playedSeconds) > 0 && answerMap?.[currentQuestionId]?.emotion) {
            setCurrentPredictions(getEmotionFromInterval(videoState.playedSeconds, answerMap?.[currentQuestionId]?.emotion));
        }
    }, [answerMap, videoState]);

    if (!answerMap?.[currentQuestionId]) {
        return;
    }

    const handleProgress = (changeState) => {
        setVideoState({ ...videoState, ...changeState });
    };

    return (
        <>
            <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Box className="player-wrapper" ref={playerWrapperRef}>
                            <ReactPlayer
                                className="react-player"
                                controls={true}
                                ref={videoAnswerRef}
                                url={answerMap[currentQuestionId].video_link}
                                width="100%"
                                height="100%"
                                onProgress={handleProgress}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" spacing={3} justifyContent="end">
                            <Grid item>
                                <Box></Box>
                            </Grid>
                            <Grid item>
                                <OverallEmotion emotions={answerMap?.[currentQuestionId]?.emotion} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default InterviewAnswer;
