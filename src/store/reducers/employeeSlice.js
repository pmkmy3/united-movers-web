import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://unitedmovers.com/api/';
const employees = [
    { employeeId: 1, firstName: 'John', lastName: 'Doe', gender: 'Female', dateOfBirth: '1991-01-02', personalEmail: 'john.doe@example.com', contactNumber: '918765410', bloodGroup: 'A+' },
    { employeeId: 2, firstName: 'Emily', lastName: 'Smith', gender: 'Male', dateOfBirth: '1992-02-03', personalEmail: 'emily.smith@example.com', contactNumber: '928765421', bloodGroup: 'A-' },
    { employeeId: 3, firstName: 'Michael', lastName: 'Brown', gender: 'Female', dateOfBirth: '1993-03-04', personalEmail: 'michael.brown@example.com', contactNumber: '938765432', bloodGroup: 'B+' },
    { employeeId: 4, firstName: 'Sarah', lastName: 'Johnson', gender: 'Male', dateOfBirth: '1994-04-05', personalEmail: 'sarah.johnson@example.com', contactNumber: '948765443', bloodGroup: 'B-' },
    { employeeId: 5, firstName: 'David', lastName: 'Williams', gender: 'Female', dateOfBirth: '1995-05-06', personalEmail: 'david.williams@example.com', contactNumber: '958765454', bloodGroup: 'O+' },
    { employeeId: 6, firstName: 'Emma', lastName: 'Jones', gender: 'Male', dateOfBirth: '1996-06-07', personalEmail: 'emma.jones@example.com', contactNumber: '968765465', bloodGroup: 'O-' },
    { employeeId: 7, firstName: 'Daniel', lastName: 'Garcia', gender: 'Female', dateOfBirth: '1997-07-08', personalEmail: 'daniel.garcia@example.com', contactNumber: '978765476', bloodGroup: 'AB+' },
    { employeeId: 8, firstName: 'Olivia', lastName: 'Martinez', gender: 'Male', dateOfBirth: '1998-08-09', personalEmail: 'olivia.martinez@example.com', contactNumber: '988765487', bloodGroup: 'AB-' },
    { employeeId: 9, firstName: 'Matthew', lastName: 'Rodriguez', gender: 'Female', dateOfBirth: '1999-09-10', personalEmail: 'matthew.rodriguez@example.com', contactNumber: '998765498', bloodGroup: 'A+' },
    { employeeId: 10, firstName: 'Sophia', lastName: 'Hernandez', gender: 'Male', dateOfBirth: '1990-01-11', personalEmail: 'sophia.hernandez@example.com', contactNumber: '908765409', bloodGroup: 'A-' },
    { employeeId: 11, firstName: 'James', lastName: 'Lopez', gender: 'Female', dateOfBirth: '1991-02-12', personalEmail: 'james.lopez@example.com', contactNumber: '918765410', bloodGroup: 'B+' },
    { employeeId: 12, firstName: 'Isabella', lastName: 'Gonzalez', gender: 'Male', dateOfBirth: '1992-03-13', personalEmail: 'isabella.gonzalez@example.com', contactNumber: '928765421', bloodGroup: 'B-' },
    { employeeId: 13, firstName: 'Benjamin', lastName: 'Wilson', gender: 'Female', dateOfBirth: '1993-04-14', personalEmail: 'benjamin.wilson@example.com', contactNumber: '938765432', bloodGroup: 'O+' },
    { employeeId: 14, firstName: 'Mia', lastName: 'Anderson', gender: 'Male', dateOfBirth: '1994-05-15', personalEmail: 'mia.anderson@example.com', contactNumber: '948765443', bloodGroup: 'O-' },
    { employeeId: 15, firstName: 'William', lastName: 'Thomas', gender: 'Female', dateOfBirth: '1995-06-16', personalEmail: 'william.thomas@example.com', contactNumber: '958765454', bloodGroup: 'AB+' },
    { employeeId: 16, firstName: 'Charlotte', lastName: 'Taylor', gender: 'Male', dateOfBirth: '1996-07-17', personalEmail: 'charlotte.taylor@example.com', contactNumber: '968765465', bloodGroup: 'AB-' },
    { employeeId: 17, firstName: 'Alexander', lastName: 'Moore', gender: 'Female', dateOfBirth: '1997-08-18', personalEmail: 'alexander.moore@example.com', contactNumber: '978765476', bloodGroup: 'A+' },
    { employeeId: 18, firstName: 'Amelia', lastName: 'Jackson', gender: 'Male', dateOfBirth: '1998-09-19', personalEmail: 'amelia.jackson@example.com', contactNumber: '988765487', bloodGroup: 'A-' },
    { employeeId: 19, firstName: 'Ethan', lastName: 'White', gender: 'Female', dateOfBirth: '1999-01-20', personalEmail: 'ethan.white@example.com', contactNumber: '998765498', bloodGroup: 'B+' },
    { employeeId: 20, firstName: 'Harper', lastName: 'Harris', gender: 'Male', dateOfBirth: '1990-02-21', personalEmail: 'harper.harris@example.com', contactNumber: '908765409', bloodGroup: 'B-' }
];


export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    // const response = await fetch(API_URL);
    // if (!response.ok) {
    //     throw new Error('Failed to fetch employees');
    // }
    
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(employees);
        }, 2000);
      });
});

export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id) => {
    // const response = await fetch(`${API_URL}/${id}`);
    // if (!response.ok) {
    //     throw new Error('Failed to fetch employee');
    // }
    // return response.json();
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(employees.find((employee) => employee.employeeId === id));
        }, 2000);
    });
});


export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });
    if (!response.ok) {
        throw new Error('Failed to add employee');
    }
    return response.json();
});

export const updateEmployeePersonalInformation = createAsyncThunk('employees/updateEmployeePersonalInformation', async (employeePI) => {
    const response = await fetch(`${API_BASE_URL}/${employeePI.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeePI)
    });
    if (!response.ok) {
        throw new Error('Failed to update Employee Personal Information');
    }
    return response.json();
});

export const updateEmployeeContactInformation = createAsyncThunk('employees/updateEmployeeContactInformation', async (employeeCI) => {
    const response = await fetch(`${API_BASE_URL}/${employeeCI.id}`, {
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
    const response = await fetch(`${API_BASE_URL}/${employeeFD.id}`, {
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
    const response = await fetch(`${API_BASE_URL}/${employeeAS.id}`, {
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
    initialState: { employees: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
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
                state.employees = state.employees.map((employee) => {
                    if (employee.employeeId === action.payload.employeeId) {
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
                state.employees = state.employees.map((employee) => {
                    if (employee.id === action.payload.id) {
                        return action.payload;
                    }
                    return employee;
                });
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
                state.employees = state.employees.map((employee) => {
                    if (employee.id === action.payload.id) {
                        return action.payload;
                    }
                    return employee;
                });
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
                state.employees = state.employees.map((employee) => {
                    if (employee.id === action.payload.id) {
                        return action.payload;
                    }
                    return employee;
                });
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
                    if (employee.id === action.payload.id) {
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