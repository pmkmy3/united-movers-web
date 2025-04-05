import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, fetchEmployeeDocumentTypes, fetchEmployeeRoles, activateOrDeactivateEmployee } from '../../store/reducers/employeeSlice';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import { TextField, Box, Container, CssBaseline, Typography, Grid2 as Grid, IconButton, Button, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import EmployeeFormModal from './EmployeeFormModal';
import ActivateEmployeeModal from './ActivateEmployeeModal';
import UserRolesModal from '../employee/UserRolesModal';


const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};

const EmployeeList = () => {
    const { employees, employeeDocumentTypes, employeeRoles, loading, error } = useSelector(state => state.employees);

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [activateModalOpen, setActivateModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [userRolesModalOpen, setUserRolesModalOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchEmployees());
        dispatch(fetchEmployeeDocumentTypes());
        dispatch(fetchEmployeeRoles());
    }, [dispatch]);

    useEffect(() => {
        setFilteredEmployees(employees);
    }, [employees]);

    useEffect(() => {
        if (searchText !== '' && searchText.length >= 3) {
            const value = searchText.toLowerCase();
            const filteredData = employees.filter((employee) =>
                Object.keys(employee).some((key) =>
                    String(employee[key]).toLowerCase().includes(value)
                )
            );
            setFilteredEmployees(filteredData);
        } else {
            setFilteredEmployees(employees);
        }
    }, [searchText, employees]);

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleActivate = (row) => {
        setSelectedEmployee(row);
        setActivateModalOpen(true);
    };

    const handleAssignUserRole = (employee) => {
        setSelectedEmployee(employee);
        setUserRolesModalOpen(true); 
    };   

    const handleActivateSubmit = async (data) => {
        const response = await dispatch(activateOrDeactivateEmployee(data));
        if (response.payload) {
            reloadGrid();
        }
        setActivateModalOpen(false);
    };

    const reloadGrid = () => {
        dispatch(fetchEmployees());
    };

    const columns = [
        { field: 'firstName', headerName: 'First Name', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', flex: 1 },
        { field: 'personalEmailID', headerName: 'Email', flex: 1 },
        { field: 'contactNumber', headerName: 'Contact Number', flex: 0.7 },
        { field: 'aadhaarNumber', headerName: 'Aadhaar Number', flex: 0.7 },
        { field: 'panNumber', headerName: 'PAN Number', flex: 0.6 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            sortable: false, filterable: false,
            renderCell: (params) => (
                <div style={{ display: 'flex' }}>
                    <EmployeeFormModal employeeID={params.row.employeeID} employeeDocumentTypes={employeeDocumentTypes} reloadGrid={reloadGrid} />
                    <IconButton
                        color="secondary"
                        size="small"
                        onClick={() => handleActivate(params.row)}
                        sx={{ width: "40px", Height: "40px" }}
                    >
                        <Tooltip title="Activate Employee" arrow>
                            <FontAwesomeIcon icon={(params.row.isActive) ? faCheckSquare : faSquare} color='#1976d2' />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        color="secondary"
                        size="small"
                        onClick={() => handleAssignUserRole(params.row)}
                        sx={{ width: "40px", Height: "40px" }}
                    >
                        <Tooltip title="Modify Roles" arrow>
                            <FontAwesomeIcon icon={faCircleUser} color='#1976d2' />
                        </Tooltip>
                    </IconButton>
                </div>
            ),
        },
    ];


    return (
        <Container component="main" maxWidth={false} sx={{ maxwidth: '100%' }}>
            <CssBaseline />
            <Box sx={{ mt: 0 }}>
                <Typography component="h3" variant="h5">
                    Employees
                </Typography>
                <Grid container spacing={12}>
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
                            sx={{ width: '50%' }}
                        />
                    </Grid>
                    <Grid size={6} sx={{ textAlign: 'right', marginTop: 2.5 }}>
                        <EmployeeFormModal reloadGrid={reloadGrid} />
                    </Grid>
                </Grid>
                <Box sx={{ minHeight: "100%", width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row.employeeID}
                        rows={filteredEmployees}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10, 20, 50]}
                        paginationMode="client"
                        rowCount={filteredEmployees.length}
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
            {selectedEmployee && (
                <ActivateEmployeeModal
                    open={activateModalOpen}
                    handleClose={() => setActivateModalOpen(false)}
                    handleActivate={handleActivateSubmit}
                    employeeID={selectedEmployee.employeeID}
                    isActive={selectedEmployee.isActive}
                />
            )}
            {selectedEmployee && (
                <UserRolesModal
                    employeeRoles={employeeRoles} 
                    open={userRolesModalOpen}
                    handleClose={() => setUserRolesModalOpen(false)}
                    handleAssignRoles={() => { /* logic */ }}
                    employeeID={selectedEmployee.employeeID}
                />
            )}
        </Container>
    );
}

export default EmployeeList;

