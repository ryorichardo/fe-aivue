import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import { Card, Chip, Grid, IconButton, Typography } from '@mui/material';
import { gridSpacing } from 'configs/constant';
import DataTable from 'react-data-table-component';
import { IconPencil, IconTrash } from '@tabler/icons';

function UserList({ data }) {
    const theme = useTheme();
    const columns = [
        {
            name: <Typography variant="h4">Id</Typography>,
            selector: (row) => row.id,
            sortable: true
        },
        {
            name: <Typography variant="h4">Name</Typography>,
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: <Typography variant="h4">Email</Typography>,
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: <Typography variant="h4">Verified</Typography>,
            selector: (row) =>
                row.isVerified ? (
                    <Chip
                        variant="contained"
                        label="Verified"
                        sx={{ background: theme.palette.status.bgSelected, color: theme.palette.status.selected }}
                        size="small"
                    />
                ) : (
                    <Chip
                        variant="contained"
                        label="Not verified"
                        sx={{ background: theme.palette.status.bgRejected, color: theme.palette.status.rejected }}
                        size="small"
                    />
                ),
            sortable: true
        },
        {
            name: <Typography variant="h4">Action</Typography>,
            selector: (row) => (
                <IconButton size="small" color="error" onClick={() => console.log(row.id)}>
                    <IconTrash />
                </IconButton>
            ),
            sortable: true
        }
    ];

    return (
        <Card>
            <DataTable data={data} columns={columns} />
        </Card>
    );
}

UserList.propTypes = {
    data: PropTypes.array
};

export default UserList;
