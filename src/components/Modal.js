import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function Modal({ open, setOpen, content, negativeAction, dontShowFooter, title, onOk, onCancel, primaryButtonText, secondaryButtonText }) {
    const handleOk = (e) => {
        e.preventDefault();
        if (!!onOk) {
            onOk();
        }
        setOpen(false);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        if (!!onCancel) {
            onCancel();
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            {dontShowFooter ? (
                <></>
            ) : (
                <DialogActions>
                    <Button variant="outlined" onClick={handleCancel}>
                        {secondaryButtonText || 'Cancel'}
                    </Button>
                    <Button color={negativeAction ? 'error' : 'primary'} variant="contained" onClick={handleOk}>
                        {primaryButtonText || 'OK'}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}

export default Modal;
