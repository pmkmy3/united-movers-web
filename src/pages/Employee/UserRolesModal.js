import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEmployeeRolesById, deleteEmployeeRole, assignEmployeeRoles } from '../../store/reducers/employeeSlice';
import {
    Modal, Box, TextField, Button, Typography, Grid2 as Grid, MenuItem,
    IconButton, Tooltip, FormControl, FormLabel, RadioGroup,
    FormControlLabel, Radio, InputLabel, Select
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-regular-svg-icons';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 500,
    width: 700,
    maxHeight: 500,
    overflowY: 'auto'
};

const UserRolesModal = ({ employeeRoles, open, handleClose, handleAssignRoles, employeeID }) => {
    const [role, setRole] = useState('');
    const [selectedPermission, setSelectedPermission] = useState("Read-Only");
    const [description, setDescription] = useState('');
    const [error, setError] = useState({ description: '', roles: '' });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [roles, setRoles] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (employeeID && open) {
            getEmployeeRolesById();
        }
    }
    , [employeeID, open]);


    const getEmployeeRolesById = async () => {
        if (employeeID) {
            const response = await dispatch(fetchEmployeeRolesById(employeeID));
            const data = response.payload;
            let roleResponse = data.map((item) => ({
                mappingID: item.mappingID,
                roleID: item.roleID,
                roleName: item.roleName,
                comments: item.comments,
                isActive: item.isActive,
                isReadOnly: item.isReadOnly,
                isReadWrite: item.isReadWrite
            }));
            setRoles(roleResponse);
        }
    }

    const handleRoleChanges = (e) => {
        setRole(e.target.value);
    }
    const handlePermission = (event) => {
        setSelectedPermission(event.target.value);
    };
    const handleDescriptionBlur = () => {
        if (!description) {
            setError((prev) => ({ ...prev, description: 'Description is required.' }));
        } else {
            setError((prev) => ({ ...prev, description: '' }));
        }
    };

    const handleDeleteRole = (id) => {
        if(id) {
            dispatch(deleteEmployeeRole(id)).then(() => {
                getEmployeeRolesById();
            });
        }
    }

    const handleAddRole = async() => {
        if(role && description && selectedPermission) {
            const data = {
                mappingID: 0,
                employeeID,
                roleID: role,
                roleName: "",
                comments: description,
                isReadOnly: selectedPermission === "Read-Only",
                isReadWrite: selectedPermission === "Read-Write",
                isActive: true
            };
            const response = await dispatch(assignEmployeeRoles(data));
            if (response.payload) {
                setSelectedPermission("Read-Only");
                setDescription('');
                setRole('');
                setError({ description: '', roles: '' });
                getEmployeeRolesById();
            }
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            slotProps={{ BackdropProps: { onClick: (e) => e.stopPropagation() } }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container rowSpacing={2} columnSpacing={3} size={12}>
                    <Grid size={8}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Assign Employee Roles
                        </Typography>
                    </Grid>
                    <Grid size={4} sx={{ textAlign: 'right'}}>
                        <CloseRoundedIcon style={{ 'color': "red", 'cursor' : "pointer"}} onClick={handleClose} />
                    </Grid>
                </Grid>
                <Grid container srowSpacing={2} columnSpacing={3} size={12} sx={{ mt: 3 }}>
                    <Grid size={8}>
                        <FormControl fullWidth sx={{ minWidth: 120 }}>
                            <InputLabel id="role-type-label">Roles</InputLabel>
                            <Select
                                size="small"
                                labelId="role-type-label"
                                id="role-type"
                                label="role Type"
                                value={role}
                                onChange={handleRoleChanges}
                            >
                                {employeeRoles && employeeRoles.map((role) => (
                                    <MenuItem key={role.roleID} value={role.roleID}>
                                        {role.roleName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <FontAwesomeIcon
                            icon={faSquarePlus}
                            size="2x"
                            onClick={handleAddRole}
                            color="green"
                            style={{ cursor: 'pointer', marginTop: 5 }}
                        />
                    </Grid>
                </Grid>
                <Grid container srowSpacing={2} columnSpacing={3} size={12} sx={{ mt: 1 }}>
                    <Grid size={12}>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend"></FormLabel>
                            <RadioGroup
                                row
                                aria-label="rolePermissions"
                                name="rolePermissions"
                                value={selectedPermission}
                                onChange={handlePermission}
                            >
                                <FormControlLabel value="Read-Only" control={<Radio />} labelPlacement="end" label="Read-Only" />
                                <FormControlLabel value="Read-Write" control={<Radio />} labelPlacement="end" label="Read-Write" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid size={8}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size='small'
                            id="role-description"
                            label="Role Description"
                            name="role-description"
                            autoComplete="off"
                            multiline
                            minRows={3}
                            maxRows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={handleDescriptionBlur}
                            error={!!error.description}
                            helperText={error.description}
                        />
                    </Grid>
                </Grid>
                
                <Box gridColumn="span 12" sx={{ mt: 3 }}>
                    <Typography variant="h7" sx={{ fontWeight: "bold" }}>Role Details</Typography>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1} gridColumn="span 12" sx={{ mt: 3, maxHeight: 300 }}>
                    <Box gridColumn="span 3">
                        <Typography sx={{ fontWeight: 700 }}>Role</Typography>
                    </Box>
                    <Box gridColumn="span 2">
                        <Typography sx={{ fontWeight: 700 }}>Permission</Typography>
                    </Box>
                    <Box gridColumn="span 4">
                        <Typography sx={{ fontWeight: 700 }}>Comments</Typography>
                    </Box>
                    <Box gridColumn="span 2">
                        <Typography sx={{ fontWeight: 700 }}>Actions</Typography>
                    </Box>
                    {roles.map((role, index) => (
                        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1} gridColumn="span 12" key={index} sx={{ maxHeight: 25 }}>
                            <Box gridColumn="span 3"><Typography>{role.roleName} </Typography></Box>
                            {role.isReadOnly ? <Box gridColumn="span 2"><Typography>Read-Only</Typography></Box> : <Box gridColumn="span 2"><Typography>Read-Write</Typography></Box>}
                            <Box gridColumn="span 4"><Typography>{role.comments}</Typography></Box>
                            <Box gridColumn="span 2">
                                <FontAwesomeIcon icon={faSquareMinus} size='lg' color='red' style={{ cursor: 'pointer' }} onClick={() => handleDeleteRole(role.mappingID)} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Modal>
    )
}
export default UserRolesModal;
