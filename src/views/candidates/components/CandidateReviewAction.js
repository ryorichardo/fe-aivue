import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { IconFile, IconShare } from '@tabler/icons';
import { gridSpacing } from 'configs/constant';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';

function ButtonInterviewResult({ onClickSelect, onClickReject, onClickOnHold }) {
    return (
        <Grid container direction="row" spacing={1}>
            <Grid item xs={12} md={4}>
                <Button size="large" variant="contained" color="error" fullWidth onClick={onClickReject}>
                    Tolak
                </Button>
            </Grid>
            <Grid item xs={12} md={4}>
                <Button size="large" variant="contained" color="warning" fullWidth onClick={onClickOnHold}>
                    Tangguhkan
                </Button>
            </Grid>
            <Grid item xs={12} md={4}>
                <Button size="large" variant="contained" color="primary" fullWidth onClick={onClickSelect}>
                    Lanjutkan
                </Button>
            </Grid>
        </Grid>
    );
}

function CandidateReviewAction({ cvUrl, rating, isReviewPage, onClickSelect, onClickReject, onClickOnHold }) {
    const dispatch = useDispatch();
    const handleCopy = () => {
        window.open(cvUrl, '_blank');
    };
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        dispatch({
            type: SET_NOTIFICATION,
            notification: {
                type: 'success',
                message: 'Link berhasil disalin di clipboard'
            }
        });
    };

    return (
        <Grid container justify="flex-end" spacing={gridSpacing}>
            <Grid item xs={12}>
                <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    {isReviewPage ? (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <StarIcon size={24} sx={{ color: '#FFB054' }} />
                            <Typography variant="body1">{rating?.toFixed(2) || 0}</Typography>
                        </Stack>
                    ) : null}

                    <Button size="small" color="secondary" variant="contained" onClick={handleCopy}>
                        <IconFile size={16} style={{ marginRight: '0.5rem' }} />
                        CV
                    </Button>
                    <Button size="small" color="secondary" variant="contained" onClick={handleShare}>
                        <IconShare size={16} style={{ marginRight: '0.5rem' }} />
                        Bagikan
                    </Button>
                </Stack>
            </Grid>
            {isReviewPage && (
                <Grid item xs={12}>
                    <Stack spacing={0.5}>
                        <Typography variant="h5">Hasil Interview</Typography>
                        <ButtonInterviewResult onClickSelect={onClickSelect} onClickReject={onClickReject} onClickOnHold={onClickOnHold} />
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
