import { useEffect, useState } from 'react';
import { Button, Grid, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { INTERVIEW_RESULT, INTERVIEW_STATUS, gridSpacing } from 'configs/constant';
import { deleteCandidate, getAllCandidates } from 'utils/api/candidate';
import SearchSection from 'components/Search';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
import { getAllUsers } from 'utils/api/user';
import CircularLoader from 'components/CircularLoader';
import CandidateList from './components/CandidateList';

function CandidatePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [candidates, setCandidates] = useState([]);
    const [pics, setPics] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await getCandidates();
            await getPics();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        if (refetch) {
            fetchAllData();
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
            {loading ? (
                <CircularLoader />
            ) : (
                <>
                    <Grid item xs={12} className="list-container-list-page">
                        <CandidateList data={candidates} onDelete={handleDelete} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end">
                            <Pagination count={1} color="primary" shape="rounded" />
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default CandidatePage;
