import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';


const ForgotPasswordForm = () => {
    
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'white', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Login form */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component="form"
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
                    <Typography variant='h2' align='center' color={'#c0ab8e'} sx={{fontWeight: 'bold'}}>Forgot password?</Typography>
                    {/* Subtitle */}
                    <Typography variant='h6' align='center'>Enter your email to reset the password.</Typography>                
                    {/* Email */}
                    <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        startAdornment={<InputAdornment position="start"><EmailIcon /></InputAdornment>}
                        label="Email"
                    />
                    </FormControl>                  
                    {/* Buttons */}                
                    <Button variant="contained" size="large" sx={{ width: '100%' }}>Login</Button>
                    <Button variant="outlined" component={Link} to="/sign-in" size="large" sx={{ width: '100%' }}>Cancel</Button>                    
                </Box>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;
