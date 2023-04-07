import PropTypes from 'prop-types';
import { Card, Grid, IconButton, Typography } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';

function InterviewKit({ kit }) {
    const { id, title, desc, numOfQuestions, duration, createdAt, updatedAt } = kit;
    const navigate = useNavigate();
    const handleClickNavigateEdit = () => {
        navigate(`${id}/edit`);
    };
    return (
        <Card>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'} alignItems="center">
                        <Grid item xs={8}>
                            <Typography variant="h4">{title}</Typography>
                        </Grid>
                        <Grid item xs={'auto'}>
                            <IconButton size="small" color="warning" sx={{ marginRight: '8px' }} onClick={handleClickNavigateEdit}>
                                <IconPencil size={18} />
                            </IconButton>
                            <IconButton size="small" color="error">
                                <IconTrash size={18} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" spacing="3">
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Jumlah Pertanyaan</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{numOfQuestions}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Durasi</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{duration} menit</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Dibuat pada</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{createdAt.toLocaleString()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Terakhir diupdate</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{updatedAt.toLocaleString()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

InterviewKit.propTypes = {
    kit: PropTypes.object
};

export default InterviewKit;
