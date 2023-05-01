import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_NOTIFICATION } from 'store/actions';
import { capitalizeFirstChar } from 'utils/string';

function Notification() {
    const state = useSelector((state) => state.global);
    const dispatch = useDispatch();

    let isOpen = state.notificationOpen;
    let notification = state.notification;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: RESET_NOTIFICATION });
    };

    if (!notification) {
        return;
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
                <AlertTitle>{capitalizeFirstChar(notification.type)}</AlertTitle>
                {notification.message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;
