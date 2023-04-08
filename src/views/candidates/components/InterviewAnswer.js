import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAnswerForQuestion } from 'utils/api/interview';

function InterviewAnswer({ interviewId, currentQuestionId }) {
    const [currentAnswer, setCurrentAnswer] = useState();

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

    if (!currentAnswer) {
        return;
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box className="player-wrapper">
                    <ReactPlayer url={currentAnswer.videoUrl} className="react-player" width="100%" height="100%" />
                </Box>
            </Grid>
        </Grid>
    );
}

InterviewAnswer.propTypes = {
    currentQuestionId: PropTypes.string,
    interviewId: PropTypes.string
};

export default InterviewAnswer;
