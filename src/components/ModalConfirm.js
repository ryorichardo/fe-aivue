import { Typography } from '@mui/material';
import Modal from './Modal';

function ModalConfirm({ title, open, setOpen, onOk, message, confirmDelete }) {
    return (
        <>
            <Modal
                title={<Typography variant="h4">{title}</Typography>}
                content={<Typography variant="body1">{message}</Typography>}
                negativeAction={Boolean(confirmDelete)}
                open={open}
                setOpen={setOpen}
                onOk={onOk}
            />
        </>
    );
}

export default ModalConfirm;
