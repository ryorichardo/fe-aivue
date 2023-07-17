import React from 'react';
import { Grid, Typography } from '@mui/material';
import LogoSection from 'layout/MainLayout/LogoSection';
import config from 'configs';

const ClientHeader = () => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between" direction="row">
                <Grid item>
                    <LogoSection homePath={config.defaultClientPath} />
                </Grid>
                <Grid item sx={{ cursor: 'pointer' }} onClick={handleClick}>
                    <Typography variant="h3">Bantuan</Typography>
                </Grid>
            </Grid>
            {/* <ModalHelp open={open} setOpen={setOpen} onOk={undefined} /> */}
        </>
    );
};

export default ClientHeader;
