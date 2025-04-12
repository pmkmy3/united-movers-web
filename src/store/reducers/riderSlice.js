import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://unitedmovers-eff8g5f6dwgde6e8.eastus2-01.azurewebsites.net/api/';
// const API_BASE_URL = 'https://localhost:7248/api/';

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

export const fetchRiderDocumentTypes = createAsyncThunk('riders/fetchRiderDocumentTypes', async () => {
  const response = await fetch(`${API_BASE_URL}Rider/GetRiderDocumentTypes`);
  if (!response.ok) {
      throw new Error('Failed to fetch rider document types');
  }
  return response.json();
});

export const fetchRiderAttachmentsById = createAsyncThunk('riders/fetchRiderAttachmentsById', async (id) => {
    const response = await fetch(`${API_BASE_URL}Rider/GetAttachments/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch rider attachments');
    }
    return response.json();
});

export const fetchDocumentContentById = createAsyncThunk('riders/fetchDocumentContentById', async (id) => {
    const response = await fetch(`${API_BASE_URL}Rider/GetAttachmentContent/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch document content');
    }
    return response.json();
});

export const addRider = createAsyncThunk('riders/addRider', async (rider) => {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rider),
    redirect: "follow"
  };
  let url = `${API_BASE_URL}'Rider/ValidateAndCreateRiderID`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to add rider');
  }
  return response.json();
});

export const activateRider = createAsyncThunk('riders/activateRider', async (rider) => {
  const requestOptions = {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rider),
    redirect: "follow"
  };
  let url = `${API_BASE_URL}Rider/ActivateOrDeactivate`;
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to activate rider');
  }
  return response.json();
});


export const updateRiderPI = createAsyncThunk('rider/updateRiderPI', async (riderPI) => {
  let url = `${API_BASE_URL}Rider/ValidateAndCreateRiderID`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(riderPI)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to update Rider Personal Information');
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return { message: await response.text() };
  }
});

export const updateRiderCI = createAsyncThunk('riders/updateRiderCI', async (riderCI) => {
    let url = `${API_BASE_URL}Rider/UpdateContactInformation`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(riderCI)
    });
    if (!response.ok) {
        throw new Error('Failed to update Rider Contact Information');
    }
    return response.json();
});

export const updateRiderFD = createAsyncThunk('riders/updateRiderFD', async (riderFD) => {
  let url = `${API_BASE_URL}Rider/UpdateFinancialDetails`;
  const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(riderFD)
  });
  if (!response.ok) {
      throw new Error('Failed to update Rider Financial Details');
  }
  return response.json();
});

export const updateRiderAC = createAsyncThunk('riders/updateRiderAC', async (riderAC) => {
  let url = `${API_BASE_URL}Rider/UpdateBackgroundVerification`;
  const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(riderAC)
  });
  if (!response.ok) {
      throw new Error('Failed to update Rider Additional Checks');
  }
  return response.json();
});

export const updateRiderAttachments = createAsyncThunk('riders/updateRiderAttachments', async (attachments) => {
    const response = await fetch(`${API_BASE_URL}Rider/AddAttachment`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attachments)
    });
    if (!response.ok) {
        throw new Error('Failed to update riders Attachments');
    }
    return response.json();
});

export const deleteRiderAttachment = createAsyncThunk('riders/deleteRiderAttachment', async (id) => {
    const response = await fetch(`${API_BASE_URL}Rider/DeleteAttachment/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
        throw new Error('Failed to delete riders attachments');
    }
    return response.json();
});



const riderSlice = createSlice({
  name: 'riders',
  initialState: { riders: [], vendors: [], riderDocumentTypes: [], rider:{}, loading: false, error: '', successMessage: '' },
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
      .addCase(fetchRiderDocumentTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiderDocumentTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.riderDocumentTypes = action.payload;
      })
      .addCase(fetchRiderDocumentTypes.rejected, (state, action) => {
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
      })
      .addCase(fetchRiderAttachmentsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiderAttachmentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.rider = action.payload;
      })
      .addCase(fetchRiderAttachmentsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDocumentContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.rider = action.payload;
      })
      .addCase(fetchDocumentContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRider.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.successMessage = 'Added New Rider successfully';
        state.riders.push(action.payload);
      })
      .addCase(addRider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRiderPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRiderPI.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        if (action.payload === true) {
          state.successMessage = 'Rider Personal Information updated successfully';
        } else {
          state.rider = state.riders.map((rider) => {
            if (rider.riderID === action.payload.riderID) {
              return action.payload;
            }
            return rider;
          });
        }
      })
      .addCase(updateRiderPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRiderCI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRiderCI.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        if (action.payload === true) {
          state.successMessage = 'Rider Contact Information updated successfully';
        } else {
          state.rider = state.riders.map((rider) => {
            if (rider.riderID === action.payload.riderID) {
              return action.payload;
            }
            return rider;
          });
        }
      })
      .addCase(updateRiderCI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRiderFD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRiderFD.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        if (action.payload === true) {
          state.successMessage = 'Rider Financial Details updated successfully';
        } else {
          state.rider = state.riders.map((rider) => {
            if (rider.riderID === action.payload.riderID) {
              return action.payload;
            }
            return rider;
          });
        }
      })
      .addCase(updateRiderFD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRiderAC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRiderAC.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        if (action.payload === true) {
          state.successMessage = 'Rider Additional Checks updated successfully';
        } else {
          state.rider = state.riders.map((rider) => {
            if (rider.riderID === action.payload.riderID) {
              return action.payload;
            }
            return rider;
          });
        }
      })
      .addCase(updateRiderAC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRiderAttachments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRiderAttachments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        if (action.payload === true) {
            state.successMessage = 'Rider Attachments updated successfully';
        } else {
            state.error = 'Rider Attachments update was failed';
        }
      })
      .addCase(updateRiderAttachments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRiderAttachment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRiderAttachment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        if (action.payload === true) {
            state.successMessage = 'Rider Attachment deleted successfully';
        } else {
            state.error = 'Rider Attachment deletion was failed';
        }
      })
      .addCase(deleteRiderAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(activateRider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateRider.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.successMessage = 'Activated Rider successfully';
        state.riders.push(action.payload);
      })
      .addCase(activateRider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export default riderSlice.reducer;