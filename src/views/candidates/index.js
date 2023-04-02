import { Button, Grid, Pagination, Typography } from '@mui/material';
import { gridSpacing } from 'config/constant';
import CandidateList from './components/CandidateList';
import { getAllCandidates } from 'utils/api/candidate';

function CandidatePage() {
    const candidates = getAllCandidates();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                    <Button size="large" variant="contained">
                        Tambah Kandidat
                    </Button>
                </Grid>
            </Grid>
            {!candidates || candidates.length === 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Belum ada interview yang pernah dilakukan. Tekan tombol "Tambah Kandidat" untuk mulai menambahkan kandidat untuk
                        diinterview
                    </Typography>
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <CandidateList data={candidates} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end">
                            <Pagination count={10} color="primary" shape="rounded" />
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default CandidatePage;
