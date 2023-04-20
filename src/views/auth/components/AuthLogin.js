import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

import * as yup from 'yup';

import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/extended/AnimateButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from 'utils/api/auth';
import { SET_USER } from 'store/actions';
import { useNavigate } from 'react-router';
import config from 'configs';

const AuthLogin = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: yup.string().max(255).required('Password is required')
            })
        ),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async ({ email, password }) => {
        try {
            if (scriptedRef.current) {
                const payload = {
                    email: 'vihagi6249@ippals.com',
                    password: 'JNZNzIVwigUxvWCH'
                };
                const data = await login(payload);
                if (data) {
                    dispatch({ type: SET_USER, user: data.data });
                    nav(config.defaultPath);
                }
            }
        } catch (err) {
            console.error(err.response);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth error={Boolean(errors.email)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput
                                {...field}
                                id="outlined-adornment-email-login"
                                type="email"
                                name="email"
                                label="Email Address / Username"
                            />
                        )}
                    />
                    {errors.email && errors.email?.message && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.email?.message}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl fullWidth error={Boolean(errors.password)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput
                                {...field}
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                label="Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )}
                    />
                    {errors.password && errors.password?.message && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.password?.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                        Forgot Password?
                    </Typography>
                </Stack>
                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                            Sign in
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default AuthLogin;
