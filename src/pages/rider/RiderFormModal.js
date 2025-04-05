import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRiderById, addRider, updateRiderPI, updateRiderCI, updateRiderFD, updateRiderAC } from '../../store/reducers/riderSlice';
import {
    Modal, Box, TextField, Button, Typography, Grid2 as Grid, MenuItem,
    IconButton, Tooltip, FormControl, FormLabel, RadioGroup,
    FormControlLabel, Radio, InputLabel, Select
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Tabs from "../../components/tabPanel/Tabs";
import Panel from "../../components/tabPanel/Panel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSquarePlus, faSquareMinus } from '@fortawesome/free-regular-svg-icons';


const RiderFormModal = ({ riderID, vendors, reloadGrid }) => {

    const [open, setOpen] = useState(false);
    let [formData, setFormData] = useState({
        vendorID: "",
        referenceName: "",
        fullName: "",
        gender: "",
        dateOfBirth: "",
        aadharCardNumber: "",
        panNumber: "",
        bloodGroup: "",
        contactNumber: "",
        emailID: "",
        alternativeContactNumber: "",
        alternativeEmail: "",
        emergencyContactNumber: "",
        emergencyContactPersonID: "",
        emergencyContactRelation: "",
        emergencyContactName: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        city: "",
        zip: "",
        landmark: "",
        highestDegreeEarned: "",
        previousOrgName: "",
        bankAccountNumber: "",
        bankName: "",
        bankIFSCCode: "",
        uanNumber: "",
        insurancePolicyNumber: "",
        insurerName: "",
        insuranceStartDate: "",
        insuranceEndDate: "",
        familyMemberName: "",
        familyMemberRelation: "",
        familyMemberIDType: "",
        familyMemberID: "",
        familyMemberContact: "",
        isBackgroundVerificationCompleted: false,
        isPhysicalVerificationCompleted: false,
        backgroundVerificationAgencyName: "",
        isAadhaarVerified: false,
        isContactNumberVerified: false,
        additionalNotes: "",
        createdByID: 0,
        createdDate: ""
    });

    const dispatch = useDispatch();
    const [touched, setTouched] = useState({});
    const [documentType, setDocumentType] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (riderID && open) {
            dispatch(fetchRiderById(riderID)).then((response) => {
                const data = response.payload;
                setFormData({
                    ...data,
                    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : "",
                    insuranceStartDate: data.insuranceStartDate ? data.insuranceStartDate.split('T')[0] : "",
                    insuranceEndDate: data.insuranceEndDate ? data.insuranceEndDate.split('T')[0] : ""
                });
            });
        }
    }, [dispatch, riderID, open]);

    useEffect(() => {
        if (updateSuccess) {
            handleClose();
            reloadGrid();
            setUpdateSuccess(false);
        }
    }, [updateSuccess, reloadGrid]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0] || null;
        setUploadedFile(file);
    };

    const handleDocumentTypeChange = (e) => {
        setDocumentType(e.target.value);
        setUploadedFile(null);
    }

    const handleAddAttachmentFile = () => {
        if (uploadedFile && documentType) {
            setAttachments([...attachments, { uploadedFile, documentType, lastModifiedDate: new Date() }]);
            setDocumentType('');
            setUploadedFile(null);
        }
    }

    const handleDeleteAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "aadharCardNumber": {
                if (!/^\d*$/.test(value) || value.length > 12) return;
                break;
            }
            case "contactNumber": {
                if (!/^\d*$/.test(value) || value.length > 10) return;
                break;
            }
            case 'hasBackgroundVerification': {
                if (value === "Yes") {
                    formData = { ...formData, hasPhysicalVerificationDone: "No" };
                    formData.agencyName = "";
                }
                break;
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };
    const handleUploadSave = async () => {

    }


    const getFieldError = (field) => {
        return !isFieldValid(field) && touched[field] ? "This field is required" : "";
    };

    const isPanelValid = (fields) => {
        return fields.every((field) => isFieldValid(field));
    };
    const isFieldValid = (field) => {
        if (field === "emailID" || field === "alternativeEmail") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(formData[field]);
        }
        else if (field === "alternativeContactNumber" || field === "emergencyContactNumber") {
            const contactNumberRegex = /^\d{10}$/;
            return contactNumberRegex.test(formData[field]);
        }
        else if (typeof formData[field] === "string") {
            return formData[field].trim() !== "";
        }
        return formData[field] !== "";
    };
    const handlePISave = async () => {
        try {
            const piData = {
                fullName: formData.fullName,
                vendorID: formData.vendorID,
                referenceName: formData.referenceName,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                aadhaarNumber: formData.aadharCardNumber,
                pan: formData.panNumber,
                contactNumber: formData.contactNumber,
                bloodGroup: formData.bloodGroup,
                personalEmailID: formData.emailID,
                loggedInUserID: -1
            }
            if (riderID) {
                let reqObj = { ...piData, riderID };
                await dispatch(updateRiderPI(reqObj));
            } else {

                await dispatch(addRider(piData));
            }
            setUpdateSuccess(true);
        } catch (err) {
            console.error(err);
        } finally {
            handleClose();
        }
    };
    const handleASSave = async () => {
        // try {
        //     const aData = {
        //         hasBackgroundVerification: formData.hasBackgroundVerification,
        //         agencyName: formData.agencyName,
        //         hasPhysicalVerificationDone: formData.hasPhysicalVerificationDone
        //     }
        //     if (riderID) {
        //         let data = await dispatch(updateAdditionalChecksDetails(...aData, riderID));
        //     }
        // }
        // catch (err) {

        // } finally {
        //     handleClose();
        // }
    }
    const handleCISave = async () => {
        try {
            const ciData = {
                riderID: riderID,
                alternativeContactNumber: formData.alternativeContactNumber,
                alternativeEmail: formData.alternativeEmail,
                emergencyContactName: formData.emergencyContactName,
                emergencyContactRelation: formData.emergencyContactRelation,
                emergencyContactPersonID: formData.emergencyContactPersonID,
                emergencyContactNumber: formData.emergencyContactNumber,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                state: formData.state,
                city: formData.city,
                zip: formData.zip,
                landmark: formData.landmark,
                highestDegreeEarned: formData.highestDegreeEarned,
                previousOrgName: formData.previousOrgName,
                loggedInUserID: -1
            };

            if (riderID) {
                await dispatch(updateRiderCI(ciData));
                setUpdateSuccess(true);
            }

        } catch (err) {
            console.error(err);
        } finally {
            handleClose();
        }
    };

    const handleFDSave = async () => {
        try {
            const financialData = {
                riderID,
                bankName: formData.bankName,
                bankAccountNumber: formData.bankAccountNumber,
                bankIFSCCode: formData.bankIFSCCode,
                uanNumber: formData.uanNumber,
                insurancePolicyNumber: formData.insurancePolicyNumber,
                insurerName: formData.insurerName,
                insuranceStartDate: formData.insuranceStartDate,
                insuranceEndDate: formData.insuranceEndDate
            };

            if (riderID) {
                await dispatch(updateRiderFD(financialData));
                setUpdateSuccess(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            handleClose();
        }
    };

    const handleACSave = async () => {
        try {
            const additionalChecksData = {
                familyMembers: formData.familyMembers.map(member => ({
                    name: member.name,
                    familyMemberRelation: member.familyMemberRelation,
                    familyMemberIDType: member.familyMemberIDType,
                    familyMemberID: member.familyMemberID,
                    contactNumber: member.contactNumber
                })),
                backgroundVerification: {
                    completed: formData.backgroundVerification.completed,
                    agencyName: formData.backgroundVerification.agencyName || "N/A",
                    physicalVerificationCompleted: formData.backgroundVerification.physicalVerificationCompleted,
                    isAadhaarVerificationDone: formData.backgroundVerification.isAadhaarVerificationDone,
                    isContactNumberVerified: formData.backgroundVerification.isContactNumberVerified
                },
                attachments: formData.attachments
            };

            if (riderID) {
                await dispatch(updateRiderAC(additionalChecksData));
                setUpdateSuccess(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            handleClose();
        }
    };
   


    return (
        <>
            {
                riderID ?
                    (
                        <IconButton
                            color="primary"
                            size="small"
                            onClick={handleOpen}
                            sx={{ width: "40px", Height: "40px" }}
                        >
                            <Tooltip title="Edit Rider" arrow><FontAwesomeIcon icon={faEdit} /></Tooltip>
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
                    <Grid container spacing={3} >
                        <Grid size={6}>
                            <Typography id="modal-title" variant="h6" sx={{ fontWeight: 900 }}>Rider Form</Typography>
                        </Grid>
                        <Grid size={6} sx={{ textAlign: 'right' }}>
                            <CloseRoundedIcon style={{ 'color': "red", 'cursor': "pointer" }} onClick={handleClose} />
                        </Grid>
                        <Tabs selected={0} isReadOnly={!(riderID)} >
                            <Panel title="Personal Information">
                                <Grid container rowSpacing={2} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                    <Grid size={5} sx={{ marginTop: 1 }}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            variant="outlined"
                                            size="small"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            error={!isFieldValid("fullName") && touched.fullName}
                                            helperText={getFieldError("fullName")}
                                        />
                                    </Grid>
                                    <Grid size={5} sx={{ marginTop: 1 }} >
                                        <TextField
                                            fullWidth
                                            label="Vendor Name"
                                            variant="outlined"
                                            size="small"
                                            name="vendorID"
                                            value={formData.vendorID}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            error={!isFieldValid("vendorID") && touched.vendorID}
                                            helperText={getFieldError("vendorID")}
                                            select
                                        >
                                            {vendors && vendors.map((vendor) => (
                                                <MenuItem key={vendor.id} value={vendor.id}>
                                                    {vendor.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid size={5} sx={{ marginTop: 0.4 }} >
                                        <TextField
                                            fullWidth
                                            label="Reference Name"
                                            variant="outlined"
                                            size="small"
                                            name="referenceName"
                                            value={formData.referenceName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            error={!isFieldValid("referenceName") && touched.referenceName}
                                            helperText={getFieldError("referenceName")}
                                        />
                                    </Grid>
                                    <Grid size={5} sx={{ marginTop: 1 }}>
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
                                    <Grid size={5} sx={{ marginTop: 1 }}>
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
                                    <Grid size={5} sx={{ marginTop: 1 }}>
                                        <TextField
                                            fullWidth
                                            label="Aadhaar Number"
                                            variant="outlined"
                                            size="small"
                                            name="aadharCardNumber"
                                            value={formData.aadharCardNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            type='number'
                                            error={touched.aadharCardNumber && (!/^\d{12}$/.test(formData.aadharCardNumber) || formData.aadharCardNumber.length !== 12)}
                                            helperText={touched.aadharCardNumber && (!/^\d{12}$/.test(formData.aadharCardNumber) || formData.aadharCardNumber.length !== 12) ? "Aadhaar Number must be a 12-digit number" : ""}
                                        />
                                    </Grid>
                                    <Grid size={5} sx={{ marginTop: 1 }}>
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
                                    <Grid size={5} sx={{ marginTop: 1 }}>
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
                                    <Grid size={5} sx={{ marginTop: 1 }}>
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
                                    <Grid size={5} sx={{ marginTop: 1 }}>
                                        <TextField
                                            fullWidth
                                            label="Email ID"
                                            variant="outlined"
                                            size="small"
                                            name="emailID"
                                            value={formData.emailID}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            error={!isFieldValid("emailID") && touched.emailID}
                                            helperText={getFieldError("emailID")}
                                        />
                                    </Grid>
                                    <Grid size={10} sx={{ mt: 2, mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={() => handlePISave()}
                                                disabled={!isPanelValid(["fullName", "vendorID", "referenceName", "gender", "dateOfBirth", "aadharCardNumber", "panNumber", "contactNumber", "bloodGroup", "emailID"])}
                                            >
                                                Save
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Panel>
                            <Panel title="Contact Information" >
                                <Box sx={{ overflowY: 'auto', maxHeight: 350 }}>
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 2, fontWeight: "bold" }}>
                                        Alternative Contact Section
                                    </Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="Alternative Contact Number"
                                                variant="outlined"
                                                size="small"
                                                name="alternativeContactNumber"
                                                type="number"
                                                value={formData.alternativeContactNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("alternativeContactNumber") && touched.alternativeContactNumber}
                                                helperText={getFieldError("alternativeContactNumber")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }} >
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
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 2, fontWeight: "bold" }}>
                                        Emergency Contact
                                    </Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
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
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }} >
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
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }} >
                                            <TextField
                                                fullWidth
                                                label="Emergency Contact ID"
                                                variant="outlined"
                                                size="small"
                                                name="emergencyContactPersonID"
                                                value={formData.emergencyContactPersonID}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("emergencyContactPersonID") && touched.emergencyContactPersonID}
                                                helperText={getFieldError("emergencyContactPersonID")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1, mb: 1 }} >
                                            <TextField
                                                fullWidth
                                                label="Emergency Contact Phone"
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                name="emergencyContactNumber"
                                                value={formData.emergencyContactNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("emergencyContactNumber") && touched.emergencyContactNumber}
                                                helperText={getFieldError("emergencyContactNumber")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 2, fontWeight: "bold" }}>
                                        Address
                                    </Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
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
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }} >
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
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }} >
                                            <TextField
                                                fullWidth
                                                label="State"
                                                variant="outlined"
                                                size="small"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("state") && touched.state}
                                                helperText={getFieldError("state")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }} >
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
                                                error={!isFieldValid("city") && touched.city}
                                                helperText={getFieldError("city")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }} >
                                            <TextField
                                                fullWidth
                                                label="Zip"
                                                variant="outlined"
                                                size="small"
                                                name="zip"
                                                type="number"
                                                value={formData.zip}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("zip") && touched.zip}
                                                helperText={getFieldError("zip")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
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
                                                error={!isFieldValid("landmark") && touched.landmark}
                                                helperText={getFieldError("landmark")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 2, fontWeight: "bold" }}>
                                        Other Info
                                    </Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="Highest Degree Earned"
                                                variant="outlined"
                                                size="small"
                                                name="highestDegreeEarned"
                                                value={formData.highestDegreeEarned}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                sx={{ height: 32 }}
                                                error={!isFieldValid("highestDegreeEarned") && touched.highestDegreeEarned}
                                                helperText={getFieldError("highestDegreeEarned")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="Last Company Name"
                                                variant="outlined"
                                                size="small"
                                                name="previousOrgName"
                                                value={formData.previousOrgName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("previousOrgName") && touched.previousOrgName}
                                                helperText={getFieldError("previousOrgName")}
                                            />
                                        </Grid>
                                        <Grid size={10} sx={{ mt: 2, mb: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleCISave()}
                                                    disabled={!isPanelValid(["alternativeContactNumber", "alternativeEmail", "emergencyContactName", "emergencyContactRelation", "emergencyContactPersonID", "emergencyContactNumber", "addressLine1", "addressLine2", "state", "city", "zip", "landmark", "highestDegreeEarned", "previousOrgName"])}
                                                >
                                                    Save
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Panel>
                            <Panel title="Financial Details">
                                <Box sx={{ overflowY: 'auto', maxHeight: 350 }}>
                                    {/* Bank Account Details */}
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 2, fontWeight: "bold" }}>
                                        Bank Account Details
                                    </Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }} >
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="Bank Name"
                                                variant="outlined"
                                                size="small"
                                                name="bankName"
                                                value={formData.bankName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("bankName") && touched.bankName}
                                                helperText={getFieldError("bankName")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="Bank Account Number"
                                                variant="outlined"
                                                size="small"
                                                name="bankAccountNumber"
                                                value={formData.bankAccountNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("bankAccountNumber") && touched.bankAccountNumber}
                                                helperText={getFieldError("bankAccountNumber")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="IFSC Code"
                                                variant="outlined"
                                                size="small"
                                                name="bankIFSCCode"
                                                value={formData.bankIFSCCode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("bankIFSCCode") && touched.bankIFSCCode}
                                                helperText={getFieldError("bankIFSCCode")}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* EPF Details */}
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 1, fontWeight: "bold" }}>
                                        EPF Details
                                    </Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="UAN Number"
                                                variant="outlined"
                                                size="small"
                                                type="number"
                                                name="uanNumber"
                                                value={formData.uanNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("uanNumber") && touched.uanNumber}
                                                helperText={getFieldError("uanNumber")}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Insurance Details */}
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 1, fontWeight: "bold" }}>
                                        Insurance Details
                                    </Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="Policy Number"
                                                variant="outlined"
                                                size="small"
                                                name="insurancePolicyNumber"
                                                value={formData.insurancePolicyNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("insurancePolicyNumber") && touched.insurancePolicyNumber}
                                                helperText={getFieldError("insurancePolicyNumber")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField
                                                fullWidth
                                                label="Insurer Name"
                                                variant="outlined"
                                                size="small"
                                                name="insurerName"
                                                value={formData.insurerName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("insurerName") && touched.insurerName}
                                                helperText={getFieldError("insurerName")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 2 }}>
                                            <TextField
                                                fullWidth
                                                label="Start Date"
                                                variant="outlined"
                                                size="small"
                                                type="date"
                                                slotProps={{ inputLabel: { shrink: true } }}
                                                name="insuranceStartDate"
                                                value={formData.insuranceStartDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("insuranceStartDate") && touched.insuranceStartDate}
                                                helperText={getFieldError("insuranceStartDate")}
                                            />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 2 }}>
                                            <TextField
                                                fullWidth
                                                label="End Date"
                                                variant="outlined"
                                                size="small"
                                                type="date"
                                                slotProps={{ inputLabel: { shrink: true } }}
                                                name="insuranceEndDate"
                                                value={formData.insuranceEndDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                error={!isFieldValid("insuranceEndDate") && touched.insuranceEndDate}
                                                helperText={getFieldError("insuranceEndDate")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid size={10} sx={{ mt: 2, mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={() => handleFDSave()}
                                                disabled={!isPanelValid(["bankName", "bankAccountNumber", "bankIFSCCode", "uanNumber", "insurancePolicyNumber", "insurerName", "insuranceStartDate", "insuranceEndDate"])}  
                                            >
                                                Save
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Panel>
                            <Panel title="Additional Checks">
                                <Box sx={{ overflowY: 'auto', maxHeight: 350 }}>
                                    {/* Family Member Details */}
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 2, fontWeight: "bold" }}>
                                        Family Member Details
                                    </Typography>
                                    <Grid container rowSpacing={1} columnSpacing={3} sx={{ mb: 2, paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField fullWidth label="Name" variant="outlined" size="small" name="familyMemberName" error={!isFieldValid("familyMemberName") && touched.familyMemberName} helperText={getFieldError("familyMemberName")} value={formData.familyMemberName} onChange={handleChange} onBlur={handleBlur} required />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField fullWidth label="Relation" variant="outlined" size="small" name="familyMemberRelation" error={!isFieldValid("familyMemberRelation") && touched.familyMemberRelation} value={formData.familyMemberRelation} helperText={getFieldError("familyMemberRelation")} onChange={handleChange} onBlur={handleBlur} required />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField fullWidth label="ID Type" variant="outlined" size="small" name="familyMemberIDType" error={!isFieldValid("familyMemberIDType") && touched.familyMemberIDType} value={formData.familyMemberIDType} helperText={getFieldError("familyMemberIDType")} onChange={handleChange} onBlur={handleBlur} required />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField fullWidth label="ID Number" variant="outlined" size="small" name="familyMemberID" error={!isFieldValid("familyMemberID") && touched.familyMemberID} value={formData.familyMemberID} helperText={getFieldError("familyMemberID")} onChange={handleChange} onBlur={handleBlur} required />
                                        </Grid>
                                        <Grid size={5} sx={{ marginTop: 1 }}>
                                            <TextField fullWidth label="Contact Number" variant="outlined" size="small" name="contactNumber" error={!isFieldValid("contactNumber") && touched.contactNumber} helperText={getFieldError("contactNumber")} value={formData.contactNumber} onChange={handleChange} onBlur={handleBlur} required />
                                        </Grid>
                                    </Grid>

                                    {/* Background Verification */}
                                    <Typography variant="h7" sx={{ paddingLeft: 5, marginBottom: 2, fontWeight: "bold" }}>
                                        Background Verification
                                    </Typography>
                                    <Grid container rowSpacing={2} columnSpacing={3} sx={{ paddingLeft: 5, maxHeight: 400, backgroundColor: "transparent" }}>
                                        <Grid size={10}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Physical Verification Completed</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-label="physical-verification"
                                                    name="hasPhysicalVerificationDone"
                                                    value={formData.hasPhysicalVerificationDone ?? "No"}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    <FormControlLabel value="NA" control={<Radio />} label="N/A" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={10}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">is Aadhaar Verified?</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-label="Aadhaar-verification"
                                                    name="isAadhaarVerificationDone"
                                                    value={formData.isAadhaarVerificationDone ?? "No"}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    <FormControlLabel value="NA" control={<Radio />} label="N/A" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={10}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">is Contact Number Verified?</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-label="Contact-verification"
                                                    name="isContactNumberVerified"
                                                    value={formData.isContactNumberVerified ?? "No"}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    <FormControlLabel value="NA" control={<Radio />} label="N/A" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={10}>
                                            <FormControl component="fieldset" >
                                                <FormLabel component="legend">Background Verification Completed</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-label="background-verification"
                                                    name="hasBackgroundVerification"
                                                    value={formData.hasBackgroundVerification ?? "No"}
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value="Yes" control={<Radio />} labelPlacement="end" label="Yes" />
                                                    <FormControlLabel value="No" control={<Radio />} labelPlacement="end" label="No" />
                                                    <FormControlLabel value="NA" control={<Radio />} labelPlacement="end" label="N/A" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        {
                                            formData.hasBackgroundVerification === "Yes" &&
                                            <>
                                                <Grid size={5}>
                                                    <TextField
                                                        fullWidth
                                                        label="Agency Name"
                                                        variant="outlined"
                                                        size="small"
                                                        name="agencyName"
                                                        value={formData.agencyName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        required
                                                        error={!isFieldValid("agencyName") && touched.agencyName}
                                                        helperText={getFieldError("agencyName")}
                                                        maxLength={80}
                                                    />
                                                </Grid>

                                            </>
                                        }
                                        {
                                            riderID && (
                                                <Grid size={10} sx={{ mt: 2, mb: 2 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleACSave()}
                                                            disabled={!isPanelValid(["familyMemberName", "familyMemberRelation", "familyMemberIDType", "familyMemberID", "contactNumber", "hasPhysicalVerificationDone", "isAadhaarVerificationDone", "isContactNumberVerified", "hasBackgroundVerification"])}
                                                        >
                                                            Save
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            )
                                        }
                                    </Grid>

                                </Box>
                            </Panel>
                            <Panel title="Attachments">
                                <Grid container rowSpacing={0} columnSpacing={3} sx={{ paddingLeft: 5, overflowY: "auto", maxHeight: 400, backgroundColor: "transparent" }}>
                                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>Upload Rider Documents</Typography>
                                    <Grid container rowSpacing={0} columnSpacing={3} size={12} sx={{ mt: 2 }}>
                                        <Grid size={5}>
                                            <FormControl fullWidth >
                                                <InputLabel id="document-type-label">Document Type</InputLabel>
                                                <Select
                                                    size="small"
                                                    labelId="document-type-label"
                                                    id="document-type"
                                                    label="Document Type"
                                                    value={documentType}
                                                    onChange={handleDocumentTypeChange}
                                                >
                                                    <MenuItem value="adhaar">Adhaar</MenuItem>
                                                    <MenuItem value="pan">PAN</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={3}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                disabled
                                                value={uploadedFile ? uploadedFile.name : ''}
                                                placeholder="No file chosen"
                                                sx={{ mt: 0, mb: 0 }}
                                            />
                                        </Grid>
                                        <Grid size={2}>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                disabled={documentType === ""}
                                            >
                                                Browse
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={handleFileUpload}
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid size={1}>
                                            <FontAwesomeIcon icon={faSquarePlus}
                                                size='2x'
                                                color={(documentType && uploadedFile) ? 'green' : 'gray'}
                                                onClick={handleAddAttachmentFile}
                                                style={{ cursor: (documentType && uploadedFile) ? "pointer" : "default" }}
                                                disabled={!(documentType || uploadedFile)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box gridColumn="span 12" sx={{ mt: 6 }}>
                                        <Typography variant="h7" sx={{ fontWeight: "bold" }}>Uploaded Documents</Typography>
                                    </Box>
                                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1} gridColumn="span 12" sx={{ mt: 3, maxHeight: 300 }}>
                                        <Box gridColumn="span 3">
                                            <Typography sx={{ fontWeight: 700 }}>Document Type</Typography>
                                        </Box>
                                        <Box gridColumn="span 4">
                                            <Typography sx={{ fontWeight: 700 }}>Name</Typography>
                                        </Box>
                                        <Box gridColumn="span 2">
                                            <Typography sx={{ fontWeight: 700 }}>Size in KB's</Typography>
                                        </Box>
                                        <Box gridColumn="span 2">
                                            <Typography sx={{ fontWeight: 700 }}>Last Modified Date</Typography>
                                        </Box>
                                        <Box gridColumn="span 1">
                                            <Typography sx={{ fontWeight: 700 }}>Actions</Typography>
                                        </Box>
                                        {attachments.map((attachment, index) => (
                                            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1} gridColumn="span 12" key={index} sx={{ height: 25 }}>
                                                <Box gridColumn="span 3"><Typography>{attachment.documentType}</Typography></Box>
                                                <Box gridColumn="span 4"><Typography>{attachment.uploadedFile?.name}</Typography></Box>
                                                <Box gridColumn="span 2"><Typography>{attachment.uploadedFile?.size}</Typography></Box>
                                                <Box gridColumn="span 2"><Typography>{attachment.lastModifiedDate?.toLocaleDateString()}</Typography></Box>
                                                <Box gridColumn="span 1">
                                                    <FontAwesomeIcon icon={faSquareMinus} size='lg' color='red' style={{ cursor: 'pointer' }} onClick={() => handleDeleteAttachment(index)} />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Grid container size={12}>
                                        <Grid size={6}></Grid>
                                        <Grid size={5} sx={{ textAlign: 'right', m: 2 }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={() => handleUploadSave()}
                                            >
                                                Save
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Panel>
                        </Tabs>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default RiderFormModal;