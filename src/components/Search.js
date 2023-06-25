import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Grid,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Popper,
    TextField,
    Drawer,
    Typography,
    Badge
} from '@mui/material';

// third-party

// assets
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        background: '#fff'
    }
}));

const ButtonStyle = styled(Button, { shouldForwardProp })(({ theme }) => ({
    minWidth: 140,
    background: '#fff',
    color: theme.palette.text.primary
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

const PopperFilter = ({ conditions }) => {
    if (conditions.length <= 0) {
        return;
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Filter berdasarkan:
                </Typography>
            </Grid>
            {conditions?.map((con) => (
                <Grid item key={con.label}>
                    <TextField select fullWidth label={con.label} value={con.value} onChange={con.changeHandler}>
                        {con.options.map((opt, i) => (
                            <MenuItem key={i} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            ))}
        </Grid>
    );
};

PopperFilter.propTypes = {
    conditions: PropTypes.array
};

const SearchSection = ({ value, onSearch, filterConditions, isFilterActive, resetFilterHandler, applyFilterHandler, noFilter = false }) => {
    const theme = useTheme();
    const [openFilter, setOpenFilter] = useState(false);

    const handleClickFilter = (event) => {
        setOpenFilter((previousOpen) => !previousOpen);
    };

    const handleApplyFilter = () => {
        applyFilterHandler();
        setOpenFilter(false);
    };
    const handleCancelFilter = () => {
        resetFilterHandler();
        setOpenFilter(false);
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center" sx={{ position: 'relative' }}>
            <Grid item xs={6}>
                <Box>
                    <OutlineInputStyle
                        id="input-search-header"
                        value={value}
                        onChange={onSearch}
                        placeholder="Search"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end" sx={{ display: { xs: 'inherit', md: 'none' } }}>
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <HeaderAvatarStyle variant="rounded">
                                        <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                    </HeaderAvatarStyle>
                                </ButtonBase>
                            </InputAdornment>
                        }
                    />
                </Box>
            </Grid>
            {!noFilter && (
                <>
                    <Grid xs={3} item sx={{ display: { xs: 'none', md: 'inherit' } }}>
                        <Grid container direction="row" spacing={1} justifyContent="flex-end">
                            <Grid item>
                                <Badge
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    color="primary"
                                    badgeContent="1+"
                                    invisible={!isFilterActive}
                                >
                                    <ButtonStyle onClick={handleClickFilter} startIcon={<FilterAltIcon sx={{ color: '#98abff' }} />}>
                                        Filter
                                    </ButtonStyle>
                                </Badge>
                            </Grid>
                            {/* <Grid item>
                        <ButtonStyle startIcon={<IconArrowsSort color="#98abff" />}>Urutkan</ButtonStyle>
                    </Grid> */}
                        </Grid>
                    </Grid>
                    <Drawer anchor="right" open={openFilter} onClose={() => setOpenFilter(false)}>
                        <Box padding={3} minWidth={{ md: '320px', xs: '260px' }}>
                            <Box minHeight={'30vh'}>
                                <PopperFilter conditions={filterConditions} />
                            </Box>
                            <Grid container direction="row" spacing={1} sx={{ marginTop: 2 }}>
                                <Grid item xs={6}>
                                    <Button fullWidth variant="outlined" size="small" onClick={handleCancelFilter}>
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth variant="contained" size="small" onClick={handleApplyFilter}>
                                        Terapkan
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Drawer>
                </>
            )}
        </Grid>
    );
};

SearchSection.propTypes = {
    filterConditions: PropTypes.array,
    isFilterActive: PropTypes.bool,
    resetFilterHandler: PropTypes.func,
    applyFilterHandler: PropTypes.func,
    noFilter: PropTypes.bool
};

export default SearchSection;
