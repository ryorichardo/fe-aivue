import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { IconFile, IconPlus, IconShare } from '@tabler/icons';
import { gridSpacing } from 'config/constant';

function CandidateReviewAction({ rating }) {
    return (
        <Grid container justify="flex-end" spacing={gridSpacing}>
            <Grid item xs={12}>
                <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <StarIcon size={24} sx={{ color: '#FFB054' }} />
                        <Typography variant="body1">{rating || 0}</Typography>
                    </Stack>
                    <Button size="small" color="secondary" variant="contained">
                        <IconFile size={16} style={{ marginRight: '0.5rem' }} />
                        CV
                    </Button>
                    <Button size="small" color="secondary" variant="contained">
                        <IconShare size={16} style={{ marginRight: '0.5rem' }} />
                        Bagikan
                    </Button>
                    <Button size="small" color="secondary" variant="contained">
                        <IconPlus size={16} style={{ marginRight: '0.5rem' }} />
                        Tambah Interview
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={0.5}>
                    <Typography variant="h5">Status</Typography>
                    <Button size="large" variant="contained">
                        Wating To Review
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}

CandidateReviewAction.propTypes = {
    rating: PropTypes.number
};

export default CandidateReviewAction;
