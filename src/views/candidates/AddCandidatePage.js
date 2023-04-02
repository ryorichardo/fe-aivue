import { Button, Card, Grid, Stack, TextField, Typography, Box } from '@mui/material';
import { gridSpacing } from 'config/constant';

function AddCandidatePage() {
    return (
        <Grid container spacing={gridSpacing} justifyContent="flex-end">
            <Grid item md={6} sm={12}>
                <Stack spacing={2}>
                    <Typography variant="h3">Informasi Kandidat</Typography>
                    <Card>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Nama Kandidat</Typography>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        // value={watchName}
                                        // onChange={handleNameChange}
                                        // error={errors.name !== undefined}
                                        // helperText={errors.name?.message}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Nama Kandidat</Typography>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        // value={watchName}
                                        // onChange={handleNameChange}
                                        // error={errors.name !== undefined}
                                        // helperText={errors.name?.message}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Nama Kandidat</Typography>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        // value={watchName}
                                        // onChange={handleNameChange}
                                        // error={errors.name !== undefined}
                                        // helperText={errors.name?.message}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Card>
                </Stack>
            </Grid>
            <Grid item md={6} sm={12}>
                <Stack spacing={2}>
                    <Typography variant="h3">Pengaturan Interview</Typography>
                    <Card>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Nama Interviewer</Typography>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        // value={watchName}
                                        // onChange={handleNameChange}
                                        // error={errors.name !== undefined}
                                        // helperText={errors.name?.message}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Interview Kit</Typography>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        // value={watchName}
                                        // onChange={handleNameChange}
                                        // error={errors.name !== undefined}
                                        // helperText={errors.name?.message}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Tanggal Berlaku</Typography>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        // value={watchName}
                                        // onChange={handleNameChange}
                                        // error={errors.name !== undefined}
                                        // helperText={errors.name?.message}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Card>
                </Stack>
            </Grid>

            <Grid item xs={3}>
                <Button size="large" fullWidth variant="contained">
                    Kirim Undangan
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddCandidatePage;
