import * as actionTypes from './actions';

export const initialCandidateState = {
    candidate: {},
    currentQuestionIndex: 0
};

const candidateReducer = (state = initialCandidateState, action) => {
    switch (action.type) {
        case actionTypes.SET_CANDIDATE:
            return {
                ...state,
                candidate: { ...action.candidate }
            };
        case actionTypes.SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestionIndex: action.index
            };
        case actionTypes.INCREMENT_QUESTION_INDEX:
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex++
            };
        case actionTypes.FINISH:
            return initialCandidateState;
        default:
            return state;
    }
};

export default candidateReducer;
