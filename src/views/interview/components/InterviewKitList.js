import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { gridSpacing } from 'config/constant';
import InterviewKit from './InterviewKit';

function InterviewKitList({ data }) {
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((kit) => (
                <Grid item xl={3} lg={4} md={6} xs={12}>
                    <InterviewKit
                        id={kit.id}
                        title={kit.position}
                        numOfQuestions={kit.numOfQuestions}
                        duration={kit.duration}
                        createdAt={kit.createdAt}
                        updatedAt={kit.updatedAt}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

InterviewKitList.propTypes = {
    data: PropTypes.array
};

export default InterviewKitList;
