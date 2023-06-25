import { Button, Grid, Pagination } from '@mui/material';
import { useNavigate } from 'react-router';
import { gridSpacing } from 'configs/constant';
import InterviewKitList from './components/InterviewKitList';
import { deleteInterviewKit, getInterviewKits } from 'utils/api/interview-kit';
import { useState, useEffect } from 'react';
import SearchSection from 'components/Search';
import { useDispatch } from 'react-redux';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
import CircularLoader from 'components/CircularLoader';

function InterviewKitPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [interviewKits, setInterviewKits] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const [search, setSearch] = useState('');

    const getAllInterviewKits = async () => {
        setLoading(true);
        try {
            const { data } = await getInterviewKits();
            setInterviewKits(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllInterviewKits();
    }, []);

    useEffect(() => {
        if (refetch) {
            getAllInterviewKits();
        }

        return () => {
            setRefetch(false);
        };
    }, [refetch]);

    const handleClickNavigate = () => {
        navigate('/interview-kit/new');
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteInterviewKit(id);
            setRefetch(true);
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res) });
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                    <Button size="large" variant="contained" onClick={handleClickNavigate}>
                        Tambah Interview Kit
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <SearchSection noFilter value={search} onSearch={(e) => setSearch(e.target.value)} />
            </Grid>
            {loading ? (
                <CircularLoader />
            ) : (
                <>
                    <Grid item xs={12}>
                        <InterviewKitList data={interviewKits} handleDelete={handleDelete} />
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

export default InterviewKitPage;
