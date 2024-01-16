import Container from '@mui/material/Container';
import LinearStepper from '../../components/linearStepper';
import KFLogo from '../../images/kf_logo_lg.png';
import Service1 from '../../images/service2.png';
import Service2 from '../../images/service3.png';
import Service3 from '../../images/service4.png';
import Service4 from '../../images/service5.png';
import Service5 from '../../images/service6.png';
import Service6 from '../../images/service7.png';
import Service7 from '../../images/service8.png';
import Service8 from '../../images/service9.png';
import provider1 from '../../images/provider1.png';
import React, { useEffect, useState } from 'react';

const Booking = () => {

    const [providers, setProviders] = useState([]);

    useEffect(() => {
        fetch('/api/getProvider')
            .then(response => response.json())
            .then(data => setProviders(data))
            .catch(error => console.error('Error fetching providers:', error));
    }, []);

    

    const steps = [
        { 
            label: 'Login', 
            optional: false, 
            loginStep: true,            
        },
        { label: 'Location', optional: false, card: [
            { img: KFLogo, alt: 'kf-logo', title: 'King Feet Massage - Richmond', desc: '4940 No. 3 Rd #132, Richmond, BC V6X 3A5' },
            { img: KFLogo, alt: 'kf-logo', title: 'King Feet Massage - North Vancouver', desc: '108 2nd St E, North Vancouver, BC V7L 1C3' }
        ]},
        { label: 'Service', optional: false, card: [
            { img: Service1, alt: 'Deep Tissue Massage', title: 'Deep Tissue Massage', desc: 'These services are designed to promote overall wellness and reduce stress, tension, and muscle pain.' },
            { img: Service4, alt: 'Reflexology', title: 'Reflexology', desc: 'Improves circulation, stimulates muscles, reduces tension, and often eases pain.' },
            { img: Service2, alt: 'Hot Stone Massage', title: 'Hot Stone Massage', desc: 'Massage that uses smooth, heated stones to deeply penetrate the muscles and release tension.' },
            { img: Service3, alt: 'Lymphatic Detox', title: 'Lymphatic Detox', desc: 'Lymphatic massage aims to help the body maintain proper blood circulation, body muscles, and release tension.' }           
        ]},
        { label: 'Provider', optional: false, card: providers.map(provider => ({
            img: provider1, alt: 'John Smith',
            title: provider.name,
            desc: provider.description, 
            availableDays: provider.availableDays,
            availableHours: provider.availableHours,
        }))},  
        { label: 'Time', optional: false, isCalendarStep: true},
        { label: 'Addon Service', optional: true, card: [
            { img: Service5, alt: 'Cupping', title: 'Cupping', desc: 'A therapist puts special cups on your skin for a few minutes to create suction' },
            { img: Service6, alt: 'Scrapping', title: 'Scrapping', desc: 'Enables clinicians to efficiently locate and treat soft tissue tightness and injury' },
            { img: Service7, alt: 'Warm Aroma Oils', title: 'Warm Aroma Oils', desc: 'Warmed oils used in massage' },
            { img: Service8, alt: 'Ear Candling', title: 'Ear Candling', desc: 'With head shoulder and meek massage' },
        ]},               
      ];

    return ( 
        <Container maxWidth="xl" sx={{ padding: 10, margin: 'auto', minHeight: '70vh' }}>
            <LinearStepper steps={steps} />
        </Container>
       );
}
 
export default Booking;