import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { gridSpacing } from 'config/constant';
import InterviewKit from './InterviewKit';

function InterviewKitList({ data }) {
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((kit) => (
                <Grid item xl={3} lg={4} md={6} xs={12} key={kit.id}>
                    <InterviewKit kit={kit} />
                </Grid>
            ))}
        </Grid>
    );
}

InterviewKitList.propTypes = {
    data: PropTypes.array
};

export default InterviewKitList;
