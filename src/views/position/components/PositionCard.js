import PropTypes, { object } from 'prop-types';
import { Card, Grid, IconButton, Typography } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ModalConfirm from 'components/ModalConfirm';

function PositionCard({ position, handleDelete }) {
    const { id, title, desc, level, num_of_interviews, created_at, updated_at, last_updated_by } = position;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClickNavigateEdit = () => {
        navigate(`${id}/edit`);
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
                                    setOpen(true);
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
                                    <Typography variant="caption">Level</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{level}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Jumlah tahapan interview</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{num_of_interviews} tahap</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Dibuat pada</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{created_at?.toLocaleString('en-GB')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Terakhir diupdate</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{updated_at?.toLocaleString('en-GB')}</Typography>
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
                message={`Apakah Anda yakin ingin menghapus posisi ${title}?`}
            />
        </Card>
    );
}

PositionCard.propTypes = {
    position: PropTypes.object,
    handleDelete: PropTypes.func
};

export default PositionCard;
