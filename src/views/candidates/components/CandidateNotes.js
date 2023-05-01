import PropTypes from 'prop-types';
import { useState } from 'react';

import {
    Avatar,
    Button,
    Card,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { IconTrash, IconUser } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, deleteNotes } from 'utils/api/notes';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
function CandidateNotes({ interviewId, notes }) {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.global.user);

    const handleAddNotes = async (text) => {
        try {
            if (!text) {
                throw new Error('Catatan tidak boleh kosong!');
            }
            const payload = {
                interview_id: interviewId,
                text,
                user_id: user.id
            };
            const res = await addNotes(payload);
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res) });
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const res = await deleteNotes(id);
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res) });
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Catatan</Typography>
            <Card>
                <Grid container>
                    <Grid item xs={12}>
                        {notes.length > 0 &&
                            notes.map((note) => (
                                <List dense>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton
                                                edge="start"
                                                aria-label="delete"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteNote(note.id)}
                                            >
                                                <IconTrash size={16} />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            {/* TODO - handle profile picture */}
                                            <Avatar>{note.sender.img ? <div></div> : 'R'}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography variant="body1">{note.text}</Typography>}
                                            secondary={<Typography variant="caption">{note.dateTime}</Typography>}
                                        />
                                    </ListItem>
                                </List>
                            ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={0.5} justifyContent="flex-end">
                            <TextField
                                size="small"
                                multiline
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                minRows={3}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="notes"
                                name="notes"
                                placeholder="Tulis catatan"
                            />

                            <Button
                                sx={{ width: 'auto' }}
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={() => handleAddNotes(value)}
                            >
                                Kirim
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Stack>
    );
}

CandidateNotes.propTypes = {
    notes: PropTypes.array,
    interviewId: PropTypes.string
};

export default CandidateNotes;
