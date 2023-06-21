import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Header from './Header';
import Sidebar from './Sidebar';
import { USER_ROLE, drawerWidth } from 'configs/constant';
import { SET_MENU } from 'store/actions';
import { logout } from 'utils/api/auth';
import Notification from 'components/Notification';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`,
            paddingLeft: '100px'
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const user = useSelector((state) => state.global.user);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    const handleLogout = async () => {
        try {
            await logout().then((res) => {
                if (res.status == 200) {
                    //TODO- handle logout
                    // localStorage.removeItem('token');
                    nav('/login');
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="relative"
                color="transparent"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header
                        handleLeftDrawerToggle={handleLeftDrawerToggle}
                        leftDrawerOpened={leftDrawerOpened}
                        logoutHandler={handleLogout}
                        user={user}
                    />
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex' }}>
                {/* drawer */}
                <Sidebar
                    drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
                    drawerToggle={handleLeftDrawerToggle}
                    isSuperAdmin={user.role == USER_ROLE.SUPERADMIN}
                />

                {/* main content */}
                <Main theme={theme} open={leftDrawerOpened}>
                    <Outlet />
                </Main>
            </Box>
            <Notification />
        </>
    );
};

export default MainLayout;
