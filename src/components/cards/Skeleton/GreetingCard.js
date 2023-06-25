// material-ui
import { Box, Card, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const GreetingCard = () => (
    <Card sx={{ p: 0 }}>
        <Box sx={{ p: 2.25 }}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Skeleton variant="rectangular" width={400} height={29} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={450} height={18} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Skeleton variant="rectangular" width={191} height={43} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </Card>
);

export default GreetingCard;
