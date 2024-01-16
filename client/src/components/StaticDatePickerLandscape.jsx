import * as React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import AvailableTimes from './avaliableTimes';

export default function StaticDatePickerLandscape({ onDateSelect, selectedProviderAvailability, onTimeSelect }) {
  const [value, setValue] = useState(dayjs());
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    console.log('Received provider availableDays:', selectedProviderAvailability);
    setAvailableTimes([]);
  }, [selectedProviderAvailability]);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    onDateSelect(newValue); 

    const dayOfWeek = dayjs(newValue).format('ddd');
    if (selectedProviderAvailability.availableDays.includes(dayOfWeek)) {
      setAvailableTimes(selectedProviderAvailability.availableHours);
    } else {
      setAvailableTimes([]);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        onChange={handleDateChange}
        components={{
          TextField: (params) => <TextField {...params} />
        }}
      />
      </LocalizationProvider>
      <div style={{ margin: 15, marginLeft: 50 }}>
        <AvailableTimes 
          availableTimes={availableTimes} 
          onSelectTime={time => onTimeSelect(time)}
        />
      </div>
    </div>
  );
}
