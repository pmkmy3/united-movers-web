import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://localhost:7248/api/';

// const employeeList = [
//     {
//       "employeeID": 1,
//       "firstName": "John",
//       "lastName": "Doe",
//       "personalEmailID": "john.doe@example.com",
//       "contactNumber": "1234567890",
//       "aadhaarNumber": "123456789012",
//       "panNumber": "ABCDE1234F"
//     },
//     {
//       "employeeID": 2,
//       "firstName": "Jane",
//       "lastName": "Smith",
//       "personalEmailID": "jane.smith@example.com",
//       "contactNumber": "2345678901",
//       "aadhaarNumber": "234567890123",
//       "panNumber": "BCDEF2345G"
//     },
//     {
//       "employeeID": 3,
//       "firstName": "Alice",
//       "lastName": "Johnson",
//       "personalEmailID": "alice.johnson@example.com",
//       "contactNumber": "3456789012",
//       "aadhaarNumber": "345678901234",
//       "panNumber": "CDEFG3456H"
//     },
//     {
//       "employeeID": 4,
//       "firstName": "Bob",
//       "lastName": "Brown",
//       "personalEmailID": "bob.brown@example.com",
//       "contactNumber": "4567890123",
//       "aadhaarNumber": "456789012345",
//       "panNumber": "DEFGH4567I"
//     },
//     {
//       "employeeID": 5,
//       "firstName": "Charlie",
//       "lastName": "Davis",
//       "personalEmailID": "charlie.davis@example.com",
//       "contactNumber": "5678901234",
//       "aadhaarNumber": "567890123456",
//       "panNumber": "EFGHI5678J"
//     },
//     {
//       "employeeID": 6,
//       "firstName": "David",
//       "lastName": "Evans",
//       "personalEmailID": "david.evans@example.com",
//       "contactNumber": "6789012345",
//       "aadhaarNumber": "678901234567",
//       "panNumber": "FGHIJ6789K"
//     },
//     {
//       "employeeID": 7,
//       "firstName": "Eve",
//       "lastName": "Frank",
//       "personalEmailID": "eve.frank@example.com",
//       "contactNumber": "7890123456",
//       "aadhaarNumber": "789012345678",
//       "panNumber": "GHIJK7890L"
//     },
//     {
//       "employeeID": 8,
//       "firstName": "Frank",
//       "lastName": "Green",
//       "personalEmailID": "frank.green@example.com",
//       "contactNumber": "8901234567",
//       "aadhaarNumber": "890123456789",
//       "panNumber": "HIJKL8901M"
//     },
//     {
//       "employeeID": 9,
//       "firstName": "Grace",
//       "lastName": "Harris",
//       "personalEmailID": "grace.harris@example.com",
//       "contactNumber": "9012345678",
//       "aadhaarNumber": "901234567890",
//       "panNumber": "IJKLM9012N"
//     },
//     {
//       "employeeID": 10,
//       "firstName": "Henry",
//       "lastName": "Ivy",
//       "personalEmailID": "henry.ivy@example.com",
//       "contactNumber": "0123456789",
//       "aadhaarNumber": "012345678901",
//       "panNumber": "JKLMN0123O"
//     },
//     {
//       "employeeID": 13,
//       "firstName": "afsd12",
//       "lastName": "asda12",
//       "personalEmailID": "asdf1@asdf1.com",
//       "contactNumber": "2354234642",
//       "aadhaarNumber": "324523452343",
//       "panNumber": "asdfq34sd"
//     },
//     {
//       "employeeID": 14,
//       "firstName": "afsd",
//       "lastName": "asda",
//       "personalEmailID": "asdf@asdf.com",
//       "contactNumber": "2354234642",
//       "aadhaarNumber": "324523452343",
//       "panNumber": "w32fdsa"
//     }
// ];

// const employees = [
//     {
//         "employeeID": 1,
//         "firstName": "John",
//         "lastName": "Doe",
//         "bloodGroup": "O+",
//         "gender": "Male",
//         "personalEmailID": "john.doe@example.com",
//         "contactNumber": "1234567890",
//         "alternativeContactNumber": "0987654321",
//         "emergencyContactNumber": "1122334455",
//         "aadhaarNumber": "123456789012",
//         "panNumber": "ABCDE1234F",
//         "bankAccountNumber": "1234567890123456",
//         "bankName": "Bank A",
//         "bankIFSCCode": "IFSC0004",
//         "dateOfBirth": "1985-01-01T00:00:00",
//         "createdDate": "2025-02-22T00:00:00",
//         "modifiedDate": "2025-02-22T00:00:00",
//         "createdByID": 1,
//         "modifiedByID": 1,
//         "alternativeEmail": "john.alt@example.com",
//         "emergencyContactName": "Jane Doe",
//         "emergencyContactRelation": "Spouse",
//         "emergencyContactPersonID": "2",
//         "addressLine1": "123 Main St",
//         "addressLine2": "Apt 1",
//         "state": "State A",
//         "city": "City A",
//         "zip": "123456",
//         "landmark": "Near Park",
//         "highestDegreeEarned": "B.Sc",
//         "previousOrgName": "Company A",
//         "uanNumber": "123456789012",
//         "insurancePolicyNumber": "INS123456",
//         "insurerName": "Insurer A",
//         "insuranceStartDate": "2023-01-01T00:00:00",
//         "insuranceEndDate": "2024-01-01T00:00:00",
//         "isBackgroundVerificationCompleted": true,
//         "isPhysicalVerificationCompleted": true,
//         "backgroundVerificationAgencyName": "Agency A"
//     }
// ]

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    let url = `${API_BASE_URL}Employee`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    return response.json();

    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(employeeList);
    //     }, 2000);
    //   });
});

export const fetchEmployeeDocumentTypes = createAsyncThunk('employees/fetchEmployeeDocumentTypes', async () => {
    let url = `${API_BASE_URL}Employee/GetEmployeeDocumentTypes`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch employee document types');
    }
    return response.json();
});

export const fetchEmployeeRoles = createAsyncThunk('employees/fetchEmployeeRoles', async () => {
    let url = `${API_BASE_URL}Employee/GetEmployeeRoles`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch employee document types');
    }
    return response.json();
});

export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id) => {
    const response = await fetch(`${API_BASE_URL}Employee/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch employee');
    }
    return response.json();
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(employees[0]);
    //     }, 2000);
    // });
});

export const fetchEmployeeAttachmentsById = createAsyncThunk('employees/fetchEmployeeAttachmentsById', async (id) => {
    const response = await fetch(`${API_BASE_URL}Employee/GetAttachments/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch employee attachments');
    }
    return response.json();
});

export const fetchEmployeeRolesById = createAsyncThunk('employees/fetchEmployeeRolesById', async (id) => {
    const response = await fetch(`${API_BASE_URL}Employee/GetEmployeeAssignedRolesByEmplID/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch employee roles');
    }
    return response.json();
});

export const fetchDocumentContentById = createAsyncThunk('employees/fetchDocumentContentById', async (id) => {
    const response = await fetch(`${API_BASE_URL}Employee/GetAttachmentContent/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch document content');
    }
    return response.json();
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee) => {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
        redirect: "follow"
    };
    let url = `${API_BASE_URL}Employee/ValidateAndCreateEmployeeID`;
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
        throw new Error('Failed to add employee');
    }
    return response.json();
});

export const updateEmployeePersonalInformation = createAsyncThunk('employees/updateEmployeePersonalInformation', async (employeePI) => {
    let url = `${API_BASE_URL}Employee/ValidateAndCreateEmployeeID`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeePI)
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update Employee Personal Information');
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
        return { message: await response.text() };
    }
});

export const updateEmployeeContactInformation = createAsyncThunk('employees/updateEmployeeContactInformation', async (employeeCI) => {
    let url = `${API_BASE_URL}Employee/UpdateContactInformation`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeCI)
    });
    if (!response.ok) {
        throw new Error('Failed to update Employee Contact Information');
    }
    return response.json();
});

export const updateEmployeeFinancialDetails = createAsyncThunk('employees/updateEmployeeFinancialDetails', async (employeeFD) => {
    let url = `${API_BASE_URL}Employee/UpdateFinancialDetails`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeFD)
    });
    if (!response.ok) {
        throw new Error('Failed to update Employee Financial Details');
    }
    return response.json();
});

export const updateEmployeeAdminSection = createAsyncThunk('employees/updateEmployeeAdminSection', async (employeeAS) => {
    const response = await fetch(`${API_BASE_URL}Employee/UpdateBackgroundVerification`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeAS)
    });
    if (!response.ok) {
        throw new Error('Failed to update Employee Admin Section');
    }
    return response.json();
});

export const updateEmployeeAttachments = createAsyncThunk('employees/updateEmployeeAttachments', async (attachments) => {
    const response = await fetch(`${API_BASE_URL}Employee/AddAttachment`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attachments)
    });
    if (!response.ok) {
        throw new Error('Failed to update Employee Attachments');
    }
    return response.json();
});

export const deleteEmployeeAttachment = createAsyncThunk('employees/deleteEmployeeAttachment', async (id) => {
    const response = await fetch(`${API_BASE_URL}Employee/DeleteAttachment/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
        throw new Error('Failed to delete employee attachments');
    }
    return response.json();
});

export const activateOrDeactivateEmployee = createAsyncThunk('employees/activateOrDeactivateEmployee', async (actObj) => {
    const response = await fetch(`${API_BASE_URL}Employee/ActivateOrDeactivate`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actObj)
    });
    if (!response.ok) {
        throw new Error('Failed to update Employee Activation');
    }
    return response.json();
});

export const assignEmployeeRoles = createAsyncThunk('employees/assignEmployeeRoles', async (role) => {
    const response = await fetch(`${API_BASE_URL}Employee/AddEmployeeRole`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(role)
    });
    if (!response.ok) {
        throw new Error('Failed to update Employee Roles');
    }
    return response.json();
});

export const deleteEmployeeRole = createAsyncThunk('employees/deleteEmployeeRole', async (id) => {
    const response = await fetch(`${API_BASE_URL}Employee/DeleteEmployeeRole/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
        throw new Error('Failed to delete employee role');
    }
    return response.json();
});


const employeeSlice = createSlice({ 
    name: 'employees', 
    initialState: { employees: [], employeeDocumentTypes: [], employeeRoles: [], loading: false, error: '', successMessage: '' },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Fetched All Employees successfully';
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEmployeeDocumentTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeDocumentTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Fetched All Employee DocumentTypes successfully';
                state.employeeDocumentTypes = action.payload;
            })
            .addCase(fetchEmployeeDocumentTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEmployeeRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Fetched All Employee Roles successfully';
                state.employeeRoles = action.payload;
            })
            .addCase(fetchEmployeeRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEmployeeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Fetched Employee by id successfully';
                state.employees = state.employees.map((employee) => {
                    if (employee.employeeID === action.payload.employeeID) {
                        return action.payload;
                    }
                    return employee;
                });
            })
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEmployeeAttachmentsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeAttachmentsById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Fetched Employee Attachments by id successfully';
                state.employees = state.employees.map((employee) => {
                    if (employee.employeeID === action.payload.employeeID) {
                        return action.payload;
                    }
                    return employee;
                });
            })
            .addCase(fetchEmployeeAttachmentsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEmployeeRolesById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeRolesById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Fetched Employee Roles by id successfully';
                state.employees = state.employees.map((employee) => {
                    if (employee.employeeID === action.payload.employeeID) {
                        return action.payload;
                    }
                    return employee;
                });
            })
            .addCase(fetchEmployeeRolesById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchDocumentContentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDocumentContentById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Fetched Document Content by id successfully';
            })
            .addCase(fetchDocumentContentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Added New Employee successfully';
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateEmployeePersonalInformation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeePersonalInformation.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                if (action.payload === true) {
                    state.successMessage = 'Employee Personal Information updated successfully';
                } else {
                    state.error = 'Employee Personal Information update was failed';
                }
            })
            .addCase(updateEmployeePersonalInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateEmployeeContactInformation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeContactInformation.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                if (action.payload === true) {
                    state.successMessage = 'Employee Contact Information updated successfully';
                } else {
                    state.error = 'Employee Contact Information update was failed';
                }
            })
            .addCase(updateEmployeeContactInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateEmployeeFinancialDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeFinancialDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                if (action.payload === true) {
                    state.successMessage = 'Financial Details updated successfully';
                } else {
                    state.error = 'Financial Details update was failed';
                }
            })
            .addCase(updateEmployeeFinancialDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateEmployeeAdminSection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeAdminSection.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                if (action.payload === true) {
                    state.successMessage = 'Admin Section updated successfully';
                } else {
                    state.error = 'Admin Section update was failed';
                }
            })
            .addCase(updateEmployeeAdminSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateEmployeeAttachments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeAttachments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                if (action.payload === true) {
                    state.successMessage = 'Employee Attachments updated successfully';
                } else {
                    state.error = 'Employee Attachments update was failed';
                }
            })
            .addCase(updateEmployeeAttachments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteEmployeeAttachment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployeeAttachment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                if (action.payload === true) {
                    state.successMessage = 'Employee Attachment deleted successfully';
                } else {
                    state.error = 'Employee Attachment delete was failed';
                }
            })
            .addCase(deleteEmployeeAttachment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(activateOrDeactivateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(activateOrDeactivateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Activated Employee successfully';
            })
            .addCase(activateOrDeactivateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(assignEmployeeRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignEmployeeRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                if (action.payload === true) {
                    state.successMessage = 'Assigned Employee Roles successfully';
                } else {
                    state.error = 'Employee Role Assignment was failed';
                }
            })
            .addCase(assignEmployeeRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteEmployeeRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployeeRole.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                if (action.payload === true) {
                    state.successMessage = 'Deleted Employee Role successfully';
                } else {
                    state.error = 'Employee Role delete was failed';
                }
            })
            .addCase(deleteEmployeeRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})

export default employeeSlice.reducer;