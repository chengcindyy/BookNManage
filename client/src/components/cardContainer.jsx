import ImgCard from './imgCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StaticDatePickerLandscape from './StaticDatePickerLandscape'; 


const CardContainer = ({ activeStep, steps, handleSelectOption, selectedOptions, providerAvailability, onTimeSelect, onDateSelect }) => {
    return (        
            <Grid container spacing={3}>
            {activeStep === steps.length ? (        
            <Grid item xs={12}>
                <Typography sx={{ mt: 2, mb: 1 }}>
                All done! Thank you for your booking.
                </Typography>
            </Grid>
            ) : steps[activeStep].isCalendarStep ? (        
                <Box sx={{ mt: 2, ml: 15 }}>
                     <StaticDatePickerLandscape 
                        selectedProviderAvailability={providerAvailability} 
                        onTimeSelect={time => onTimeSelect(time)}
                        onDateSelect={onDateSelect}
                    />
                </Box>
            
            ) : (  
            Array.isArray(steps[activeStep]?.card) ? (
                steps[activeStep].card.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <ImgCard
                    img={card.img}
                    alt={card.alt}
                    title={card.title}
                    desc={card.desc}
                    onClick={() => handleSelectOption(activeStep, index)}
                    selected={selectedOptions[activeStep]?.index === index}
                    />
                </Grid>
                ))
            ) : (
                steps[activeStep]?.card && (
                <Grid item xs={12}>
                    <ImgCard
                    img={steps[activeStep].card.img}
                    alt={steps[activeStep].card.alt}
                    title={steps[activeStep].card.title}
                    desc={steps[activeStep].card.desc}
                    onClick={() => handleSelectOption(activeStep, 'singleOption')}
                    selected={selectedOptions[activeStep] === 'singleOption'}
                    />
                </Grid>
                )
            )
            )}
        </Grid>
     );
}
 
export default CardContainer;