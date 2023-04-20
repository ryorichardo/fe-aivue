import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import CandidateCard from './CandidateCard';

function CandidateList({ data }) {
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((candidate) => (
                <Grid item xl={3} lg={4} md={6} xs={12} key={candidate.id}>
                    <CandidateCard candidate={candidate} />
                </Grid>
            ))}
        </Grid>
    );
}

CandidateList.propTypes = {
    data: PropTypes.array
};

export default CandidateList;
