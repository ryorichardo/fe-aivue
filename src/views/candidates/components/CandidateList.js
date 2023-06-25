import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import CandidateCard from './CandidateCard';

function CandidateList({ data, onDelete }) {
    if (!data || data?.length === 0) {
        return (
            <Grid item xs={12}>
                <Typography variant="h4">
                    Belum ada interview yang pernah dilakukan. Tekan tombol "Tambah Kandidat" untuk mulai menambahkan kandidat untuk
                    diinterview
                </Typography>
            </Grid>
        );
    }
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((candidate) => (
                <Grid item xl={3} lg={4} md={6} xs={12} key={candidate.id}>
                    <CandidateCard candidate={candidate} handleDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    );
}

CandidateList.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func
};

export default CandidateList;
