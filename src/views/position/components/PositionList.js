import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { gridSpacing } from 'config/constant';
import PositionCard from './PositionCard';

function PositionList({ data }) {
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((pos) => (
                <Grid item xl={3} lg={4} md={6} xs={12} key={pos.id}>
                    <PositionCard position={pos} />
                </Grid>
            ))}
        </Grid>
    );
}

PositionList.propTypes = {
    data: PropTypes.array
};

export default PositionList;
