import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEmployeeById, addEmployee, updateEmployeePersonalInformation } from '../../store/reducers/employeeSlice';
import { Modal, Box, TextField, Button, Typography, Grid2 as Grid, MenuItem, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Tabs from "../../components/tabPanel/Tabs";
import Panel from "../../components/tabPanel/Panel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';


const EmployeeFormModal = ({ employeeId, isEdit }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        aadhaarNumber: "",
        panNumber: "",
        contactNumber: "",
        bloodGroup: "",
        personalEmail: "",
        alternativeContactNumber: "",
        alternativeEmail: "",
        emergencyContactName: "",
        emergencyContactRelation: "",
        emergencyContactId: "",
        emergencyContactNumber: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        city: "",
        zip: "",
        landmark: "",
        highestDegree: "",
        lastCompanyName: "",
        bankName: "",
        bankAccountNumber: "",
        ifscCode: "",
        uanNumber: "",
        insurancePolicyNumber: "",
        insuranceCompanyName: "",
        insuranceStartDate: "",
        insuranceEndDate: "",
        hasBackgroundVerification: "",
        agencyName: "",
        hasPhysicalVerificationDone: false
    });
    const [touched, setTouched] = useState({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit && employeeId) {
            dispatch(fetchEmployeeById(employeeId)).then((response) => {
                setFormData(response.payload);
            });
        }
    }, [dispatch]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch(name) {
          case "aadhaarNumber": {
            if (!/^\d*$/.test(value) || value.length > 12) return;
            break;
          }
          case "contactNumber": {
            if (!/^\d*$/.test(value) || value.length > 10) return;
            break;
          }
        }
        
        setFormData({ ...formData, [name]: value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const isFieldValid = (field) => {
        if (field === "personalEmail" || field === "alternativeEmail") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(formData[field]);
        }
        else if(field === "alternativeContactNumber" || field === "emergencyContactNumber") {
            const contactNumberRegex = /^\d{10}$/;
            return contactNumberRegex.test(formData[field]);
        }
        return formData[field] && formData[field].trim() !== "";
    };

    const getFieldError = (field) => {
        return !isFieldValid(field) && touched[field] ? "This field is required" : "";
    };

    const isPanelValid = (fields) => {
        return fields.every((field) => isFieldValid(field));
    };

    const handlePISave = async () => {
        try{
            const piData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                aadhaarNumber: formData.aadhaarNumber,
                panNumber: formData.panNumber,
                contactNumber: formData.contactNumber,
                bloodGroup: formData.bloodGroup,
                personalEmail: formData.personalEmail
            }
            if (isEdit && employeeId) {
                await dispatch(updateEmployeePersonalInformation(...piData, ...{employeeId}));
                setSnackbarMessage('Employee updated successfully!');
                setSnackbarSeverity('success');
            } else {
                await dispatch(addEmployee(piData));
                setSnackbarMessage('Employee added successfully!');
                setSnackbarSeverity('success');
            }
        } catch(err){
            setSnackbarMessage(err.message || 'Failed to update employee!');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            handleClose();
        }
    };
      
    const handleCISave = async () => {
        try{

        } catch(err){

        } finally {

        }
    }

    return (
        <div>
            {
                isEdit && employeeId ? 
                (
                    <IconButton
                        color="primary"
                        size="small"
                        style={{ marginRight: 8 }}
                        onClick={handleOpen}
                        sx={{ width: "50px", Height: "50px" }}
                    >
                        <Tooltip title="Edit Employee" arrow><FontAwesomeIcon icon={faEdit} /></Tooltip>
                    </IconButton>
                )
                : <Button variant="contained" color="primary" onClick={handleOpen}>Add New</Button>
            }
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', bgcolor: 'background.paper', boxShadow: 24, p: 4, height: 650, width: 1100 }}>
                    <Grid container spacing={3}>
                        <Grid size={6}>
                            <Typography id="modal-title" variant="h6" sx={{ fontWeight: 900 }}>Employee Form</Typography>
                        </Grid>
                        <Grid size={6} sx={{ textAlign: 'right'}}>
                            <CloseRoundedIcon style={{ 'color': "red", 'cursor' : "pointer"}} onClick={handleClose} />
                        </Grid>
                        <Tabs selected={0} isReadOnly={!(employeeId && isEdit)}>
                            <Panel title="Personal Information">
                                <Grid container rowSpacing={3} columnSpacing={3} sx={{overflowY: "auto", maxHeight: 400}}>
                                    <Grid size={5} sx={{ marginTop: 1 }}>
                                        <TextField
                                        fullWidth
                                        label="First Name"
                                        variant="outlined"
                                        size="small"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        sx={{height: 50}}
                                        error={!isFieldValid("firstName") && touched.firstName}
                                        helperText={getFieldError("firstName")}
                                        />
                                    </Grid>
                                    <Grid size={5} sx={{ marginTop: 1 }} >
                                        <TextField
                                        fullWidth
                                        label="Last Name"
                                        variant="outlined"
                                        size="small"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={!isFieldValid("lastName") && touched.lastName}
                                        helperText={getFieldError("lastName")}
                                        />
                                    </Grid>
                                    <Grid size={5}>
                                        <TextField
                                        select
                                        fullWidth
                                        label="Gender"
                                        variant="outlined"
                                        size="small"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={!isFieldValid("gender") && touched.gender}
                                        helperText={getFieldError("gender")}
                                        >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={5}>
                                        <TextField
                                            fullWidth
                                            label="Date of Birth"
                                            variant="outlined"
                                            size="small"
                                            type="date"
                                            slotProps={{ inputLabel: { shrink: true } }}
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            error={!isFieldValid("dateOfBirth") && touched.dateOfBirth}
                                            helperText={getFieldError("dateOfBirth")}
                                        />
                                    </Grid>
                                    <Grid size={5}>
                                        <TextField
                                        fullWidth
                                        label="Aadhaar Number"
                                        variant="outlined"
                                        size="small"
                                        name="aadhaarNumber"
                                        value={formData.aadhaarNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        type='number'
                                        error={touched.aadhaarNumber && (!/^\d{12}$/.test(formData.aadhaarNumber) || formData.aadhaarNumber.length !== 12)}
                                        helperText={touched.aadhaarNumber && (!/^\d{12}$/.test(formData.aadhaarNumber) || formData.aadhaarNumber.length !== 12) ? "Aadhaar Number must be a 12-digit number" : ""}
                                        />
                                    </Grid>
                                    <Grid size={5}>
                                        <TextField
                                            fullWidth
                                            label="Pan Number"
                                            variant="outlined"
                                            size="small"
                                            name="panNumber"
                                            value={formData.panNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            error={!isFieldValid("panNumber") && touched.panNumber}
                                            helperText={getFieldError("panNumber")}
                                        />
                                    </Grid>
                                    <Grid size={5}>
                                        <TextField
                                            fullWidth
                                            label="Contact Number"
                                            variant="outlined"
                                            size="small"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            error={touched.contactNumber && (!/^\d{10}$/.test(formData.contactNumber) || formData.contactNumber.length !== 10)}
                                            helperText={touched.contactNumber && (!/^\d{10}$/.test(formData.contactNumber) || formData.contactNumber.length !== 10) ? "Contact Number must be a 10-digit number" : ""}  
                                            type='number'
                                            slotProps={{ htmlInput: { maxLength: 10 } }}
                                        />
                                    </Grid>
                                    <Grid size={5}>
                                        <TextField
                                        select
                                        fullWidth
                                        label="Blood Group"
                                        variant="outlined"
                                        size="small"
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={!isFieldValid("bloodGroup") && touched.bloodGroup}
                                        helperText={getFieldError("bloodGroup")}
                                        >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={5}>
                                        <TextField
                                        fullWidth
                                        label="Personal Email ID"
                                        variant="outlined"
                                        size="small"
                                        name="personalEmail"
                                        value={formData.personalEmail}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={!isFieldValid("personalEmail") && touched.personalEmail}
                                        helperText={getFieldError("personalEmail")}
                                        />
                                    </Grid>
                                    <Grid size={10} >
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={() => handlePISave("PI")}
                                                disabled={!isPanelValid(["firstName", "lastName", "gender", "dateOfBirth", "aadhaarNumber", "panNumber", "contactNumber", "bloodGroup", "personalEmail"])}
                                            >
                                            Save
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Panel>
                            <Panel title="Contact Information">
                                <Grid container rowSpacing={1} columnSpacing={3} sx={{overflowY: "auto", maxHeight: 380}}>
                                    <Typography variant="h7" sx={{ fontWeight: 900 }}>Address</Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} size={12}>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Address Line 1"
                                                variant="outlined"
                                                size="small"
                                                name="addressLine1"
                                                value={formData.addressLine1}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("addressLine1") && touched.addressLine1}
                                                helperText={getFieldError("addressLine1")}
                                                maxLength={200}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Address Line 2"
                                                variant="outlined"
                                                size="small"
                                                name="addressLine2"
                                                value={formData.addressLine2}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("addressLine2") && touched.addressLine2}
                                                helperText={getFieldError("addressLine2")}
                                                maxLength={200}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="State"
                                                variant="outlined"
                                                size="small"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                maxLength={80}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="City"
                                                variant="outlined"
                                                size="small"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("state") && touched.state}
                                                helperText={getFieldError("state")}
                                                maxLength={80}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Zip"
                                                variant="outlined"
                                                size="small"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("city") && touched.city}
                                                helperText={getFieldError("city")}
                                                maxLength={10}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Landmark"
                                                variant="outlined"
                                                size="small"
                                                name="landmark"
                                                value={formData.landmark}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("zip") && touched.zip}
                                                helperText={getFieldError("zip")}
                                                maxLength={80}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h7" sx={{ fontWeight: 900 }}>Alternative Contact Number</Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} size={12}>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Alternative Contact Number"
                                                variant="outlined"
                                                size="small"
                                                name="alternativeContactNumber"
                                                value={formData.alternativeContactNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={touched.alternativeContactNumber && (!/^\d{10}$/.test(formData.alternativeContactNumber) || formData.alternativeContactNumber.length !== 10)}
                                                helperText={touched.alternativeContactNumber && (!/^\d{10}$/.test(formData.alternativeContactNumber) || formData.alternativeContactNumber.length !== 10) ? "Alternative Contact Number must be a 10-digit number" : ""}  
                                                type='number'
                                                slotProps={{ htmlInput: { maxLength: 10 } }}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Alternative Email"
                                                variant="outlined"
                                                size="small"
                                                name="alternativeEmail"
                                                value={formData.alternativeEmail}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("alternativeEmail") && touched.alternativeEmail}
                                                helperText={getFieldError("alternativeEmail")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h7" sx={{ fontWeight: 900 }}>Emergency Contact Section</Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} size={12}>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Emergency Contact Name"
                                                variant="outlined"
                                                size="small"
                                                name="emergencyContactName"
                                                value={formData.emergencyContactName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("emergencyContactName") && touched.emergencyContactName}
                                                helperText={getFieldError("emergencyContactName")}
                                                maxLength={80}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Emergency Contact Relation"
                                                variant="outlined"
                                                size="small"
                                                name="emergencyContactRelation"
                                                value={formData.emergencyContactRelation}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("emergencyContactRelation") && touched.emergencyContactRelation}
                                                helperText={getFieldError("emergencyContactRelation")}
                                                maxLength={80}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Emergency Contact ID"
                                                variant="outlined"
                                                size="small"
                                                name="emergencyContactId"
                                                value={formData.emergencyContactId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("emergencyContactId") && touched.emergencyContactId}
                                                helperText={getFieldError("emergencyContactId")}
                                                maxLength={80}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Emergency Contact Number"
                                                variant="outlined"
                                                size="small"
                                                name="emergencyContactNumber"
                                                value={formData.emergencyContactNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={touched.emergencyContactNumber && (!/^\d{10}$/.test(formData.emergencyContactNumber) || formData.emergencyContactNumber.length !== 10)}
                                                helperText={touched.emergencyContactNumber && (!/^\d{10}$/.test(formData.emergencyContactNumber) || formData.emergencyContactNumber.length !== 10) ? "Emergency Contact Number must be a 10-digit number" : ""}  
                                                type='number'
                                                slotProps={{ htmlInput: { maxLength: 10 } }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h7" sx={{ fontWeight: 900 }}>Other Info</Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} size={12}>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Highest Degree Earned"
                                                variant="outlined"
                                                size="small"
                                                name="highestDegree"
                                                value={formData.highestDegree}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("highestDegree") && touched.highestDegree}
                                                helperText={getFieldError("highestDegree")}
                                                maxLength={80}
                                            />
                                        </Grid>
                                        <Grid size={5}>
                                            <TextField
                                                fullWidth
                                                label="Last Company Name"
                                                variant="outlined"
                                                size="small"
                                                name="lastCompanyName"
                                                value={formData.lastCompanyName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("lastCompanyName") && touched.lastCompanyName}
                                                helperText={getFieldError("lastCompanyName")}
                                                maxLength={80}
                                            />
                                        </Grid>
                                    </Grid>
                                    {
                                        isEdit && (
                                        <Grid size={10} mt={2} >
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={() => handleCISave()}
                                                disabled={!isPanelValid(["addressLine1", "addressLine2", "state", "city", "zip", "landmark", 
                                                    "alternativeContactNumber", "alternativeEmail", "emergencyContactName", "emergencyContactRelation", 
                                                    "emergencyContactId", "emergencyContactNumber", "highestDegree", "lastCompanyName" ])}
                                            >
                                                Save
                                            </Button>
                                            </Box>
                                        </Grid>
                                        )
                                    }
                                </Grid>
                            </Panel>
                            <Panel title="Financial Details"></Panel>
                            <Panel title="Admin Section"></Panel>
                            <Panel title="Uploads"></Panel>
                            <Panel title="Activation"></Panel>
                        </Tabs>
                    </Grid>
                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EmployeeFormModal;