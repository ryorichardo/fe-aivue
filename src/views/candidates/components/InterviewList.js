import PropTypes from 'prop-types';
import { Box, Tabs, Tab, Typography, Grid } from '@mui/material';
import TabPanel from 'components/TabPanel';
import { useState } from 'react';
import InterviewCard from './InterviewCard';

function InterviewList({ interviews }) {
    const [index, setIndex] = useState('completed');

    const completedInterviews = interviews?.filter((interview) => interview.is_completed);
    const futureInterviews = interviews?.filter((interview) => !interview.is_completed);

    return (
        <Box>
            <Tabs value={index} onChange={(_, newValue) => setIndex(newValue)} textColor="primary" indicatorColor="primary">
                <Tab value="completed" label="Interview Aktif" sx={{ background: index === 'completed' ? 'white' : 'inherit' }} />
                <Tab value="future" label="Interview Mendatang" sx={{ background: index === 'future' ? 'white' : 'inherit' }} />
            </Tabs>
            <TabPanel value={index} index="completed">
                <Grid container spacing={3}>
                    {completedInterviews?.map((interview) => (
                        <Grid item lg={6} md={12} key={interview.id}>
                            <InterviewCard interview={interview} />
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={index} index="future">
                <Grid container spacing={3}>
                    {futureInterviews && futureInterviews.length > 0 ? (
                        futureInterviews?.map((interview) => (
                            <Grid item md={6} key={interview.id}>
                                <InterviewCard interview={interview} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item>
                            <Typography variant="body1" align="center">
                                Semua tahapan interview untuk posisi ini telah diselesaikan
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </TabPanel>
        </Box>
    );
}

InterviewList.propTypes = {
    interviews: PropTypes.array
};

export default InterviewList;
