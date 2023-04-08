import PropTypes from 'prop-types';
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

function CandidateNotes({ notes }) {
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
                                            <IconButton edge="start" aria-label="delete" color="error" size="small">
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
                                minRows={3}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="notes"
                                name="notes"
                                placeholder="Tulis catatan"
                            />

                            <Button sx={{ width: 'auto' }} variant="contained" color="secondary" size="small">
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
    notes: PropTypes.array
};

export default CandidateNotes;
