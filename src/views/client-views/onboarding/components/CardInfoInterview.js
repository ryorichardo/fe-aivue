import PropTypes from 'prop-types';
import { Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';

function CardInfoInterview({ interview }) {
    const { position, num_of_questions, expiredAt, duration } = interview;
    return (
        <Card sx={{ maxWidth: 600 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h3" align="center">
                        {position || '-'}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" spacing="3">
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Jumlah Pertanyaan</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{num_of_questions}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Estimasi Durasi</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{duration} menit</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Berlaku hingga</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{expiredAt?.toLocaleString()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}

CardInfoInterview.propTypes = {
    interview: PropTypes.object
};

export default CardInfoInterview;
