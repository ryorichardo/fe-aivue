export const mapAnswerToPayloadSubmitRating = ({ mapAnswer, result }) => {
    let payload = {
        candidate_result: result ?? undefined,
        ratings: []
    };

    Object.keys(mapAnswer).forEach((questionId) => {
        payload.ratings.push({ id: mapAnswer[questionId].answer_id, rating: mapAnswer[questionId].rating });
    });

    return payload;
};

export const generatePayloadSubmitResult = ({ candidateId, result }) => {
    return {
        id: candidateId,
        result
    };
};
