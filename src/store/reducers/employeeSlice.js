import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://localhost:7248/api/';

const employeeList = [
    {
      "employeeID": 1,
      "firstName": "John",
      "lastName": "Doe",
      "personalEmailID": "john.doe@example.com",
      "contactNumber": "1234567890",
      "aadhaarNumber": "123456789012",
      "panNumber": "ABCDE1234F"
    },
    {
      "employeeID": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "personalEmailID": "jane.smith@example.com",
      "contactNumber": "2345678901",
      "aadhaarNumber": "234567890123",
      "panNumber": "BCDEF2345G"
    },
    {
      "employeeID": 3,
      "firstName": "Alice",
      "lastName": "Johnson",
      "personalEmailID": "alice.johnson@example.com",
      "contactNumber": "3456789012",
      "aadhaarNumber": "345678901234",
      "panNumber": "CDEFG3456H"
    },
    {
      "employeeID": 4,
      "firstName": "Bob",
      "lastName": "Brown",
      "personalEmailID": "bob.brown@example.com",
      "contactNumber": "4567890123",
      "aadhaarNumber": "456789012345",
      "panNumber": "DEFGH4567I"
    },
    {
      "employeeID": 5,
      "firstName": "Charlie",
      "lastName": "Davis",
      "personalEmailID": "charlie.davis@example.com",
      "contactNumber": "5678901234",
      "aadhaarNumber": "567890123456",
      "panNumber": "EFGHI5678J"
    },
    {
      "employeeID": 6,
      "firstName": "David",
      "lastName": "Evans",
      "personalEmailID": "david.evans@example.com",
      "contactNumber": "6789012345",
      "aadhaarNumber": "678901234567",
      "panNumber": "FGHIJ6789K"
    },
    {
      "employeeID": 7,
      "firstName": "Eve",
      "lastName": "Frank",
      "personalEmailID": "eve.frank@example.com",
      "contactNumber": "7890123456",
      "aadhaarNumber": "789012345678",
      "panNumber": "GHIJK7890L"
    },
    {
      "employeeID": 8,
      "firstName": "Frank",
      "lastName": "Green",
      "personalEmailID": "frank.green@example.com",
      "contactNumber": "8901234567",
      "aadhaarNumber": "890123456789",
      "panNumber": "HIJKL8901M"
    },
    {
      "employeeID": 9,
      "firstName": "Grace",
      "lastName": "Harris",
      "personalEmailID": "grace.harris@example.com",
      "contactNumber": "9012345678",
      "aadhaarNumber": "901234567890",
      "panNumber": "IJKLM9012N"
    },
    {
      "employeeID": 10,
      "firstName": "Henry",
      "lastName": "Ivy",
      "personalEmailID": "henry.ivy@example.com",
      "contactNumber": "0123456789",
      "aadhaarNumber": "012345678901",
      "panNumber": "JKLMN0123O"
    },
    {
      "employeeID": 13,
      "firstName": "afsd12",
      "lastName": "asda12",
      "personalEmailID": "asdf1@asdf1.com",
      "contactNumber": "2354234642",
      "aadhaarNumber": "324523452343",
      "panNumber": "asdfq34sd"
    },
    {
      "employeeID": 14,
      "firstName": "afsd",
      "lastName": "asda",
      "personalEmailID": "asdf@asdf.com",
      "contactNumber": "2354234642",
      "aadhaarNumber": "324523452343",
      "panNumber": "w32fdsa"
    }
];

const employees = [
    {
        "employeeID": 1,
        "firstName": "John",
        "lastName": "Doe",
        "bloodGroup": "O+",
        "gender": "Male",
        "personalEmailID": "john.doe@example.com",
        "contactNumber": "1234567890",
        "alternativeContactNumber": "0987654321",
        "emergencyContactNumber": "1122334455",
        "aadhaarNumber": "123456789012",
        "panNumber": "ABCDE1234F",
        "bankAccountNumber": "1234567890123456",
        "bankName": "Bank A",
        "bankIFSCCode": "IFSC0004",
        "dateOfBirth": "1985-01-01T00:00:00",
        "createdDate": "2025-02-22T00:00:00",
        "modifiedDate": "2025-02-22T00:00:00",
        "createdByID": 1,
        "modifiedByID": 1,
        "alternativeEmail": "john.alt@example.com",
        "emergencyContactName": "Jane Doe",
        "emergencyContactRelation": "Spouse",
        "emergencyContactPersonID": "2",
        "addressLine1": "123 Main St",
        "addressLine2": "Apt 1",
        "state": "State A",
        "city": "City A",
        "zip": "123456",
        "landmark": "Near Park",
        "highestDegreeEarned": "B.Sc",
        "previousOrgName": "Company A",
        "uanNumber": "123456789012",
        "insurancePolicyNumber": "INS123456",
        "insurerName": "Insurer A",
        "insuranceStartDate": "2023-01-01T00:00:00",
        "insuranceEndDate": "2024-01-01T00:00:00",
        "isBackgroundVerificationCompleted": true,
        "isPhysicalVerificationCompleted": true,
        "backgroundVerificationAgencyName": "Agency A"
    }
]

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


export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee) => {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
        redirect: "follow"
    };
    let url = `${API_BASE_URL}'Employee/ValidateAndCreateEmployeeID`;
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
    const response = await fetch(`${API_BASE_URL}/${employeeAS.employeeID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeAS)
    });
    if (!response.ok) {
        throw new Error('Failed to update Employee Admin Section');
    }
    return response.json();
});

const employeeSlice = createSlice({ 
    name: 'employees', 
    initialState: { employees: [], loading: false, error: '', successMessage: '' },
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
            .addCase(addEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.successMessage = 'Added New Employee successfully';
                state.employees.push(action.payload);
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
                    state.employees = state.employees.map((employee) => {
                        if (employee.employeeID === action.payload.employeeID) {
                            return action.payload;
                        }
                        return employee;
                    });
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
                    state.employees = state.employees.map((employee) => {
                        if (employee.employeeID === action.payload.employeeID) {
                            return action.payload;
                        }
                        return employee;
                    });
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
                    state.successMessage = 'Employee Financial Details updated successfully';
                } else {
                    state.employees = state.employees.map((employee) => {
                        if (employee.employeeID === action.payload.employeeID) {
                            return action.payload;
                        }
                        return employee;
                    });
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
                state.employees = state.employees.map((employee) => {
                    if (employee.employeeID === action.payload.employeeID) {
                        return action.payload;
                    }
                    return employee;
                });
            })
            .addCase(updateEmployeeAdminSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
})

export default employeeSlice.reducer;