import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import InterviewKit from './InterviewKit';

function InterviewKitList({ data, handleDelete }) {
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((kit) => (
                <Grid item xl={3} lg={4} md={6} xs={12} key={kit.id}>
                    <InterviewKit kit={kit} handleDelete={handleDelete} />
                </Grid>
            ))}
        </Grid>
    );
}

InterviewKitList.propTypes = {
    data: PropTypes.array,
    handleDelete: PropTypes.func
};

export default InterviewKitList;
