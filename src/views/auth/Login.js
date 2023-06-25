import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

import AuthCardWrapper from './components/AuthCardWrapper';
import AuthLogin from './components/AuthLogin';
import Logo from 'components/Logo';
import AuthWrapper from './components/AuthWrapper';

import VidcallIllustration from 'assets/images/vidcall-illustration.svg';
import UserRecording from 'assets/images/user-recording.svg';

const Login = ({ isClient = false }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));

    return (
        <AuthWrapper>
            <Grid container direction="row" justifyContent="center" sx={{ minHeight: '100vh' }}>
                <Grid item lg={5} sx={{ display: { xs: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: 'calc(100vh)', background: theme.palette.aivue.primary400 }}
                    >
                        <Grid item xs={12} alignSelf="flex-end" sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <Typography variant={'h1'} textAlign="center" color={theme.palette.background.paper}>
                                Selamat datang di AIVue!
                            </Typography>
                        </Grid>
                        <img
                            src={isClient ? UserRecording : VidcallIllustration}
                            alt="vidcall-illustration"
                            width={matchDownXL ? '450px' : '600px'}
                        />
                        <Grid item xs={12} alignSelf="flex-start" sx={{ m: { xs: 1, sm: 3 }, mt: 0 }}>
                            <Typography variant={'h2'} textAlign="center" color={theme.palette.background.paper}>
                                {isClient
                                    ? 'Lakukan interview dengan mudah kapan saja dan dimana saja dengan AIVue!'
                                    : 'Kelola interview kandidat dengan mudah dengan AIVue!'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    {matchDownLg && (
                                                        <Typography
                                                            color={theme.palette.secondary.main}
                                                            gutterBottom
                                                            variant={matchDownSM ? 'h3' : 'h2'}
                                                        >
                                                            Hi, Selamat Datang!
                                                        </Typography>
                                                    )}

                                                    <Typography variant="caption" fontSize="16px" textAlign={'center'}>
                                                        Masukkan kredensial untuk {isClient ? 'memulai interview' : 'masuk'}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <AuthLogin isClient={isClient} />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

Login.propTypes = {
    isClient: PropTypes.bool
};
export default Login;
