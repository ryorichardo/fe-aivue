import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import PositionCard from './PositionCard';

function PositionList({ data, handleDelete }) {
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((pos) => (
                <Grid item xl={3} lg={4} md={6} xs={12} key={pos.id}>
                    <PositionCard position={pos} handleDelete={handleDelete} />
                </Grid>
            ))}
        </Grid>
    );
}

PositionList.propTypes = {
    data: PropTypes.array,
    handleDelete: PropTypes.func
};

export default PositionList;
