import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../apis';

const initialState: AddPreferenceState = {
  loading: false,
  error: false,
  success: false,
  message: '',
};

const addPreferenceSlice = createSlice({
  name: 'addPreference',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.addPreference.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(api.addPreference.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.message = 'Preference added successfully';
    });
    builder.addCase(api.addPreference.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload || 'Error adding preference';
      state.message = action.payload || 'Error adding preference';
      state.success = false;
    });
  },
});

export default addPreferenceSlice.reducer;
