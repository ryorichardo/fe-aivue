import { Card, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';

function InterviewQuestions() {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Pertanyaan Interview</Typography>
            <Card>
                <List
                    component="nav"
                    sx={{
                        width: '100%',
                        minWidth: 300
                        // backgroundColor: theme.palette.background.paper,
                        // borderRadius: '10px',
                        // [theme.breakpoints.down('md')]: {
                        //     minWidth: '100%'
                        // },
                        // '& .MuiListItemButton-root': {
                        //     mt: 0.5
                        // }
                    }}
                >
                    <ListItemButton sx={{ borderRadius: '8px' }}>
                        <ListItemText primary={<Typography variant="body1">1. Siapa Tuhanmu?</Typography>} />
                    </ListItemButton>
                </List>
            </Card>
        </Stack>
    );
}

export default InterviewQuestions;
