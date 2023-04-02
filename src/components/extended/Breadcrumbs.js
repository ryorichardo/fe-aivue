import { Typography, Link } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation } from 'react-router';

function Breadcrumbs() {
    const pathToBahasa = {
        dashboard: 'Dashboard',
        candidate: 'Kandidat',
        new: 'Tambah',
        edit: 'Edit',
        'interview-kit': 'Interview Kit'
    };
    const location = useLocation();

    let currentLink = '';
    const crumbs = location.pathname.split('/').filter((crumb) => crumb !== '');
    if (crumbs.length === 1) {
        return;
    }
    return (
        <MuiBreadcrumbs>
            {crumbs.map((crumb, i) => {
                currentLink += `/${crumb}`;
                return (
                    <Link underline="hover" color="inherit" href={currentLink}>
                        <Typography variant="body1" sx={{ fontWeight: i === crumbs.length - 1 ? 600 : 400 }}>
                            {pathToBahasa[crumb].charAt(0).toUpperCase() + pathToBahasa[crumb].slice(1)}
                        </Typography>
                    </Link>
                );
            })}
        </MuiBreadcrumbs>
    );
}

export default Breadcrumbs;
