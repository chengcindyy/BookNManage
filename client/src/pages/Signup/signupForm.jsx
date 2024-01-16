import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FormHelperText from '@mui/material/FormHelperText';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../../components/alertBox';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [openAlert, setOpenAlert] = useState(false);
    const [boxErrorMessage, setBoxErrorMessage] = useState('');
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    // Redirct
    const navigate = useNavigate();

    // handle user data
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleResponse = async (response) => {
        if (response.status === 409) {
            setBoxErrorMessage("Registration error occurred. Please try again or contact support if the issue persists.");
            setOpenAlert(true);
        } else {
            // handle other error
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleGoToLogin = () => {
        // Nav to login
        navigate('/sign-in');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
         
        // Email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(userData.username)) {
            setErrors(prevErrors => ({ ...prevErrors, username: "Please enter a valid email address." }));
            return;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, username: null }));
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;        
        if (!passwordRegex.test(userData.password)) {
            setErrors(prevErrors => ({ ...prevErrors, password: "Password must be at least 6 characters long and include at least one number and one special character."}));
            return;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, password: null }));
        }

        // Confrim password validation
        if (userData.password !== userData.confirmPassword) {
            setErrors(prevErrors => ({ ...prevErrors, confirmPassword: "Please enter password again"}));
            return;
        }else{
            setErrors(prevErrors => ({ ...prevErrors, confirmPassword: null}));
        }
     
        // Phone number validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(userData.phone)) {
            setErrors(prevErrors => ({ ...prevErrors, phone: "Please enter a valid phone number."}));
            return;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, phone: null }));
        }
        
        try {            
            const response = await fetch('/api/signup-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.status === 409) {
                // If user exists
                setBoxErrorMessage("Registration error occurred. Please try again or contact support if the issue persists.");
                setOpenAlert(true);     
            } else if (response.ok) {
                // If a new user
                const data = await response.json();   
                console.log(data);
                alert("User register successfully, please log in your account.")
                navigate('/sign-in');
            } else {               
                handleResponse(response);
            }          
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Hide password function
    const handleClickShowPassword = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100vh', 
            background: 'white', 
            zIndex: 1000, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
            {/* Signup form */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>       
                <Box>
                    {/* Title */}    
                    <Typography variant='h3' align='center' color={'#c0ab8e'} sx={{fontWeight: 'bold'}}>New here?</Typography>
                    {/* Subtitle */}
                    <Typography variant='h6' align='center' sx={{mb: '5%'}}>We're excited to meet you!</Typography>
                </Box>                
                <Box component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'center',
                    }}
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    {/* Username */}
                    <FormControl error={!!errors.username} fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-username">Username/Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            name="username"
                            startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
                            label="Username/Email"
                            value={userData.username}
                            onChange={handleChange} 
                        />
                        {errors.username && <FormHelperText>{errors.username}</FormHelperText>}
                    </FormControl>
                    {/* Password */}
                    <FormControl error={!!errors.password} fullWidth sx={{ m: 1 }} variant="outlined">        
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={<InputAdornment position="start"><LockIcon /></InputAdornment>}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword('password')}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                            value={userData.password}
                            onChange={handleChange} 
                        />
                        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                    </FormControl>
                    {/* Confirm Password */}
                    <FormControl error={!!errors.confirmPassword} fullWidth sx={{ m: 1 }} variant="outlined">        
                        <InputLabel htmlFor="outlined-adornment-confirm-password" shrink>Confirm password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            name='confirmPassword'
                            type={showConfirmPassword ? 'text' : 'password'}
                            startAdornment={<InputAdornment position="start"><VerifiedUserIcon /></InputAdornment>}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('confirmPassword')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <FormHelperText>{errors.confirmPassword}</FormHelperText>}                        
                    </FormControl>
                    {/* Phone number */}
                    <FormControl error={!!errors.phone} fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-phone" shrink>Phone number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-phone"
                            name='phone'
                            startAdornment={<InputAdornment position="start"><PhoneIphoneIcon /></InputAdornment>}
                            label="Phone number"
                            value={userData.phone}
                            onChange={handleChange} 
                        />
                        {errors.phone && <FormHelperText>{errors.phone}</FormHelperText>}
                    </FormControl>
                    {/* Buttons */}
                    <Button type="submit" variant="contained" size="large" sx={{ width: '100%' }}>Signup</Button>
                    <Button variant="outlined" component={Link} to="/" size="large" sx={{ width: '100%' }}>Cancel</Button>
                </Box>
                <AlertBox 
                    open={openAlert} 
                    errorMessage={boxErrorMessage} 
                    handleClose={handleCloseAlert} 
                    handleLogin={handleGoToLogin}
                />
            </div>
        </div>
    );
}

export default Signup;
