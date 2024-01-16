import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContainer from './cardContainer';
import {useNavigate, Link} from 'react-router-dom';
import mongoose from 'mongoose';

const isLoggedIn = () => {
  const username = localStorage.getItem("username");
  const uid = localStorage.getItem("uid");
  return username != null && uid != null;
}

export default function HorizontalLinearStepper({ steps = [] }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedOptions, setSelectedOptions] = React.useState(Array(steps.length).fill(null));
  const [providerAvailability, setProviderAvailability] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("Updated Selected Options:", selectedOptions);
  }, [selectedOptions]);
  

  const isStepOptional = (step) => {
    return steps[step]?.optional;
  };  

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleSelectOption = (step, optionIndex) => {
    setSelectedOptions(prevSelectedOptions => {
      const newSelectedOptions = [...prevSelectedOptions];
  
      // Check if the option has been selected
      if (newSelectedOptions[step]?.index === optionIndex) {
        // Yes => cancel
        newSelectedOptions[step] = null;
      } else {
        // No => save the option and index
        newSelectedOptions[step] = {
          index: optionIndex,
          data: steps[step].card[optionIndex]
        };
      }
  
      return newSelectedOptions;
    });
  };  

  const handleDateSelection = (selectedDate) => {
    setSelectedOptions(prevSelectedOptions => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[4] = { index: 4, data: { date: selectedDate } }; 
      return newSelectedOptions;
    });
  };
  
  const handleTimeSelection = (selectedTime) => {
    setSelectedOptions(prevSelectedOptions => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[6] = { index: 6, data: { time: selectedTime } };
      return newSelectedOptions;
    });
  };
  
  
  const handleNext = () => {
    let newSkipped = skipped;
    console.log(activeStep);  
    
    const currentStepData = selectedOptions[activeStep]?.data;
    if (currentStepData) {
      console.log('Selected data in current step:', currentStepData);
    }

    if (activeStep === 0 && isLoggedIn()) {
      const userUid = localStorage.getItem("uid");      
      console.log(userUid);
      setSelectedOptions(prevSelectedOptions => {
        const newSelectedOptions = [...prevSelectedOptions];
        newSelectedOptions[0] = { index: 0, data: { uid: userUid } };
        console.log(selectedOptions);
        return newSelectedOptions;
      });
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      return;
    }

    if (activeStep === 3) {
      const availability = {
        availableDays: currentStepData.availableDays,
        availableHours: currentStepData.availableHours
      };
      setProviderAvailability(availability);
      console.log('Selected provider availability:', availability);
    }

    if (activeStep === steps.length - 1) {
      handleSubmit(); 
      return; 
    }

    if (selectedOptions[activeStep] == null) {
      alert('Please select an option to proceed.');
      return;
    }

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
  
    if (activeStep === steps.length - 2) { 
      handleSubmit(); 
    }
  
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  
  const handleReset = () => {
    setActiveStep(0);
    setSelectedOptions(Array(steps.length).fill(null));
    setProviderAvailability(null);
  };

  const handleSubmit = () => {
    console.log('handleSubmit called');
    const userUid = localStorage.getItem("uid");
    const userObjectId = new mongoose.Types.ObjectId(userUid);
  
    const bookingData = {
      user: userObjectId,
      location: selectedOptions[1]?.data.title, 
      service: selectedOptions[2]?.data.title, 
      provider: selectedOptions[3]?.data.title,
      date: selectedOptions[4]?.data?.date,
      time: selectedOptions[6]?.data?.time, 
      addons: selectedOptions[5]?.data.title 
    };
    
    
    console.log('Submitting the following booking:', bookingData);
    submitBooking(bookingData)
    .then(() => {
      console.log('Booking submitted successfully');
      setActiveStep(steps.length);
    })
    .catch((error) => {
      console.error('Error submitting booking:', error);
    });
    
  };

  const handleLogout = () => {    
    localStorage.removeItem("username");
    localStorage.removeItem("uid");   
    navigate('/sign-in');
  };

  const submitBooking = async (bookingData) => {
    try {
      const response = await fetch('/api/addbooking', {         
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  };
  

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
  
      {activeStep === 0 ? (
        isLoggedIn() ? (
          <Typography variant="h6">
            Welcome, {localStorage.getItem("username")}! (Not you? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleLogout}>Logout</span>)
          </Typography>
        ) : (
          <Box>
            <Typography variant="h6">Please sign in to continue</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/sign-in"
            >
              Sign In
            </Button>
          </Box>
        )
      ) : (
        <CardContainer
          activeStep={activeStep}
          steps={steps}
          handleSelectOption={handleSelectOption}
          selectedOptions={selectedOptions}
          providerAvailability={providerAvailability}
          onTimeSelect={handleTimeSelection}
          onDateSelect={handleDateSelection}
        />
      )}
  
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        {activeStep === steps.length ? (          
          <Box sx={{ flexGrow: 1 }}>
            <Button onClick={handleReset}>Book for another service</Button>
          </Box>
        ) : (          
          <React.Fragment>
            {activeStep !== 0 && (
              <Button
                color="inherit"
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && activeStep !== steps.length - 1 && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
  
  
}
