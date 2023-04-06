import PropTypes, { object } from 'prop-types';
import { Card, Grid, IconButton, Typography } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';

function PositionCard({ position }) {
    const { id, title, desc, level, numOfInterviews, createdAt, updatedAt, lastUpdatedBy } = position;
    const navigate = useNavigate();
    const handleClickNavigateEdit = () => {
        navigate(`${id}/edit`);
    };

    return (
        <Card>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'} alignItems="center">
                        <Grid item>
                            <Typography variant="h4">{title}</Typography>
                            <Typography variant="caption">{desc}</Typography>
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
                                    <Typography variant="caption">Level</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{level}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Jumlah tahapan interview</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{numOfInterviews} tahap</Typography>
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
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Terakhir diubah oleh</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{lastUpdatedBy}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

PositionCard.propTypes = {
    position: PropTypes.object
};

export default PositionCard;
