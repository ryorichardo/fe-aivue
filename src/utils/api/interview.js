import { apiGet, apiPost } from '.';

export const getAllInterviews = ({ page = 1, limit = 10 }) => {
    return apiGet('/interviews', {
        params: {
            page,
            limit
        }
    });
};
export const getAllInterviewsForCandidate = (candidateId) => {
    return apiGet('/interviews/candidate', {
        params: {
            id: candidateId
        }
    });
};

export const getInterviewDetail = (id) => {
    return apiGet('/interviews/detail', {
        params: {
            id: id
        }
    });
};

export const loginInterview = (payload) => {
    return apiPost('/interviews/token', payload);
};
