import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://unitedmovers.com/api/';
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