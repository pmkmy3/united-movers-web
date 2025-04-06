import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRiders, fetchVendors, fetchRiderDocumentTypes } from '../../store/reducers/riderSlice';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import { TextField, Box, Container, CssBaseline, Typography, Grid2 as Grid, IconButton, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import RiderFormModal from './RiderFormModal';
import ActivateRiderModal from './ActivateRiderModal';
import { deleteRider } from '../../store/reducers/riderSlice';

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};

const RiderList = () => {
    const { riders, vendors, riderDocumentTypes, loading, error } = useSelector(state => state.riders);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [filteredRiders, setFilteredRiders] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [activateModalOpen, setActivateModalOpen] = useState(false);
    const [selectedRider, setselectedRider] = useState(null);

    useEffect(() => {
        dispatch(fetchRiders());
        dispatch(fetchVendors());
        dispatch(fetchRiderDocumentTypes());
    }, [dispatch]);

    useEffect(() => {
        setFilteredRiders(riders);
    }, [riders]);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);
        setFilteredRiders(
            riders.filter((rider) =>
                Object.keys(rider).some((key) =>
                    String(rider[key]).toLowerCase().includes(value)
                )
            )
        );
    };

    const handleActivate = (row) => {
        // Add logic to handle activating the rider
        setselectedRider(row);
        setActivateModalOpen(true);
        console.log("Activate", row);
    };
    
    const handleActivateSubmit = (rider, comments, activationDate) => {
        // Add logic to handle activating the rider
        console.log("Activate", rider, comments, activationDate);
    };

    const reloadGrid = () => {
        dispatch(fetchRiders());
    };

    const columns = [
        { field: 'fullName', headerName: 'Full Name', flex: 1, sortable: true },
        { field: 'emailID', headerName: 'Email', flex: 1 },
        { field: 'contactNumber', headerName: 'Contact Number', flex: 0.6 },
        { field: 'aadharCardNumber', headerName: 'Aadhaar Number', flex: 0.6 },
        { field: 'vendorName', headerName: 'Vendor Name', flex: 0.6 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.8,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div style={{ display: 'flex' }}>
                    <RiderFormModal riderID={params.row.riderID} vendors={vendors} riderDocumentTypes={riderDocumentTypes} reloadGrid={reloadGrid} />
                    <IconButton
                        color="secondary"
                        size="small"
                        onClick={() => handleActivate(params.row)}
                        sx={{ width: "40px", Height: "40px" }}
                    >
                        <Tooltip title="Activate Rider" arrow>
                            <FontAwesomeIcon icon={(params.row.isActive) ? faCheckSquare : faSquare} color='#1976d2' />
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
                    Riders
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
                            sx={{ width: '50%' }}
                        />
                    </Grid>
                    <Grid size={6} sx={{ textAlign: 'right', marginTop: 2.5 }}>
                        <RiderFormModal reloadGrid={reloadGrid} vendors={vendors} />
                    </Grid>
                </Grid>
                <Box sx={{ minHeight: "100%", width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row.riderID}
                        rows={filteredRiders}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10, 20, 50]}
                        paginationMode="client"
                        rowCount={filteredRiders.length}
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
            {selectedRider && (
                <ActivateRiderModal
                    open={activateModalOpen}
                    handleClose={() => setActivateModalOpen(false)}
                    handleActivate={handleActivateSubmit}
                    rider={selectedRider}
                />
            )}
        </Container>
    )

}

export default RiderList;