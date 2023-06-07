import PropTypes, { object } from 'prop-types';
import { Card, Grid, IconButton, Typography } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router';
import CandidateStatusLabel from './CandidateStatusLabel';

function InterviewCard({ interview }) {
    const { id, interview_kit, completed_at, expired_at, is_completed, status } = interview;

    const navigate = useNavigate();
    const handleClickNavigateReview = () => {
        navigate(`${id}/interview`);
    };

    return (
        <Card
            sx={{ border: '1px solid #8E92BC', cursor: is_completed ? 'pointer' : 'none', pointerEvents: is_completed ? 'click' : 'none' }}
            onClick={handleClickNavigateReview}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'} alignItems="center">
                        <Grid item>
                            <Typography variant="h4">{interview_kit.title}</Typography>
                            <Typography variant="caption">{interview_kit.desc}</Typography>
                        </Grid>
                        {/* <Grid item xs={'auto'}>
                            {is_completed && (
                                <IconButton color="primary" onClick={handleClickNavigateReview}>
                                    <PlayArrowIcon sx={{ width: '40px', height: 'auto' }} />
                                </IconButton>
                            )}
                        </Grid> */}
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
                                    <Typography variant="caption">{is_completed ? 'Diselesaikan pada' : 'Kedaluwarsa pada'}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">
                                        {is_completed ? completed_at.toLocaleString('en-GB') : expired_at.toLocaleString('en-GB')}
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
