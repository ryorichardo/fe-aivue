import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Stack } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import { drawerWidth } from 'configs/constant';
import LogoSection from 'layout/MainLayout/LogoSection';
import config from 'configs';

const ClientHeader = ({ handleLeftDrawerToggle, leftDrawerOpened }) => {
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
                <Box component="span" sx={{ flexGrow: 1 }}>
                    <LogoSection homePath={config.defaultClientPath} />
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
        </>
    );
};

ClientHeader.propTypes = {};

export default ClientHeader;
