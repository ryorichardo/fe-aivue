import axios from 'axios';
import { apiGet, apiPost } from '.';
import { apiPut } from '.';

export const getAnswerForInterview = (interviewId) => {
    return apiGet('/answers/interview', { params: { interview_id: interviewId } });
};

export const insertAnswerForQuestionId = (interviewId, questionId) => {
    return apiPost('/answers', { interview_id: interviewId, question_id: questionId });
};

export const finishInterview = (id, payload) => {
    return apiPut('/interviews/finish', {
        id: id,
        review_comment: payload?.feedback,
        review_rating: payload?.rate
    });
};

export const uploadAnswerToS3 = async (url, file) => {
    const response = await axios.put(url, file, {
        headers: {
            'Content-Type': file.type
        }
    });

    return response;
};

export const submitRating = async (payload) => {
    return apiPut('/answers/rating', payload);
};
