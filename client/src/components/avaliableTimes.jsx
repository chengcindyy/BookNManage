import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const AvailableTimes = ({ availableTimes, onSelectTime }) => {

  const [selectedTime, setSelectedTime] = useState(null);

  // Check if avaliable
  if (availableTimes.length === 0) {
    return <div>No available times for this date.</div>;
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  return (
    <Grid container spacing={2}>
    {availableTimes.map((time, index) => (
      <Grid item key={index}>
        <Button 
          variant="outlined" 
          onClick={() => handleTimeSelect(time)}          
          style={time === selectedTime ? { backgroundColor: '#c0ab8e', color: 'white' } : null}
        >
          {time}
        </Button>
      </Grid>
    ))}
  </Grid>
  );
};

export default AvailableTimes;
