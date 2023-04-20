import { Button, Grid, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { gridSpacing } from 'configs/constant';
import { useState, useEffect } from 'react';
import PositionList from './components/PositionList';
import { getAllPositions } from 'utils/api/position';

function PositionPage() {
    const navigate = useNavigate();
    const [positions, setPositions] = useState([]);

    const getPositions = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAllPositions();
            setPositions(data);
        } catch (error) {
            // TODO - add error handling
            console.log(error);
        }
    };

    useEffect(() => {
        getPositions();
    }, []);

    const handleClickNavigate = () => {
        navigate('/position/new');
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                    <Button size="large" variant="contained" onClick={handleClickNavigate}>
                        Tambah Posisi
                    </Button>
                </Grid>
            </Grid>
            {!positions || positions.length === 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Tidak ada posisi pekerjaan yang dibuka. Tekan tombol "Tambah Posisi" untuk mulai tambahkan posisi baru
                    </Typography>
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <PositionList data={positions} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end">
                            <Pagination count={10} color="primary" shape="rounded" />
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default PositionPage;
