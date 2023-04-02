import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import InterviewKit from './InterviewKit';
import { gridSpacing } from 'config/constant';

function InterviewKitList({ data }) {
    return (
        <Grid container spacing={gridSpacing}>
            {data.map((kit) => (
                <Grid item xl={3} lg={4} md={6} xs={12}>
                    <InterviewKit
                        title={kit.title}
                        numOfQuestions={kit.numOfQuestions}
                        duration={kit.duration}
                        createdAt={kit.createdAt}
                        updatedAt={kit.updatedAt}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

InterviewKitList.propTypes = {
    data: PropTypes.array
};

export default InterviewKitList;
