import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../apis';

const initialState: DeleteBookState = {
  loading: false,
  error: false,
  success: false,
  message: '',
};

const deleteBookSlice = createSlice({
  name: 'deleteBook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.deleteBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(api.deleteBook.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.message = 'Book deleted successfully';
    });
    builder.addCase(api.deleteBook.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload || 'Error deleting book';
      state.message = action.payload || 'Error deleting book';
      state.success = false;
    });
  },
});

export default deleteBookSlice.reducer;
