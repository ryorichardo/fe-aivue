import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Card, Chip, Grid, IconButton, Typography } from '@mui/material';
import DataTable from 'react-data-table-component';
import { IconPencil, IconTrash } from '@tabler/icons';
import { deleteUser } from 'utils/api/user';
import { useState } from 'react';
import ModalConfirm from 'components/ModalConfirm';

function UserList({ data, onDeleteUser }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();

    const handleDeleteUser = (id) => {
        setOpen(true);
        setSelected(id);
    };
    const columns = [
        {
            name: <Typography variant="h4">No.</Typography>,
            selector: (_, i) => i + 1,
            maxWidth: '32px',
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
                <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                        handleDeleteUser(row.id);
                    }}
                >
                    <IconTrash />
                </IconButton>
            ),
            sortable: true
        }
    ];

    return (
        <Card>
            <DataTable data={data} columns={columns} />
            <ModalConfirm
                open={open}
                setOpen={setOpen}
                onOk={() => onDeleteUser(selected)}
                confirmDelete
                title="Peringatan!"
                message="Apakah Anda yakin ingin menghapus user?"
            />
        </Card>
    );
}

UserList.propTypes = {
    data: PropTypes.array,
    onDeleteUser: PropTypes.func
};

export default UserList;
