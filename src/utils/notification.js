import { getErrorMessage } from './error';

export const generateNotification = (res, msg = '') => {
    let type;
    const message = msg || getErrorMessage(res) || res.message;
    switch (res.status) {
        case 200:
            type = 'success';
            break;
        case 201:
            type = 'success';
            break;
        case 203:
            type = 'success';
            break;
        default:
            type = 'error';
    }
    return {
        type,
        message
    };
};
