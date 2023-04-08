import PropTypes from 'prop-types';
import { Card, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';

function InterviewQuestions({ questions, selectedQuestionId, handleSelectQuestion }) {
    const handleNavigateToAnswer = (event, id) => {
        handleSelectQuestion(id);
    };
    return (
        <Stack spacing={1.5}>
            <Typography variant="h4">Pertanyaan Interview</Typography>
            <Card>
                <List
                    component="nav"
                    sx={{
                        width: '100%'
                    }}
                >
                    {questions &&
                        questions.length > 0 &&
                        questions?.map((q, i) => (
                            <ListItemButton
                                sx={{ borderRadius: '8px' }}
                                key={q.id}
                                onClick={(event) => handleNavigateToAnswer(event, q.id)}
                                selected={selectedQuestionId === q.id}
                            >
                                <ListItemText primary={<Typography variant="body1">{`${i + 1}. ${q.question}`}</Typography>} />
                            </ListItemButton>
                        ))}
                </List>
            </Card>
        </Stack>
    );
}

InterviewQuestions.propTypes = {
    questions: PropTypes.array,
    selectedQuestionId: PropTypes.string,
    handleSelectQuestion: PropTypes.any
};

export default InterviewQuestions;
