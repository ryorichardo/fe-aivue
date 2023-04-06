import { Typography, Link, Stack } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation } from 'react-router';

function Breadcrumbs() {
    const pathToBahasa = {
        dashboard: 'Dashboard',
        candidate: 'Kandidat',
        position: 'Posisi',
        new: 'Tambah',
        edit: 'Edit',
        'interview-kit': 'Interview Kit'
    };
    const location = useLocation();

    let currentLink = '';
    let active = '';
    const crumbs = location.pathname.split('/').filter((crumb) => crumb !== '');
    if (crumbs.length === 1) {
        active = pathToBahasa[crumbs[0]];
        return (
            <Typography py={2} variant="h2">
                {active}
            </Typography>
        );
    }
    return (
        <Stack py={2}>
            <MuiBreadcrumbs>
                {crumbs.map((crumb, i) => {
                    currentLink += `/${crumb}`;
                    if (i === crumbs.length - 1) {
                        active = pathToBahasa[crumb];
                    }
                    return (
                        <Link underline="hover" color="inherit" href={currentLink}>
                            <Typography variant="body1" sx={{ fontWeight: i === crumbs.length - 1 ? 600 : 400 }}>
                                {pathToBahasa[crumb]?.charAt(0).toUpperCase() + pathToBahasa[crumb]?.slice(1) || crumb}
                            </Typography>
                        </Link>
                    );
                })}
            </MuiBreadcrumbs>
            <Typography variant="h2">{active}</Typography>
        </Stack>
    );
}

export default Breadcrumbs;
