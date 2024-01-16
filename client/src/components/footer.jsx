import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FooterImg from '../images/footer.png';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer style={{
            position: 'relative',
            backgroundImage: `url(${FooterImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            zIndex: 1,
            minHeight: '200px',
        }}>
            <div style={{
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'rgba(121, 85, 72, 0.5)',
                zIndex: -1,
            }}></div>
            
            <Box maxWidth="xl" width="50%" mx="auto" py={4}>
                <Typography variant='h3' style={{color: 'white'}}>Ready to experience the ultimate relaxation?</Typography>
                <Typography variant='subtitle1' pb={2} style={{color: 'white'}}>Step into our tranquil oasis and let us pamper you like royalty. You deserve it!</Typography>
                <Link to="/Book-now">
                    <Button variant="outlined" style={{color: 'white', borderColor: 'white'}}>Book Online</Button>
                </Link>               
            </Box>            
            <Box display="flex" justifyContent="center" sx={{paddingBottom: '3%'}}>               
                <Box maxWidth="xl" width="100%" display="flex" justifyContent="space-between" >                    
                    <Typography style={{color: 'white'}}>Copyright © 2023 King Feet Massage</Typography>
                    <Typography style={{color: 'white'}}>Powered by Massage Therapist</Typography>
                </Box>
            </Box>
        </footer>
    );
}

export default Footer;
