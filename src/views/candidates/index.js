import { useEffect, useState } from 'react';
import { Button, Grid, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { INTERVIEW_RESULT, INTERVIEW_STATUS, gridSpacing } from 'configs/constant';
import CandidateList from './components/CandidateList';
import { getAllCandidates } from 'utils/api/candidate';
import SearchSection from 'components/Search';

function CandidatePage() {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);

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
            options: Object.values(INTERVIEW_RESULT)
        }
    ];

    const resetFilter = () => {
        setFilterStatus('');
        setFilterPIC('');
        setFilterResult('');
        setIsFilter(false);
    };

    const applyFilter = () => {
        setIsFilter(Boolean(filterPIC || filterResult || filterStatus));
        // TODO- have proper filter mechanism
        setCandidates((prevList) => {
            let newList = prevList;
            if (filterStatus) {
                newList = prevList.filter((c) => c.status === filterStatus);
            }
            if (filterPIC) {
                newList = prevList.filter((c) => c.pic.name === filterPIC);
            }
            if (filterResult) {
                newList = prevList.filter((c) => c.result === filterResult);
            }
            return newList;
        });
    };

    const getCandidates = async () => {
        try {
            // TODO - add loading mechanism
            const { data } = await getAllCandidates();
            setCandidates(data);
        } catch (error) {
            // TODO - add error handling
            console.log(error);
        }
    };
    useEffect(() => {
        getCandidates();
    }, []);

    useEffect(() => {
        if (isFilter) {
            applyFilter();
        } else {
            getCandidates();
        }
    }, [isFilter]);

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
                        <CandidateList data={candidates} />
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
