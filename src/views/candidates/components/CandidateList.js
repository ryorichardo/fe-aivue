import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { gridSpacing } from 'config/constant';
import CandidateCard from './CandidateCard';

function CandidateList({ data }) {
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((candidate) => (
                <Grid item xl={3} lg={4} md={6} xs={12} key={candidate.name}>
                    <CandidateCard
                        name={candidate.name}
                        position={candidate.position}
                        email={candidate.email}
                        status={candidate.status}
                        expiredDate={candidate.expiredDate}
                        completedDate={candidate.completedDate}
                        pic={candidate.pic}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

CandidateList.propTypes = {
    data: PropTypes.array
};

export default CandidateList;
