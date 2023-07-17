import { INTERVIEW_RESULT, INTERVIEW_STATUS } from 'configs/constant';
import { useEffect, useState } from 'react';
import { getAllCandidates } from 'utils/api/candidate';
import { getAllInterviews } from 'utils/api/interview';

const MAX_LIMIT = 99999;
function useDashboardPage() {
    const [isLoading, setLoading] = useState(true);
    const [needReview, setNeedReview] = useState([]);
    const [candidates, setCandidates] = useState({
        pending: 0,
        onhold: 0,
        rejected: 0,
        selected: 0,
        total: 0
    });
    const [totalInterview, setTotalInterview] = useState({
        completed: 0,
        ongoing: 0,
        total: 0,
        expired: 0
    });

    const getInterviews = async () => {
        const { data, pagination_info } = await getAllInterviews({
            limit: MAX_LIMIT
        });
        setTotalInterview({
            completed: data?.filter((interview) => interview?.is_completed)?.length,
            ongoing: data?.filter((interview) => !interview?.is_completed)?.length,
            expired: data?.filter((interview) => interview?.status === INTERVIEW_STATUS.EXPIRED)?.length,
            total: pagination_info?.total_data
        });
    };

    const getCandidates = async () => {
        const { data } = await getAllCandidates({
            limit: MAX_LIMIT
        });
        setCandidates({
            pending: data?.filter((candidate) => candidate?.result === INTERVIEW_RESULT.PENDING)?.length,
            onhold: data?.filter((candidate) => candidate?.result === INTERVIEW_RESULT.ONHOLD)?.length,
            rejected: data?.filter((candidate) => candidate?.result === INTERVIEW_RESULT.REJECTED)?.length,
            selected: data?.filter((candidate) => candidate?.result === INTERVIEW_RESULT.SELECTED)?.length,
            total: data?.length
        });
        setNeedReview(data?.filter((candidate) => candidate?.active_interview?.status === INTERVIEW_STATUS.WAITING_REVIEW));
    };

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await getCandidates();
            await getInterviews();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return {
        isLoading,
        needReview,
        totalInterview,
        candidatesDistributionData: candidates,
        totalCandidate: candidates?.total
    };
}

export default useDashboardPage;
