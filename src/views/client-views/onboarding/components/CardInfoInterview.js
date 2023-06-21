import PropTypes from 'prop-types';
import { Card, Grid, Typography } from '@mui/material';
import React from 'react';

function CardInfoInterview({ interview }) {
    const { expired_at } = interview;
    const { num_of_questions, total_duration, description, title } = interview.interview_kit;

    return (
        <Card sx={{ width: '100%' }}>
            <Grid container justifyContent="center" alignItems="center" spacing={4} direction="column">
                <Grid item width="100%">
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="h3" align="center">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" align="center">
                                {description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item width="100%">
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
                                    <Typography variant="body2">{total_duration} menit</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Berlaku hingga</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{expired_at?.toLocaleString('en-GB')}</Typography>
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
