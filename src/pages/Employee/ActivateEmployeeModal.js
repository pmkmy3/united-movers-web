import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid2 as Grid } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 350,
    width: 400
};

const ActivateEmployeeModal = ({ open, handleClose, handleActivate, employeeID, isActive }) => {
    const [title, setTitle] = useState('Activate Employee');
    const [datePickerLabel, setDatePickerLabel] = useState('Activation Date');
    const [buttonLabel, setButtonLabel] = useState('Activate');
    
    const [comments, setComments] = useState('');
    const [activationDate, setActivationDate] = useState('');
    const [error, setError] = useState({ comments: '', activationDate: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if(isActive && open) {
            setTitle('Deactivate Employee');
            setDatePickerLabel('Deactivation Date');
            setButtonLabel('Deactivate');
        }
        setComments('');
        setActivationDate('');
        setError({ comments: '', activationDate: '' });
        setIsButtonDisabled(true);
    }, [open]);

    useEffect(() => {
        if (comments && activationDate && !error.comments && !error.activationDate) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [comments, activationDate, error]);

    const handleSubmit = () => {
        let validationError = false;
        const newError = { comments: '', activationDate: '' };

        if (!comments) {
            newError.comments = 'Comments are required.';
            validationError = true;
        }

        if (!activationDate) {
                newError.activationDate = `${datePickerLabel} is required.`;
            validationError = true;
        } else if (activationDate < today) {
            newError.activationDate = `${datePickerLabel} cannot be in the past.`;
            validationError = true;
        }

        setError(newError);

        if (!validationError) {
            const activationObj = {
                employeeID,
                activateEmployee: !isActive,
                loggedInUser: "-1",
                comments,
                password: "",
                activationDate
            }
            // handleActivate(employeeID, comments, activationDate);
            handleActivate(activationObj);
            handleClose();
        }
    };

    const handleDateBlur = () => {
        if (!activationDate) {
            setError((prev) => ({ ...prev, activationDate: `${datePickerLabel} is required.` }));
        } else if (activationDate < today) {
            setError((prev) => ({ ...prev, activationDate: `${datePickerLabel} cannot be in the past.` }));
        } else {
            setError((prev) => ({ ...prev, activationDate: '' }));
        }
    };

    const handleCommentsBlur = () => {
        if (!comments) {
            setError((prev) => ({ ...prev, comments: 'Comments are required.' }));
        } else {
            setError((prev) => ({ ...prev, comments: '' }));
        }
    };

    
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    return (
        <Modal
            open={open}
            onClose={handleClose}
            slotProps={{ BackdropProps: { onClick: (e) => e.stopPropagation() } }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={3} size={12}>
                    <Grid size={8}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid size={4} sx={{ textAlign: 'right'}}>
                        <CloseRoundedIcon style={{ 'color': "red", 'cursor' : "pointer"}} onClick={handleClose} />
                    </Grid>
                </Grid>
                
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size='small'
                    id="comments"
                    label="Comments"
                    name="comments"
                    autoComplete="off"
                    multiline
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    onBlur={handleCommentsBlur}
                    error={!!error.comments}
                    helperText={error.comments}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="activationDate"
                    label={datePickerLabel}
                    name="activationDate"
                    type="date"
                    slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: today } }}
                    value={activationDate}
                    onChange={(e) => setActivationDate(e.target.value)}
                    onBlur={handleDateBlur}
                    error={!!error.activationDate}
                    helperText={error.activationDate}
                />
                

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        type="submit"
                        fullWidth
                        size='small'
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ maxWidth: 150 }}
                        disabled={isButtonDisabled}
                    >
                        {buttonLabel}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ActivateEmployeeModal;