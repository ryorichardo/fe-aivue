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
import { IconTrash } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, deleteNotes, getNotesByInterviewId } from 'utils/api/notes';
import { SET_NOTIFICATION } from 'store/actions';
import { generateNotification } from 'utils/notification';
import { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
function CandidateNotes({ interviewId }) {
    const [notes, setNotes] = useState([]);
    const [value, setValue] = useState('');
    const [refetch, setRefetch] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.global.user);

    const getAllNotes = async (interviewId) => {
        try {
            const { data } = await getNotesByInterviewId(interviewId);
            setNotes(data);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

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
            setRefetch(true);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        } finally {
            setValue('');
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const res = await deleteNotes(id);
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(res) });
            setRefetch(true);
        } catch (error) {
            dispatch({ type: SET_NOTIFICATION, notification: generateNotification(error) });
        }
    };

    useEffect(() => {
        if (interviewId) {
            getAllNotes(interviewId);
        }
    }, [interviewId]);

    useEffect(() => {
        if (refetch && interviewId) {
            getAllNotes(interviewId);
        }

        return () => {
            setRefetch(false);
        };
    }, [interviewId, refetch]);

    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Catatan Interview</Typography>
            <Card>
                <Grid container>
                    <Grid item xs={12}>
                        {notes.length > 0 &&
                            notes.map((note, i) => (
                                <List key={note.notes_id} dense>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton
                                                edge="start"
                                                aria-label="delete"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteNote(note.notes_id)}
                                            >
                                                <IconTrash size={16} />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            {/* TODO - handle profile picture */}
                                            <Avatar>{note.sender.img ? <div></div> : 'SA'}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography variant="body1">{note.text}</Typography>}
                                            secondary={
                                                <Typography variant="caption">
                                                    {formatDistanceToNow(
                                                        new Date(note.created_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')),
                                                        { addSuffix: true }
                                                    )}
                                                </Typography>
                                            }
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
