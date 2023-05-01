import { Typography, Link, Stack } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation } from 'react-router';
import { capitalizeFirstChar, containsNumbers } from 'utils/string';

function Breadcrumbs() {
    const pathToBahasa = {
        dashboard: 'Dashboard',
        candidate: 'Kandidat',
        position: 'Posisi',
        new: 'Tambah',
        edit: 'Edit',
        'interview-kit': 'Interview Kit',
        user: 'Pengguna',
        detail: 'Detail',
        interview: 'Interview'
    };

    const pathToTitle = {
        dashboard: 'Dashboard',
        candidate: 'Kandidat',
        position: 'Posisi',
        new: 'Tambah',
        edit: 'Edit',
        'interview-kit': 'Interview Kit',
        user: 'Pengguna',
        detail: 'Detail Kandidat',
        interview: 'Review Interview'
    };

    const location = useLocation();

    let currentLink = '';
    let active = '';
    const crumbs = location.pathname.split('/').filter((crumb) => crumb !== '');
    if (crumbs.length === 1) {
        active = pathToTitle[crumbs[0]];
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
                        active = pathToTitle[crumb];
                    }
                    if (containsNumbers(crumb)) {
                        return;
                    }

                    if (crumb == 'new') {
                        if (currentLink.includes('/position')) {
                            active = 'Tambah Posisi';
                        } else if (currentLink.includes('/interview-kit')) {
                            active = 'Tambah Interview Kit';
                        } else if (currentLink.includes('/candidate')) {
                            active = 'Tambah Kandidat';
                        }
                    } else if (crumb == 'edit') {
                        if (currentLink.includes('/position')) {
                            active = 'Edit Posisi';
                        } else if (currentLink.includes('/interview-kit')) {
                            active = 'Edit Interview Kit';
                        }
                    }

                    return (
                        <Link key={currentLink} underline="hover" color="inherit" href={currentLink}>
                            <Typography variant="body1" sx={{ fontWeight: i === crumbs.length - 1 ? 600 : 400 }}>
                                {capitalizeFirstChar(pathToBahasa[crumb]) || capitalizeFirstChar(crumb)}
                            </Typography>
                        </Link>
                    );
                })}
            </MuiBreadcrumbs>
            <Typography variant="h2">{active || 'Dashboard'}</Typography>
        </Stack>
    );
}

export default Breadcrumbs;
