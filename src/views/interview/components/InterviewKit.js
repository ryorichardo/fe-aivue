import PropTypes from 'prop-types';
import { Card, Grid, IconButton, Typography } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ModalConfirm from 'components/ModalConfirm';

function InterviewKit({ kit, handleDelete }) {
    const { id, title, description, num_of_questions, total_duration, updated_at, created_at } = kit;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClickNavigateEdit = () => {
        navigate(`${id}/edit`);
    };

    const handleDeleteKit = () => {
        setOpen(true);
    };
    return (
        <Card>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'} alignItems="center">
                        <Grid item xs={8}>
                            <Typography variant="h4">{title}</Typography>
                        </Grid>
                        <Grid item xs={'auto'}>
                            <IconButton size="small" color="warning" sx={{ marginRight: '8px' }} onClick={handleClickNavigateEdit}>
                                <IconPencil size={18} />
                            </IconButton>
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                    handleDeleteKit();
                                }}
                            >
                                <IconTrash size={18} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" spacing="3">
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Jumlah Pertanyaan</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{num_of_questions}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Durasi</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{total_duration} menit</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Dibuat pada</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{created_at?.toLocaleString()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Terakhir diupdate</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{updated_at?.toLocaleString()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ModalConfirm
                open={open}
                setOpen={setOpen}
                onOk={() => handleDelete(id)}
                confirmDelete
                title="Peringatan!"
                message={`Apakah Anda yakin ingin menghapus interview kit ${title}?`}
            />
        </Card>
    );
}

InterviewKit.propTypes = {
    kit: PropTypes.object,
    handleDelete: PropTypes.func
};

export default InterviewKit;
