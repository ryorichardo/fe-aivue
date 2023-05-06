import PropTypes from 'prop-types';
import { Box, Button, Card, Grid, Rating, Slider } from '@mui/material';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAnswerForQuestion } from 'utils/api/interview';
import { useRef } from 'react';
import EmotionDetail from './EmotionDetail';
import { predictions } from 'utils/api/answer';
import { useLayoutEffect } from 'react';

const generateMark = (predictions, duration) => {
    return predictions.map((p) => {
        const sliderValue = parseFloat(p.timestamp / duration) * 100;
        return { value: sliderValue, label: '' };
    });
};

const getEmotionFromInterval = (timestamp, duration, predictions) => {
    let result = null;
    for (let i = 0; i < predictions.length; i++) {
        if (predictions[i].timestamp <= timestamp) {
            result = predictions[i];
        } else {
            break;
        }
    }
    return result;
};
function InterviewAnswer({ interviewId, currentQuestionId }) {
    const [currentAnswer, setCurrentAnswer] = useState();
    const [answerRate, setAnswerRate] = useState(0);
    const [currentPredictions, setCurrentPredictions] = useState();
    const [videoState, setVideoState] = useState({
        duration: 0,
        marks: [],
        playedSeconds: 0,
        played: 0
    });
    const videoAnswerRef = useRef(null);
    const playerWrapperRef = useRef(null);
    const [height, setHeight] = useState(0);

    const getInterviewAnswerForQuestion = async (interviewId, currentQuestionId) => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAnswerForQuestion(interviewId, currentQuestionId);
            setCurrentAnswer(data);
        } catch (error) {
            // TODO: error handling here
            console.log(error);
        }
    };
    useEffect(() => {
        if (currentQuestionId) {
            getInterviewAnswerForQuestion(interviewId, currentQuestionId);
        }
    }, [currentQuestionId]);

    //TODO Emotion Prediction API call
    useEffect(() => {
        //TODO- change duration to duration from api call
        setVideoState({ ...videoState, duration: 596.474195, marks: generateMark(predictions, 596.474195) });
    }, []);

    useEffect(() => {
        if (videoState.duration !== 0) {
            setCurrentPredictions(getEmotionFromInterval(videoState.playedSeconds, videoState.duration, predictions));
        }
    }, [videoState]);

    useLayoutEffect(() => {
        if (playerWrapperRef.current) {
            console.log(playerWrapperRef);

            setHeight(playerWrapperRef.current.clientHeight);
        }
    }, [playerWrapperRef.current]);

    if (!currentAnswer) {
        return;
    }

    const handleSeekChange = (e, newValue) => {
        setVideoState({ ...videoState, played: parseFloat(newValue / 100) });
    };

    const handleSeekMouseDown = (e) => {
        setVideoState({ ...videoState, seeking: true });
    };

    const handleSeekMouseUp = (e, newValue) => {
        setVideoState({ ...videoState, seeking: false });
        videoAnswerRef.current.seekTo(newValue / 100, 'fraction');
    };

    const handleProgress = (changeState) => {
        setVideoState({ ...videoState, ...changeState });
    };

    return (
        <>
            <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                    <Box className="player-wrapper" ref={playerWrapperRef}>
                        <ReactPlayer
                            className="react-player"
                            controls={true}
                            ref={videoAnswerRef}
                            url={currentAnswer.videoUrl}
                            width="100%"
                            height="100%"
                            onProgress={handleProgress}
                        />
                    </Box>
                </Grid>
                {height !== 0 && (
                    <Grid item xs={12} sx={{ position: 'relative', top: height }}>
                        <Grid container direction="column" spacing={3}>
                            {/* <Grid item>
                            <Slider
                                min={0}
                                max={100}
                                aria-label="video-slider-emotion"
                                value={videoState.played * 100}
                                onChange={handleSeekChange}
                                onMouseDown={handleSeekMouseDown}
                                onChangeCommitted={handleSeekMouseUp}
                                valueLabelDisplay="auto"
                                marks={videoState.marks}
                            />
                        </Grid> */}
                            <Grid item>
                                <EmotionDetail emotion={currentPredictions} />
                            </Grid>
                            <Grid item>
                                <Rating
                                    size="large"
                                    value={answerRate}
                                    onChange={(event, newRating) => {
                                        setAnswerRate(newRating);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    );
}

InterviewAnswer.propTypes = {
    currentQuestionId: PropTypes.string,
    interviewId: PropTypes.string
};

export default InterviewAnswer;
