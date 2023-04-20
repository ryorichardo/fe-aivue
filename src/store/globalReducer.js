// project imports
import config from 'configs';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
    user: {},
    token: ''
};

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: { ...action.user },
                token: action.user.access_token
            };
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
};

export default globalReducer;
