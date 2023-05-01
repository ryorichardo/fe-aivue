import PropTypes from 'prop-types';
import { Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import { IconTrash } from '@tabler/icons';
import StarIcon from '@mui/icons-material/Star';
import CandidateStatusLabel from './CandidateStatusLabel';
import { INTERVIEW_STATUS } from 'configs/constant';
import { useNavigate } from 'react-router';

function CandidateCard({ candidate }) {
    const { id, name, email, position, pic, rating, result } = candidate;
    const { expired_date, completed_date, status } = candidate?.active_interview;
    const navigate = useNavigate();

    //TODO - debug purposes REMOVE TRUE
    const isInterviewCompleted = true;

    const onClickReview = () => {
        navigate(`${id}/detail`);
    };
    return (
        <Card>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'} alignItems="center">
                        <Grid item>
                            <Stack>
                                <Typography variant="h4">{name}</Typography>
                                <Typography variant="caption">{email}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={'auto'}>
                            {status === INTERVIEW_STATUS.EXPIRED ? (
                                <IconButton size="small" color="error">
                                    <IconTrash size={18} />
                                </IconButton>
                            ) : (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <StarIcon size={24} sx={{ color: '#FFB054' }} />
                                    <Typography variant="body1">{rating || 0}</Typography>
                                </Stack>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" spacing="3">
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Posisi dilamar</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{position}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Status</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                        {status}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Berlaku hingga</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{expired_date?.toLocaleString() || '-'}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Diselesaikan pada</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{completed_date ? completed_date.toLocaleString() : '-'}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">PIC</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{pic.name}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent={'space-between'}>
                            <Grid item xs={6}>
                                <Typography variant="caption">Hasil interview</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <CandidateStatusLabel label={result} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {isInterviewCompleted && (
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center" spacing={1.5}>
                            <Grid item xs>
                                <Button size="small" variant="contained" color="secondary" sx={{ width: '100%' }} onClick={onClickReview}>
                                    Review
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton size="small" color="error">
                                    <IconTrash size={18} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
}

CandidateCard.propTypes = {
    candidate: PropTypes.object
};

export default CandidateCard;
