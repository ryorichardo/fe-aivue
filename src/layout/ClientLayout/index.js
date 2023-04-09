import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';
import ClientHeader from './Header';

const ClientWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    ...theme.typography.mainContent,
    [theme.breakpoints.up('md')]: {
        marginLeft: '20px',
        width: `calc(100%)`,
        marginRight: '20px'
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100%)`,
        padding: '16px',
        marginRight: '20px'
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100%)`,
        padding: '16px',
        marginRight: '10px'
    }
}));

const ClientLayout = () => {
    const theme = useTheme();
    return (
        <>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="relative"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.paper
                }}
            >
                <Toolbar>
                    <ClientHeader />
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex' }}>
                <ClientWrapper theme={theme}>
                    <Outlet />
                </ClientWrapper>
            </Box>
        </>
    );
};

export default ClientLayout;
