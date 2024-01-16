import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import CRUDTable  from '../../components/crudTable'

const Admin = () => {

    const [bookings, setBooking] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const url = `http://localhost:5000/api/getBooking`;
          
            try {
                const data = await fetch(url);
                const response = await data.json();
                console.log(response);
                setBooking(response);
            } catch (err) {
                console.log(`ERROR in fetching data: ${err}`);
            }
          }
          fetchData();
    },[]);

    // Handeling the delete event
    const handleDelete = async (bookingToDelete) => {
        console.log("Delted handled")

        const url = `http://localhost:5000/api/deletebooking/${bookingToDelete._id}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Something went wrong: Please try deletion later');
            }
    
            const result = await response.json();
            console.log('Delete result:', result);    
            
            setBooking(bookings.filter(booking => booking._id !== bookingToDelete._id));
        } catch (err) {
            console.log(`ERROR in deleteing data: ${err}`);
        }
    }

    // Handeling the update event
    const handleUpdate = async (bookingToUpdate) => {
        const response = await fetch(`http://localhost:5000/api/updatebooking/${bookingToUpdate._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingToUpdate),
        });
        console.log("Sending update for booking:", bookingToUpdate);
        if (!response.ok) {
            throw new Error('Something went wrong: Please try updating later');
        }

        const updatedBooking = await response.json();
        console.log("Received updated booking:", updatedBooking);
    };
      

    return ( 
        <Container maxWidth="xl" sx={{ padding: 3, margin: 'auto' }}>
            <h1>Booking Management</h1>
            <CRUDTable rows={bookings} onDelete={handleDelete} onEdit={handleUpdate} />
        </Container>
     );
}
 
export default Admin;