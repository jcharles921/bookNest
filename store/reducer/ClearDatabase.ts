import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../apis';

interface ClearDatabaseState {
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string;
}

const initialState: ClearDatabaseState = {
  loading: false,
  error: false,
  success: false,
  message: '',
};

const clearDatabaseSlice = createSlice({
  name: 'clearDatabase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.clearDatabase.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(api.clearDatabase.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.message = 'Database cleared successfully';
    });
    builder.addCase(api.clearDatabase.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload || 'Error clearing database';
      state.success = false;
    });
  },
});

export default clearDatabaseSlice.reducer;
