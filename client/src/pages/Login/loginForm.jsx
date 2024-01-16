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
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    // Redirct
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
           
        try {
            const response = await fetch('/api/login-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });           
    
            const data = await response.json();            
    
            if (response.ok) {           
                // If login successful, store username and uid in local storage
                localStorage.setItem("username", data.username);                
                localStorage.setItem("uid", data._id);   
                localStorage.setItem("roles", data.roles[0]);             
                navigate('/');
            } else if (response.status === 401 || response.status === 404) {
                // If username or password incorrect
                alert("Login failed: Username and password do not match. Please try again.");
            } else {
                // handle other error
                const errorData = await response.json();
                console.error('Login failed:', errorData.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    
    
    
    

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'white', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Login form */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {/* Title */}
                    <Typography variant='h2' align='center' color={'#c0ab8e'} sx={{fontWeight: 'bold'}}>Welcome</Typography>
                    {/* Subtitle */}
                    <Typography variant='h6' align='center'>Let's begin by logging into your account.</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', mt: 2 }}>
                        <Button variant="text" component={Link} to="/sign-up" sx={{ textTransform: 'none' }}>First visit? Signup today. </Button>
                    </Box>
                    {/* Username */}
                    <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-username">Username/Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
                        label="Username/Email"
                    />
                    </FormControl>
                    {/* Password */}
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">        
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        startAdornment={<InputAdornment position="start"><LockIcon /></InputAdornment>}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                    </FormControl>
                    {/* Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 1 }}>
                        <Button variant="text" component={Link} to="/forgotPassword" sx={{ textTransform: 'none' }}>Forgot Password?</Button>
                    </Box>
                    <Button type="submit" variant="contained" size="large" sx={{ width: '100%' }}>Login</Button>
                    <Button variant="outlined" component={Link} to="/" size="large" sx={{ width: '100%' }}>Cancel</Button>                    
                </Box>
            </div>
        </div>
    );
}

export default LoginForm;
