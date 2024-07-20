import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../apis';

const initialState: UpdatePreferenceState = {
  loading: false,
  error: false,
  success: false,
  message: '',
};

const updatePreferenceSlice = createSlice({
  name: 'updatePreference',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.updatePreference.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(api.updatePreference.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.message = 'Preference updated successfully';
    });
    builder.addCase(api.updatePreference.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload || 'Error updating preference';
      state.message = action.payload || 'Error updating preference';
      state.success = false;
    });
  },
});

export default updatePreferenceSlice.reducer;
