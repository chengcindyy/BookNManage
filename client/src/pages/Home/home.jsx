import * as React from 'react';
import About from './about';
import HomeImg from '../../images/woman-spa.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useRef } from "react";


export default function SimpleContainer() {

    const aboutRef = useRef(null);

    const handleScrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* head container */}
      <div style={{ 
        position: 'relative',
        backgroundColor: '#f8f7f6', 
        height: '90vh',
        marginBottom: '5em'
      }}>
        {/* Static image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${HomeImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          zIndex: 1
        }}></div>

        {/* Color overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #8B4513 100%)',
          zIndex: 2          
        }}></div>

        {/* Content */}
        <Container maxWidth="xl" style={{ position: 'relative', zIndex: 3}}>
        <Box sx={{ paddingLeft: 0, paddingRight: 0 }}>            
            <Grid container sx={{ display: 'flex', alignItems: 'flex-end'}}>
              <Grid item xs={12} md={8} sx={{ marginTop: { xs: '5em', md: '15em' }}}>
                <Typography variant="h3" color={'white'} sx={{fontSize: '4em'}}>Step into royalty with King Feet Massage.</Typography>
                <Typography variant="subtitle1" color={'white'} gutterBottom sx={{ marginTop: 5, fontSize: '1.2em'}}>
                Experience the ultimate in relaxation and rejuvenation at King Feet Massage. Our skilled therapists use techniques from around the world to soothe tired feet and reinvigorate the entire body. Step into our tranquil oasis and let us pamper you like royalty. You deserve it!
                </Typography>
                <Button onClick={handleScrollToAbout}
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#c0ab8e',
                        '&:hover': { backgroundColor: 'initial'},
                        marginTop: 6
                    }}
                >
                    Learn more
                </Button>
              </Grid>
              <Grid item xs={12} md={2}/>
              <Grid item xs={12} md={2}>
              <List sx={{ color: 'white', marginTop: '2em' }}>
                    <ListItem>
                        <ListItemText primary="Massage" primaryTypographyProps={{ variant: 'h6', sx: { textTransform: 'uppercase', color: 'white' } }} />
                    </ListItem>
                    <Divider sx={{ backgroundColor: 'white' }}/>
                    <ListItem>
                        <ListItemText primary="Therapies" primaryTypographyProps={{ variant: 'h6', sx: { textTransform: 'uppercase', color: 'white' } }} />
                    </ListItem>
                    <Divider sx={{ backgroundColor: 'white' }}/>
                    <ListItem>
                        <ListItemText primary="Relaxation" primaryTypographyProps={{ variant: 'h6', sx: { textTransform: 'uppercase', color: 'white' } }} />
                    </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>               
        </Container>
      </div>

      {/* About container */}
      <div ref={aboutRef}>
          <About/>
      </div>
    </React.Fragment>
  );
}
