import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { IconFile, IconPlus, IconShare } from '@tabler/icons';
import { gridSpacing } from 'configs/constant';
import { useNavigate } from 'react-router';

function CandidateReviewAction({ cvUrl, rating, isReviewPage }) {
    const nav = useNavigate();
    const handleCopy = () => {
        window.open(cvUrl, '_blank');
    };
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleAddInterview = () => {
        nav('/candidate/new');
    };
    return (
        <Grid container justify="flex-end" spacing={gridSpacing}>
            <Grid item xs={12}>
                <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <StarIcon size={24} sx={{ color: '#FFB054' }} />
                        <Typography variant="body1">{rating || 0}</Typography>
                    </Stack>
                    <Button size="small" color="secondary" variant="contained" onClick={handleCopy}>
                        <IconFile size={16} style={{ marginRight: '0.5rem' }} />
                        CV
                    </Button>
                    <Button size="small" color="secondary" variant="contained" onClick={handleShare}>
                        <IconShare size={16} style={{ marginRight: '0.5rem' }} />
                        Bagikan
                    </Button>
                    <Button size="small" color="secondary" variant="contained" onClick={handleAddInterview}>
                        <IconPlus size={16} style={{ marginRight: '0.5rem' }} />
                        Tambah Interview
                    </Button>
                </Stack>
            </Grid>
            {isReviewPage && (
                <Grid item xs={12}>
                    <Stack spacing={0.5}>
                        <Typography variant="h5">Hasil Interview</Typography>
                        <Button size="large" variant="contained">
                            Lolos ke Interview Berikutnya
                        </Button>
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
}

CandidateReviewAction.propTypes = {
    isReviewPage: PropTypes.bool,
    rating: PropTypes.number,
    cvUrl: PropTypes.string
};

export default CandidateReviewAction;
