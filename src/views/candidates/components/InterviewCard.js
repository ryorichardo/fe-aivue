import PropTypes, { object } from 'prop-types';
import { Card, Grid, IconButton, Typography } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router';
import CandidateStatusLabel from './CandidateStatusLabel';

function InterviewCard({ interview }) {
    const { id, interviewKit, completedAt, expiredAt, isCompleted, status } = interview;

    const navigate = useNavigate();
    const handleClickNavigateReview = () => {
        navigate(`${id}`);
    };

    return (
        <Card sx={{ border: '1px solid #8E92BC' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'} alignItems="center">
                        <Grid item xs={8}>
                            <Typography variant="h4">{interviewKit.title}</Typography>
                            <Typography variant="caption">{interviewKit.desc}</Typography>
                        </Grid>
                        <Grid item xs={'auto'}>
                            {isCompleted && (
                                <IconButton color="primary" onClick={handleClickNavigateReview}>
                                    <PlayArrowIcon sx={{ width: '40px', height: 'auto' }} />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" spacing="3">
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Status</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <CandidateStatusLabel label={status} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">{isCompleted ? 'Diselesaikan pada' : 'Kedaluwarsa pada'}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {isCompleted ? completedAt.toLocaleString() : expiredAt.toLocaleString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

InterviewCard.propTypes = {
    interview: PropTypes.object
};

export default InterviewCard;
