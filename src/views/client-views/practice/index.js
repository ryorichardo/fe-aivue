import { Grid } from '@mui/material';
import QuestionCard from './components/QuestionCard';
import { gridSpacing } from 'configs/constant';
import AnswerRecorder from './components/AnswerRecorder';

function PracticePage() {
    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={4}>
                <QuestionCard
                    currentQuestion={{ question: 'Perkenalkan dirimu dalam Bahasa Inggris', duration: 3 }}
                    numOfQuestion={3}
                    currentQuestionNumber={1}
                />
            </Grid>
            <Grid item xs={8}>
                <AnswerRecorder question={{ question: 'Perkenalkan dirimu dalam Bahasa Inggris', duration: 3 }} />
            </Grid>
        </Grid>
    );
}

export default PracticePage;
