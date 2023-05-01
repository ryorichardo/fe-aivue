import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Stack } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import { drawerWidth } from 'configs/constant';
import Breadcrumbs from 'components/extended/Breadcrumbs';
import ProfileSection from './ProfileSection';

const Header = ({ handleLeftDrawerToggle, leftDrawerOpened, logoutHandler }) => {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    width: leftDrawerOpened ? drawerWidth : 'auto',
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Stack sx={{ p: 2 }}>
                <Breadcrumbs />
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <ProfileSection logoutHandler={logoutHandler} />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func,
    leftDrawerOpened: PropTypes.bool,
    logoutHandler: PropTypes.func
};

export default Header;
