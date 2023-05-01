import { getErrorMessage } from './error';

export const generateNotification = (res) => {
    let type;
    const message = getErrorMessage(res) || res.message;
    switch (res.status) {
        case 200:
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
