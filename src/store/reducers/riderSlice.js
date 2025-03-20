import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://localhost:7248/api/';

export const fetchRiders = createAsyncThunk('riders/fetchRiders', async () => {
  let url = `${API_BASE_URL}Rider`;
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('Failed to fetch riders');
  }
  return response.json();
});

export const fetchRiderById = createAsyncThunk('riders/fetchRiderById', async (id) => {
  const response = await fetch(`${API_BASE_URL}Rider/${id}`);
  if (!response.ok) {
      throw new Error('Failed to fetch rider');
  }
  return response.json();
});

export const fetchVendors = createAsyncThunk('vendors/fetchVendors', async () => {
  const response = await fetch(`${API_BASE_URL}Rider/Vendor`);
  if (!response.ok) {
      throw new Error('Failed to fetch vendors');
  }
  return response.json();
});

const riderSlice = createSlice({ 
  name: 'riders', 
  initialState: { riders: [], vendors: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiders.fulfilled, (state, action) => {
          state.loading = false;
          state.riders = action.payload;
      })
      .addCase(fetchRiders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
          state.loading = false;
          state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      })
      .addCase(fetchRiderById.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(fetchRiderById.fulfilled, (state, action) => {
          state.loading = false;
          state.riders = state.riders.map((rider) => {
              if (rider.riderID === action.payload.riderID) {
                  return action.payload;
              }
              return rider;
          });
      })
      .addCase(fetchRiderById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });
  }
});

export default riderSlice.reducer;