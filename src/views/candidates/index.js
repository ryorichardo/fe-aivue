import { useEffect, useState } from 'react';
import { Button, Grid, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { INTERVIEW_RESULT, INTERVIEW_STATUS, gridSpacing } from 'configs/constant';
import CandidateList from './components/CandidateList';
import { deleteCandidate, getAllCandidates } from 'utils/api/candidate';
import SearchSection from 'components/Search';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
import { getAllUsers } from 'utils/api/user';

function CandidatePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [candidates, setCandidates] = useState([]);
    const [pics, setPics] = useState([]);

    const [refetch, setRefetch] = useState(false);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterResult, setFilterResult] = useState('');
    const [filterPIC, setFilterPIC] = useState('');
    const [isFilter, setIsFilter] = useState(false);

    let filterConditions = [
        {
            label: 'Status',
            value: filterStatus,
            changeHandler: (e) => setFilterStatus(e.target.value),
            options: Object.values(INTERVIEW_STATUS)
        },
        {
            label: 'Hasil Interview',
            value: filterResult,
            changeHandler: (e) => setFilterResult(e.target.value),
            options: Object.values(INTERVIEW_RESULT)
        },
        {
            label: 'PIC',
            value: filterPIC,
            changeHandler: (e) => setFilterPIC(e.target.value),
            options: pics.map((pic) => pic.name)
        }
    ];

    const resetFilter = () => {
        setFilterStatus('');
        setFilterPIC('');
        setFilterResult('');
        setIsFilter(false);
        setRefetch(true);
    };

    const applyFilter = () => {
        setRefetch(true);
    };

    const getCandidates = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAllCandidates();

            // TODO- have proper filter mechanism
            setIsFilter(Boolean(filterPIC || filterResult || filterStatus));
            let newList = data;
            if (filterStatus) {
                newList = data.filter((c) => c.active_interview.status === filterStatus);
            }
            if (filterPIC) {
                newList = data.filter((c) => c.pic.name === filterPIC);
            }
            if (filterResult) {
                newList = data.filter((c) => c.result === filterResult);
            }
            setCandidates(newList);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    const getPics = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAllUsers();
            setPics(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteCandidate(id);
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res, 'Berhasil menghapus kandidat') });
            setRefetch(true);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    useEffect(() => {
        getCandidates();
        getPics();
    }, []);

    useEffect(() => {
        if (refetch) {
            getCandidates();
        }
        return () => {
            setRefetch(false);
        };
    }, [refetch]);

    const handleClickNavigate = () => {
        navigate('/candidate/new');
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                    <Button size="large" variant="contained" onClick={handleClickNavigate}>
                        Tambah Kandidat
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <SearchSection
                    value={search}
                    onSearch={(e) => setSearch(e.target.value)}
                    filterConditions={filterConditions}
                    isFilterActive={isFilter && Boolean(filterPIC || filterResult || filterStatus)}
                    resetFilterHandler={resetFilter}
                    applyFilterHandler={applyFilter}
                />
            </Grid>
            {!candidates || candidates.length === 0 ? (
                <Grid item xs={12}>
                    <Typography variant="h4">
                        Belum ada interview yang pernah dilakukan. Tekan tombol "Tambah Kandidat" untuk mulai menambahkan kandidat untuk
                        diinterview
                    </Typography>
                </Grid>
            ) : (
                <>
                    <Grid item xs={12} className="list-container-list-page">
                        <CandidateList data={candidates} onDelete={handleDelete} />
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

export default CandidatePage;
