import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({ img, alt, title, desc, onClick, selected }) {
    const cardStyle = {
      // Basic style
    };

    if (selected) {
      cardStyle.borderColor = '#695b49';
      cardStyle.boxShadow = '0 0 10px #695b49';
    }
  
    return (
      <div style={cardStyle} onClick={onClick}>
        <Card sx={{ maxWidth: 345, minHeight: 350 }}>
        <CardMedia
          component="img"
          alt={alt}
          height="200"
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>        
      </Card>
      </div>
    );
  }