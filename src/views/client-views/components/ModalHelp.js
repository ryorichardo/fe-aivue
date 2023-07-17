import { Box, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import Modal from 'components/Modal';
import React from 'react';

const HELP_MESSAGES = [
    'Pastikan Anda berada pada ruangan yang kondusif, hening, dan memiliki pencahayaan yang cukup',
    'Pastikan koneksi internet Anda memadai untuk kelancaran sesi wawancara',
    'Pastikan kamera dan mikrofon Anda aktif dan browser memiliki akses terhadap kamera',
    'Pastikan wajah selalu menghadap kamera dan tidak ada yang terpotong',
    'Jangan lupa untuk berdoa, tetap tenang dan fokus selama sesi wawancara',
    'Semangat dan semoga beruntung!'
];
function ModalContent() {
    return (
        <Box sx={{ minWidth: 520 }}>
            <List>
                {HELP_MESSAGES.map((value, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                            <Typography variant="h3" sx={{ fontWeight: 'normal' }}>
                                {index + 1}.
                            </Typography>
                        </ListItemIcon>
                        <Typography variant="h3" sx={{ fontWeight: 'normal' }}>
                            {value}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
function ModalHelp({ open, setOpen, onOk }) {
    console.log(onOk);
    return (
        <Modal
            title={<Typography variant="h2">Petunjuk Penggunaan AIVue</Typography>}
            content={<ModalContent />}
            negativeAction={false}
            primaryButtonText="Mulai Interview"
            open={open}
            setOpen={setOpen}
            onOk={onOk}
        />
    );
}

export default ModalHelp;
