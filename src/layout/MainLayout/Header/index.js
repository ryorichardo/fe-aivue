import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Stack, Typography } from '@mui/material';

import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import navigation from 'layout/MainLayout/Sidebar/MenuItems';

import { IconChevronRight, IconMenu2 } from '@tabler/icons';

import { useSelector } from 'react-redux';
import menuItems from 'layout/MainLayout/Sidebar/MenuItems';
import { drawerWidth } from 'config/constant';
import Breadcrumbs from 'components/extended/Breadcrumbs';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle, leftDrawerOpened }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

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
                <Typography variant="h2">{customization.isOpen[0] ?? menuItems.items[0].id}</Typography>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func,
    leftDrawerOpened: PropTypes.bool
};

export default Header;
