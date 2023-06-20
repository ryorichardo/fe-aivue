import PropTypes from 'prop-types';

import { CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';

import MainCard from 'components/cards/MainCard';
import SkeletonPopularCard from 'components/cards/Skeleton/PopularCard';
import { gridSpacing } from 'configs/constant';

import { useNavigate } from 'react-router';
import { IconExternalLink } from '@tabler/icons';

const CandidateItem = ({ data, handleClickCandidate }) => {
    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                {data?.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <IconButton color="primary" size="small" onClick={() => handleClickCandidate(data?.id)}>
                                        <IconExternalLink size={16} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" color="inherit">
                        {data?.position}
                    </Typography>
                    <Typography variant="subtitle2">{data?.active_interview?.completed_date}</Typography>
                </Grid>
            </Grid>
            <Divider sx={{ my: 1.5 }} />
        </>
    );
};
const ListWaitingForReview = ({ isLoading, data }) => {
    const navigate = useNavigate();
    const handleClickCandidate = (id) => {
        navigate(`/candidate/${id}/detail`);
    };
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Menunggu Review</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {data
                                    ? data
                                          .slice(0, Math.min(data.length, 10))
                                          .map((e) => <CandidateItem key={e?.id} data={e} handleClickCandidate={handleClickCandidate} />)
                                    : null}
                                <Typography
                                    variant="body2"
                                    align="center"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate('/candidate')}
                                >
                                    Lihat semua
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

ListWaitingForReview.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array
};

export default ListWaitingForReview;
