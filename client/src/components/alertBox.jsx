import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertBox = ({ open, errorMessage, handleClose, handleLogin }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Registration Error"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{errorMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleLogin} color="primary">
                    Try to Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};
 
export default AlertBox;
