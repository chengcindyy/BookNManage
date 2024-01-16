import React from 'react';
import Container from '@mui/material/Container';
import CollapsibleTable from '../../components/collapsibleTable';
import Typography from '@mui/material/Typography';
import { createData } from './dataUtils';
import Grid from '@mui/material/Grid';
import PriceListImg from '../../images/pricelist.png'
import GoogleMapLocator from '../../components/googleMapLocator';

const Services = () => {   
  
    const rows1 = [
        createData('Deep Tissue Massage', [52, 68, 75, 98], true),
        createData('Relaxation Massage', [48, 64, 68, 98], true),
        createData('Reflexology', [46, 62, 65, 98], true),
        createData('Hot Stone Massage', ['-', '-', 75, '-'], true),
        createData('Lymphatic Detox', ['-', '-', 73, '-'], true)
      ];
      const rows2 = [
        createData('Chinese Pedicure', ['-', '-', '-', '-', 75], false, false, true),
        createData('Ear Candle', ['-', '-', '-', '-', 48], false, false, true),
        createData('Ear spa', ['-', '-', '-', '-', 63], false, false, true),
        createData('Acupunture', ['-', '-', '-', '-', 95], false, false, true, [
          { time: '6 Sessions ($85)', price: 510 },
          { time: '10 Sessions ($75)', price: 750 }
      ]) 
      ];
      const rows3 = [
        createData('Packages ', [580, 1176, 1728], false, true)        
      ];
      const rows4 = [        
        createData('Cupping / Scraping', ['-', '-', '-', '-', 35], false, false, true),
        createData('Warm Aroma Oils', ['-', '-', '-', '-', 10], false, false, true)
      ];
 
  return (
    <Container maxWidth="xl" sx={{ padding: 10, margin: 'auto' }}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <div style={{ width: '100%' }}>            
                    <img src={PriceListImg} alt="Your description" style={{ width: '90%' }} />
                </div>
            </Grid>             
            <Grid item xs={6}>
                <div style={{ width: '100%', margin: 'auto' }}>
                    <Typography variant="h3" sx={{ mb: 4 }}>Services</Typography>
                    <CollapsibleTable rows={rows1} title="Relaxing Body Massage" />
                    <CollapsibleTable rows={rows2} title="By Appointment Service" />
                    <CollapsibleTable rows={rows3} title="Promotion Package" />                    
                    <CollapsibleTable rows={rows4} title="Add on Service" />
                </div>
            </Grid>
            
        </Grid>
        <Typography variant="h3" sx={{ m: 4, textAlign: 'center' }}>Store Locator</Typography>       
        <GoogleMapLocator />
    </Container>
  );
}

export default Services;
