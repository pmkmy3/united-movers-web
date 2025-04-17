import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const API_BASE_URL = 'https://unitedmovers-eff8g5f6dwgde6e8.eastus2-01.azurewebsites.net/api/';
const API_BASE_URL = 'https://localhost:7248/api/';

export const loginEmployee = createAsyncThunk('auth/loginEmployee', async (credentials) => {
    const response = await fetch(`${API_BASE_URL}Auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Login failed!');
    }

    const data = await response.json();
    return data;
});

export const changePassword = createAsyncThunk('auth/changePassword', async (credentials) => {
    const response = await fetch(`${API_BASE_URL}Auth/changePassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Change password failed!');
    }

    const data = await response.json();
    return data;
});

const authSlice = createSlice({ 
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase('loginEmployee/pending', (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase('loginEmployee/fulfilled', (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase('loginEmployee/rejected', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('changePassword/pending', (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase('changePassword/fulfilled', (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase('changePassword/rejected', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default authSlice.reducer;