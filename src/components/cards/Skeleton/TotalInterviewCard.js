// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'configs/constant';

const TotalInterviewCard = () => (
    <Card>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Skeleton variant="text" />
                        </Grid>
                        <Grid item xs={12}>
                            <Skeleton variant="rectangular" height={20} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={287.33} />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default TotalInterviewCard;
