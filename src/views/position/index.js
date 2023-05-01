import { Button, Grid, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { LEVEL_OPTIONS, gridSpacing } from 'configs/constant';
import { useState, useEffect } from 'react';
import PositionList from './components/PositionList';
import { deletePosition, getAllPositions } from 'utils/api/position';
import SearchSection from 'components/Search';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';

function PositionPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [positions, setPositions] = useState([]);

    const [refetch, setRefetch] = useState(false);
    const [search, setSearch] = useState('');
    const [filterLevel, setFilterLevel] = useState('');
    const [isFilter, setIsFilter] = useState(false);

    let filterConditions = [
        {
            label: 'Level',
            value: filterLevel,
            changeHandler: (e) => setFilterLevel(e.target.value),
            options: Object.values(LEVEL_OPTIONS)
        }
    ];

    const resetFilter = () => {
        setFilterLevel('');
        setIsFilter(false);
    };

    const applyFilter = () => {
        setIsFilter(Boolean(filterLevel));
    };

    const getPositions = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAllPositions();
            setPositions(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    useEffect(() => {
        getPositions();
    }, []);

    useEffect(() => {
        if (refetch) {
            getPositions();
        }
    }, [refetch]);

    const handleClickNavigate = () => {
        navigate('/position/new');
    };

    const handleDelete = async (id) => {
        try {
            const res = await deletePosition(id);
            setRefetch(true);
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res) });
        } catch (err) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(err) });
        }
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
            <Grid item xs={12}>
                <SearchSection
                    value={search}
                    onSearch={(e) => setSearch(e.target.value)}
                    filterConditions={filterConditions}
                    isFilterActive={isFilter && Boolean(filterLevel)}
                    resetFilterHandler={resetFilter}
                    applyFilterHandler={applyFilter}
                />
            </Grid>
            {!positions || positions.length === 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Tidak ada posisi pekerjaan yang dibuka. Tekan tombol "Tambah Posisi" untuk mulai tambahkan posisi baru
                    </Typography>
                </Grid>
            ) : (
                <>
                    <Grid item xs={12} className="list-container-list-page">
                        <PositionList data={positions} handleDelete={handleDelete} />
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
