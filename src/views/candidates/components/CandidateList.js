import PropTypes from 'prop-types';
import { Button, Card, Grid, IconButton, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import CandidateStatusLabel from './CandidateStatusLabel';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ModalConfirm from 'components/ModalConfirm';
import DataTable from 'react-data-table-component';
import { IconTrash } from '@tabler/icons';
import CandidateCard from './CandidateCard';
import WindowIcon from '@mui/icons-material/Window';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { gridSpacing } from 'configs/constant';

function CandidateList({ data, onDelete }) {
    const navigate = useNavigate();
    const [view, setView] = useState('grid');
    const [selected, setSelected] = useState(null);
    const onClickReview = (id) => {
        navigate(`${id}/detail`);
    };
    const columns = [
        {
            name: <Typography variant="h4">No.</Typography>,
            maxWidth: '12px',
            selector: (_, i) => i + 1,
            sortable: true
        },
        {
            name: <Typography variant="h4">Nama</Typography>,
            selector: (row) => row.name,
            sortable: true,
            minWidth: '220px'
        },
        {
            name: <Typography variant="h4">Email</Typography>,
            selector: (row) => row.email,
            sortable: true,
            minWidth: '220px'
        },
        {
            name: <Typography variant="h4">Posisi</Typography>,
            selector: (row) => row.position,
            sortable: true,
            minWidth: '170px'
        },
        {
            name: <Typography variant="h4">Status</Typography>,
            selector: (row) => (
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {row?.active_interview?.status}
                </Typography>
            ),
            sortable: true,
            minWidth: '150px'
        },
        {
            name: <Typography variant="h4">Hasil Wawancara</Typography>,
            selector: (row) => <CandidateStatusLabel label={row.result} />,
            sortable: true,
            minWidth: '150px'
        },
        {
            name: <Typography variant="h4">Tanggal Kedaluwarsa</Typography>,
            selector: (row) => row?.active_interview?.expired_date?.toLocaleString('en-GB') || '-',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: <Typography variant="h4">Tanggal Pengumpulan</Typography>,
            selector: (row) => row?.active_interview?.completed_date?.toLocaleString('en-GB') || '-',
            sortable: true,
            minWidth: '150px'
        },
        {
            name: <Typography variant="h4">PIC</Typography>,
            selector: (row) => row.pic?.name,
            sortable: true,
            minWidth: '90px'
        },
        {
            name: <Typography variant="h4">Aksi</Typography>,
            selector: (row) => (
                <Grid container justifyContent="space-between" alignItems="center" spacing={1.5}>
                    <Grid item xs>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{ minWidth: '100%' }}
                            onClick={() => onClickReview(row.id)}
                        >
                            Review
                        </Button>
                    </Grid>
                    <Grid item>
                        <IconButton size="small" color="error" onClick={() => setSelected(row)}>
                            <IconTrash size={18} />
                        </IconButton>
                    </Grid>
                </Grid>
            ),
            sortable: true,
            minWidth: '150px'
        }
    ];

    if (!data || data?.length === 0) {
        return (
            <Grid item xs={12}>
                <Typography variant="h4">
                    Belum ada interview yang pernah dilakukan. Tekan tombol "Tambah Kandidat" untuk mulai menambahkan kandidat untuk
                    diinterview
                </Typography>
            </Grid>
        );
    }
    return (
        <>
            <div style={{ justifyContent: 'flex-end', display: 'flex', marginBottom: '16px' }}>
                <ToggleButtonGroup value={view} exclusive onChange={(_, value) => setView(value)}>
                    <ToggleButton value="grid" aria-label="left aligned" color="primary">
                        <Tooltip title="Ubah tampilan ke mode grid">
                            <WindowIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="table" aria-label="centered" color="primary">
                        <Tooltip title="Ubah tampilan ke mode tabel">
                            <TableRowsIcon />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            {view === 'grid' ? (
                <Grid container spacing={gridSpacing}>
                    {data.map((candidate) => (
                        <Grid item xl={3} lg={4} md={6} xs={12} key={candidate.id}>
                            <CandidateCard candidate={candidate} handleDelete={onDelete} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Card sx={{ marginTop: '12px' }}>
                    <DataTable data={data} columns={columns} />
                    <ModalConfirm
                        open={Boolean(selected)}
                        setOpen={setSelected}
                        onOk={() => {
                            onDelete(id);
                            setSelected(null);
                        }}
                        confirmDelete
                        title="Peringatan!"
                        message={`Apakah Anda yakin ingin mengarsipkan kandidat ${selected?.name}?`}
                    />
                </Card>
            )}
        </>
    );
}

CandidateList.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func
};

export default CandidateList;
