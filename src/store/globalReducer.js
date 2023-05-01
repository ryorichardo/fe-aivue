// project imports
import config from 'configs';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
    user: {},
    token: '',
    notification: {
        type: '',
        message: ''
    },
    notificationOpen: false
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
        case actionTypes.SET_NOTIFICATION:
            return {
                ...state,
                notification: { ...action.notification },
                notificationOpen: true
            };
        case actionTypes.RESET_NOTIFICATION:
            return {
                ...state,
                notification: {},
                notificationOpen: false
            };
        case actionTypes.SET_NOTIFICATION_OPEN:
            return {
                ...state,
                notificationOpen: action.notificationOpen
            };
        default:
            return state;
    }
};

export default globalReducer;
