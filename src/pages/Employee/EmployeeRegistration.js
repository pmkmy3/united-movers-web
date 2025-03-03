import React, { useState } from "react";
import { TextField, Button, Box, Grid2 as Grid, MenuItem, Typography, Checkbox,
  FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Modal} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../../components/tabPanel/Tabs";
import Panel from "../../components/tabPanel/Panel";
import { savePersonalInformation } from "../../store/actions/personalInformationActions";

const EmployeeForm = () => {
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
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.personalInformation);

    const handleChange = (e) => {
      const { name, value, checked, type } = e.target;
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
      
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSave = (panel) => {
      dispatch(savePersonalInformation(formData));
      setOpen(false);  // Close the modal after saving
    };
    
    const isFieldValid = (field) => {
      if (field === "personalEmail") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(formData[field]);
      }
      return formData[field].trim() !== "";
    };

    const getFieldError = (field) => {
        return !isFieldValid(field) && touched[field] ? "This field is required" : "";
    };

    const isPanelValid = (fields) => {
        return fields.every((field) => isFieldValid(field));
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return (
      <Box sx={{ width: "100%" }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
            Add New
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
        >
          <Box sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: 800, height: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography id="modal-title" variant="h6" component="h2">
                Employee Form
            </Typography>
            <Tabs selected={0} >
              <Panel title="Personal Information">
                <Grid container spacing={3} sx={{overflowY: "auto", maxHeight: 600}}>
                  <Grid size={5}>
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
                      error={!isFieldValid("firstName") && touched.firstName}
                      helperText={getFieldError("firstName")}
                    />
                  </Grid>
                  <Grid size={5}>
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
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
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
                        error={!isFieldValid("contactNumber") && touched.contactNumber}
                        helperText={getFieldError("contactNumber")}
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
                  {
                    formData.employeeId === "" && (
                      <Grid size={10} >
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleSave("Personal Information")}
                          disabled={!isPanelValid(["firstName", "lastName", "gender", "dateOfBirth", "aadhaarNumber", "panNumber", "contactNumber", "bloodGroup", "personalEmail"])}
                        >
                          Save
                        </Button>
                      </Box>
                  </Grid>
                    )
                  }
                </Grid>
              </Panel>
              <Panel title="Contact Information">
                <Grid container spacing={3} sx={{overflowY: "auto", maxHeight: 600}}>
                  <Typography variant="h6" gutterBottom>Alternative Contact Number</Typography>
                  <Grid container spacing={3}>
                    <Grid size={5}>
                      <TextField
                        fullWidth
                        label="Alternative Contact Number"
                        variant="outlined"
                        size="small"
                        name="alternativeContactNumber"
                        value={formData.alternativeContactNumber}
                        onChange={handleChange}
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
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Emergency Contact Section</Typography>
                  <Grid container spacing={3}>
                    <Grid size={5}>
                      <TextField
                        fullWidth
                        label="Emergency Contact Name"
                        variant="outlined"
                        size="small"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
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
                      />
                    </Grid>
                    <Grid size={5}>
                      <TextField
                          fullWidth
                          label="Emergency Contact Phone"
                          variant="outlined"
                          size="small"
                          name="emergencyContactPhone"
                          value={formData.emergencyContactPhone}
                          onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Address</Typography>
                  <Grid container spacing={3}>
                    <Grid size={5}>
                      <TextField
                        fullWidth
                        label="Address Line 1"
                        variant="outlined"
                        size="small"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
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
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Other Info</Typography>
                  <Grid container spacing={3}>
                    <Grid size={5}>
                      <TextField
                        fullWidth
                        label="Highest Degree Earned"
                        variant="outlined"
                        size="small"
                        name="highestDegree"
                        value={formData.highestDegree}
                        onChange={handleChange}
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
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid size={10}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleSave("Contact Information")}
                        >
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Panel>
              <Panel title="Financial Details">
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Bank Account Details</Typography>
                <Grid container spacing={3}>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      label="Bank Name"
                      variant="outlined"
                      size="small"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      label="Bank Account Number"
                      variant="outlined"
                      size="small"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      label="IFSC code"
                      variant="outlined"
                      size="small"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>PF Details</Typography>
                <Grid container spacing={3}>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      label="UAN Number"
                      variant="outlined"
                      size="small"
                      name="uanNumber"
                      value={formData.uanNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Insurance Details</Typography>
                <Grid container spacing={3}>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      label="Insurance Policy Number"
                      variant="outlined"
                      size="small"
                      name="insurancePolicyNumber"
                      value={formData.insurancePolicyNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      label="Insurance Company Name"
                      variant="outlined"
                      size="small"
                      name="insuranceCompanyName"
                      value={formData.insuranceCompanyName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      label="Insurance Start Date"
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
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      label="Insurance End Date"
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
              </Panel>
              <Panel title="Admin Section">
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Back Ground Verification</Typography>
                  <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid size={10}>
                      <FormControl component="fieldset" >
                        <FormLabel component="legend">Background Verification Completed</FormLabel>
                        <RadioGroup
                          row
                          aria-label="background-verification"
                          name="hasBackgroundVerification"
                          value={formData.hasBackgroundVerification}
                          onChange={handleChange}
                        >
                          <FormControlLabel value="Yes" control={<Radio />} labelPlacement="end" label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} labelPlacement="end" label="No" />
                          <FormControlLabel value="NA" control={<Radio />} labelPlacement="end" label="N/A" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {formData.hasBackgroundVerification === "Yes" && 
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
                          />
                        </Grid>
                        <Grid size={10}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Physical Verification Completed</FormLabel>
                            <RadioGroup
                              row
                              aria-label="physical-verification"
                              name="hasPhysicalVerificationDone"
                              value={formData.hasPhysicalVerificationDone}
                              onChange={handleChange}
                            >
                              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                              <FormControlLabel value="No" control={<Radio />} label="No" />
                              <FormControlLabel value="NA" control={<Radio />} label="N/A" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </>
                    }
                </Grid>
              </Panel>
            </Tabs>
          </Box>
        </Modal>
      </Box>
    );
};

export default EmployeeForm;