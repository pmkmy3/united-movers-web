import React, { useState } from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import { TextField, Box, Container, CssBaseline, Typography, Grid2 as Grid, IconButton, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const employees = [
    { id: 1, firstName: 'John', lastName: 'Doe', gender: 'Female', dob: '1991-01-02', email: 'john.doe@example.com', contactNumber: '918765410', bloodGroup: 'A+' },
    { id: 2, firstName: 'Emily', lastName: 'Smith', gender: 'Male', dob: '1992-02-03', email: 'emily.smith@example.com', contactNumber: '928765421', bloodGroup: 'A-' },
    { id: 3, firstName: 'Michael', lastName: 'Brown', gender: 'Female', dob: '1993-03-04', email: 'michael.brown@example.com', contactNumber: '938765432', bloodGroup: 'B+' },
    { id: 4, firstName: 'Sarah', lastName: 'Johnson', gender: 'Male', dob: '1994-04-05', email: 'sarah.johnson@example.com', contactNumber: '948765443', bloodGroup: 'B-' },
    { id: 5, firstName: 'David', lastName: 'Williams', gender: 'Female', dob: '1995-05-06', email: 'david.williams@example.com', contactNumber: '958765454', bloodGroup: 'O+' },
    { id: 6, firstName: 'Emma', lastName: 'Jones', gender: 'Male', dob: '1996-06-07', email: 'emma.jones@example.com', contactNumber: '968765465', bloodGroup: 'O-' },
    { id: 7, firstName: 'Daniel', lastName: 'Garcia', gender: 'Female', dob: '1997-07-08', email: 'daniel.garcia@example.com', contactNumber: '978765476', bloodGroup: 'AB+' },
    { id: 8, firstName: 'Olivia', lastName: 'Martinez', gender: 'Male', dob: '1998-08-09', email: 'olivia.martinez@example.com', contactNumber: '988765487', bloodGroup: 'AB-' },
    { id: 9, firstName: 'Matthew', lastName: 'Rodriguez', gender: 'Female', dob: '1999-09-10', email: 'matthew.rodriguez@example.com', contactNumber: '998765498', bloodGroup: 'A+' },
    { id: 10, firstName: 'Sophia', lastName: 'Hernandez', gender: 'Male', dob: '1990-01-11', email: 'sophia.hernandez@example.com', contactNumber: '908765409', bloodGroup: 'A-' },
    { id: 11, firstName: 'James', lastName: 'Lopez', gender: 'Female', dob: '1991-02-12', email: 'james.lopez@example.com', contactNumber: '918765410', bloodGroup: 'B+' },
    { id: 12, firstName: 'Isabella', lastName: 'Gonzalez', gender: 'Male', dob: '1992-03-13', email: 'isabella.gonzalez@example.com', contactNumber: '928765421', bloodGroup: 'B-' },
    { id: 13, firstName: 'Benjamin', lastName: 'Wilson', gender: 'Female', dob: '1993-04-14', email: 'benjamin.wilson@example.com', contactNumber: '938765432', bloodGroup: 'O+' },
    { id: 14, firstName: 'Mia', lastName: 'Anderson', gender: 'Male', dob: '1994-05-15', email: 'mia.anderson@example.com', contactNumber: '948765443', bloodGroup: 'O-' },
    { id: 15, firstName: 'William', lastName: 'Thomas', gender: 'Female', dob: '1995-06-16', email: 'william.thomas@example.com', contactNumber: '958765454', bloodGroup: 'AB+' },
    { id: 16, firstName: 'Charlotte', lastName: 'Taylor', gender: 'Male', dob: '1996-07-17', email: 'charlotte.taylor@example.com', contactNumber: '968765465', bloodGroup: 'AB-' },
    { id: 17, firstName: 'Alexander', lastName: 'Moore', gender: 'Female', dob: '1997-08-18', email: 'alexander.moore@example.com', contactNumber: '978765476', bloodGroup: 'A+' },
    { id: 18, firstName: 'Amelia', lastName: 'Jackson', gender: 'Male', dob: '1998-09-19', email: 'amelia.jackson@example.com', contactNumber: '988765487', bloodGroup: 'A-' },
    { id: 19, firstName: 'Ethan', lastName: 'White', gender: 'Female', dob: '1999-01-20', email: 'ethan.white@example.com', contactNumber: '998765498', bloodGroup: 'B+' },
    { id: 20, firstName: 'Harper', lastName: 'Harris', gender: 'Male', dob: '1990-02-21', email: 'harper.harris@example.com', contactNumber: '908765409', bloodGroup: 'B-' }
];
  
  
  
const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1  },
    { field: 'gender', headerName: 'Gender', flex: 0.5  },
    { field: 'dob', headerName: 'DOB', flex: 0.5, sortable: true },
    { field: 'email', headerName: 'Email', flex: 1  },
    { field: 'contactNumber', headerName: 'Contact Number', flex: 0.5  },
    { field: 'bloodGroup', headerName: 'Blood Group', flex: 0.5 },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 0.5,
        renderCell: (params) => (
            <div>
                <IconButton
                    color="primary"
                    size="small"
                    style={{ marginRight: 8 }}
                    onClick={() => handleEdit(params.row)}
                    sx={{ width: "50px", Height: "50px" }}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </IconButton>
                <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => handleActivate(params.row)}
                    sx={{ width: "50px", Height: "50px" }}
                >
                    <FontAwesomeIcon icon={faCheckCircle} />
                </IconButton>
            </div>
        ),
    },
];

const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
};

const handleEdit = (row) => {
    // Add logic to handle editing the employee
    console.log("Edit", row);
};

const handleActivate = (row) => {
    // Add logic to handle activating the employee
    console.log("Activate", row);
};

const EmployeeList = () => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(employees);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);
        setFilteredData(
            employees.filter((employee) =>
                Object.keys(employee).some((key) =>
                    String(employee[key]).toLowerCase().includes(value)
                )
            )
        );
    };

       
    return (
        <Container component="main" maxWidth={false} sx={{ maxwidth: '100%'  }}>
            <CssBaseline />
            <Box sx={{ mt: 0 }}>
                <Typography component="h3" variant="h5">
                    Employees
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            size="small"
                            id="search"
                            label="Search"
                            name="search"
                            autoComplete="off"
                            onChange={handleSearch}
                        />
                    </Grid>
                    <Grid size={6} sx={{ textAlign: 'right', marginTop: 2.5 }}>
                        <Button variant="contained" color="primary">
                            Add New
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ minHeight: "100%", width: '100%' }}>
                    <DataGrid
                        rows={filteredData}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10, 20, 50]}
                        paginationMode="client"
                        rowCount={filteredData.length}
                        disableRowSelectionOnClick
                        rowHeight={35}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        sx={{
                            "& .MuiDataGrid-footerContainer": {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              flexWrap: "nowrap"
                            },
                            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                                margin: "0 8px"
                            },
                            "& .MuiTablePagination-toolbar": {
                                alignItems: "center", // Ensures vertical centering of the pagination toolbar content
                                display: "flex",
                                flexWrap: "nowrap"
                            }
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default EmployeeList;

