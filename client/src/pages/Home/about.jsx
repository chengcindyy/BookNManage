import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import img1 from '../../images/ezgif.com-gif-maker-1.jpg'
import img2 from '../../images/ezgif.com-gif-maker-2.jpg'
import img3 from '../../images/ezgif.com-gif-maker-3.jpg'
import img4 from '../../images/ezgif.com-gif-maker-4.jpg'
import img5 from '../../images/ezgif.com-gif-maker-5.jpg'
import img6 from '../../images/ezgif.com-gif-maker-6.jpg'
import img7 from '../../images/ezgif.com-gif-maker-7.jpg'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'


const About = () => {

    const images = [img1, img2, img3, img4, img5, img6, img7];
    const texts = ['Aromatherapy', 'Foot Reflexology','Lymphatic Massage','Hot Stone Massage (30 mins)','Chinese Style Pedicure','Deep tissue massage','Relaxation massage']

    return ( <>
    <Container disableGutters maxWidth="xl" sx={{ textAlign: 'center' }}>
            <Typography variant='h6' sx={{ marginTop: '2em', maxWidth: '70%', margin: 'auto'}}>
                Welcome​
            </Typography>
            <Typography variant='h3' sx={{ maxWidth: '70%', margin: 'auto', marginBottom: '2%'}}>
                About King Feet Massage
            </Typography>
            <Typography variant='subtitle1' sx={{ fontSize: '1.2em', maxWidth: '70%', margin: 'auto', marginBottom: '5%' }}>
                Welcome to King Feet Massage, located in the heart of Richmond, BC. Our skilled massage therapists specialize in providing a wide range of massage services to help you unwind and rejuvenate. Whether you’re looking to relieve stress, improve your athletic performance, or simply pamper yourself, we have the perfect massage for you.
            </Typography>
            
            <Grid container spacing={0} sx={{marginTop: '2em', maxWidth: '50%', margin: 'auto' }}>
            {/* Add more rows -> change array number */}
            {Array(7).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                <Grid item xs={6} style={{ 
                    width: '15vw',
                    height: '15vw',
                    background: (index % 2 === 0) ? `url(${images[index % images.length]}) center/cover` : '#c0ab8e',
                    position: 'relative'
                }}>
                    {(index % 2 !== 0) && (
                    <Typography variant='h5'
                        style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        color: 'white', 
                        textAlign: 'center',
                        fontWeight: 'bold'   
                        }}
                    >
                        {texts[index]}
                    </Typography>
                    )}
                </Grid>
                <Grid item xs={6} style={{ 
                    width: '15vw',
                    height: '15vw',
                    background: (index % 2 === 0) ? '#c0ab8e' : `url(${images[index % images.length]}) center/cover`,
                    position: 'relative'
                }}>
                    {(index % 2 === 0) && (
                    <Typography variant='h5'
                        style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        color: 'white', 
                        textAlign: 'center',
                        fontWeight: 'bold'                      
                        }}
                    >
                        {texts[index]}
                    </Typography>
                    )}
                </Grid>                
                </React.Fragment>
            ))}
            </Grid>

            <Link to="/services">
            <Button
                size="large"
                variant="contained" 
                sx={{ 
                backgroundColor: '#c0ab8e',
                '&:hover': { backgroundColor: 'initial'},
                marginTop: 6,
                fontSize: '1em',
                marginBottom: '5%'
                }}>
                View All Services
            </Button>
            </Link>

        </Container>
    </> );
}
 
export default About;