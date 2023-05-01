import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';
import CandidateStatusLabel from './CandidateStatusLabel';

function CandidateInfo({ name, email, position, pic, result }) {
    return (
        <Grid container spacing={1.5}>
            <Grid item xs={12}>
                <Stack spacing={0.5}>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant="body2">{email}</Typography>
                </Stack>
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
                                <Typography variant="caption">Hasil</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <CandidateStatusLabel label={result} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Grid container justifyContent={'space-between'}>
                            <Grid item xs={6}>
                                <Typography variant="caption">Ditambahkan pada</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">{createdAt?.toLocaleString()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid> */}
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
            </Grid>
        </Grid>
    );
}

CandidateInfo.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    position: PropTypes.string,
    result: PropTypes.string,
    pic: PropTypes.object
};

export default CandidateInfo;
