import { Grid } from '@mui/material';
import ReactPlayer from 'react-player';

function InterviewAnswer() {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <ReactPlayer url="https://www.youtube.com/watch?v=lJKF7crSpk4&ab_channel=SuffianAnwar" width="auto" />
            </Grid>
        </Grid>
    );
}

export default InterviewAnswer;
