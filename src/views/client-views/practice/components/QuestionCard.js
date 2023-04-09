import PropTypes from 'prop-types';
import { Card, Grid, IconButton, Typography, Stack } from '@mui/material';
import { IconAlarm, IconPencil, IconTrash } from '@tabler/icons';

function QuestionCard({ currentQuestion, currentQuestionNumber, numOfQuestion }) {
    const { question, duration } = currentQuestion;

    return (
        <Card>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4">{`Pertanyaan ke-${currentQuestionNumber} dari ${numOfQuestion}`}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h2">{question}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={1} alignItems="center">
                                <Grid item>
                                    <Stack spacing={1.5} direction="row" alignItems="center">
                                        <IconAlarm size={18} />
                                        <Typography variant="caption">Durasi menjawab</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">{`${duration} menit`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

QuestionCard.propTypes = {
    currentQuestion: PropTypes.object,
    currentQuestionNumber: PropTypes.number,
    numOfQuestion: PropTypes.number
};

export default QuestionCard;
